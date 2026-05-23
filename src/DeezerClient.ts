import { RateLimiter } from './utils/RateLimiter';
import { CacheStore } from './utils/CacheStore';
import { DeezerError } from './errors/DeezerError';
import type { DeezerOptions, RequestInterceptor, ResponseInterceptor } from './types';

import { AlbumModule } from './modules/AlbumModule';
import { ArtistModule } from './modules/ArtistModule';
import { ChartModule } from './modules/ChartModule';
import { EditorialModule } from './modules/EditorialModule';
import { EpisodeModule } from './modules/EpisodeModule';
import { GenreModule } from './modules/GenreModule';
import { PlaylistModule } from './modules/PlaylistModule';
import { PodcastModule } from './modules/PodcastModule';
import { RadioModule } from './modules/RadioModule';
import { SearchModule } from './modules/SearchModule';
import { TrackModule } from './modules/TrackModule';
import { UserModule } from './modules/UserModule';

/**
 * DeezerClient
 * O Maestro principal da orquestra. Ele gerencia rate limit (filas para não tomar block da API), 
 * interceptadores e expõe os submódulos da API (albums, artists, podcasts, etc).
 */
export class DeezerClient {
  private static readonly API_URL = 'https://api.deezer.com';
  private rateLimiter: RateLimiter;
  private cache: CacheStore;
  private options: DeezerOptions;

  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];

  public readonly albums: AlbumModule;
  public readonly artists: ArtistModule;
  public readonly charts: ChartModule;
  public readonly editorials: EditorialModule;
  public readonly episodes: EpisodeModule;
  public readonly genres: GenreModule;
  public readonly playlists: PlaylistModule;
  public readonly podcasts: PodcastModule;
  public readonly radios: RadioModule;
  public readonly search: SearchModule;
  public readonly tracks: TrackModule;
  public readonly users: UserModule;

  constructor(options: DeezerOptions = {}) {
    this.options = {
      timeout: 5000,
      maxRequestsPerSecond: 50,
      ...options
    };
    
    this.rateLimiter = new RateLimiter(this.options.maxRequestsPerSecond, 1000);
    this.cache = new CacheStore(60);

    this.albums = new AlbumModule(this);
    this.artists = new ArtistModule(this);
    this.charts = new ChartModule(this);
    this.editorials = new EditorialModule(this);
    this.episodes = new EpisodeModule(this);
    this.genres = new GenreModule(this);
    this.playlists = new PlaylistModule(this);
    this.podcasts = new PodcastModule(this);
    this.radios = new RadioModule(this);
    this.search = new SearchModule(this);
    this.tracks = new TrackModule(this);
    this.users = new UserModule(this);
  }

  /**
   * Adiciona um middleware para alterar a requisição antes dela voar pro servidor do Deezer.
   */
  public useRequestInterceptor(interceptor: RequestInterceptor): void {
    this.requestInterceptors.push(interceptor);
  }

  /**
   * Adiciona um middleware para interceptar e modificar o payload de resposta da API do Deezer.
   */
  public useResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.responseInterceptors.push(interceptor);
  }

  /**
   * Limpa manualmente a memória cache do client.
   */
  public clearCache(): void {
    this.cache.clear();
  }

  /**
   * Despacha uma requisição GET para o Deezer aplicando limits, cache e interceptadores.
   * Não use isso diretamente a menos que um endpoint muito bizarro não esteja implementado nos submódulos.
   */
  public async request<T>(
    endpoint: string,
    params: Record<string, any> = {},
    options: { cache?: boolean; ttl?: number } = {}
  ): Promise<T> {
    const url = new URL(`${DeezerClient.API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`);
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });

    const urlString = url.toString();

    // Se tiver no cache quentinho, já devolve daqui e poupa a rede
    if (options.cache !== false) {
      const cached = this.cache.get<T>(urlString);
      if (cached) return cached;
    }

    let requestUrl = urlString;
    let requestOptions: RequestInit = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    };

    if (this.options.timeout) {
      const controller = new AbortController();
      requestOptions.signal = controller.signal;
      setTimeout(() => controller.abort(), this.options.timeout);
    }

    // Passa pelo túnel dos request interceptors
    for (const interceptor of this.requestInterceptors) {
      const [newUrl, newOptions] = await interceptor(requestUrl, requestOptions);
      requestUrl = newUrl;
      requestOptions = newOptions;
    }

    const executeRequest = async () => {
      try {
        const response = await fetch(requestUrl, requestOptions);

        if (!response.ok) {
          throw new DeezerError(`HTTP Error: ${response.status} ${response.statusText}`, response.status);
        }

        let data = await response.json() as any;

        // O Deezer é espertinho e às vezes joga o erro dentro de um response HTTP 200 OK
        if (data.error) {
          throw new DeezerError(
            data.error.message || 'Erro na API do Deezer',
            data.error.code,
            data.error.type
          );
        }

        // Passa pelo túnel dos response interceptors
        for (const interceptor of this.responseInterceptors) {
          data = await interceptor(data);
        }

        // Salva na geladeira pra economizar requests no futuro
        if (options.cache !== false) {
          this.cache.set(urlString, data, options.ttl);
        }

        return data as T;
      } catch (error: any) {
        if (error.name === 'AbortError') {
          throw new DeezerError('A requisição excedeu o tempo limite (timeout).');
        }
        if (error instanceof DeezerError) {
          throw error;
        }
        throw new DeezerError(`Falha na requisição: ${error.message}`);
      }
    };

    return this.rateLimiter.schedule(executeRequest);
  }
}
