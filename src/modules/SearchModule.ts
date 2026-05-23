import { BaseModule } from './BaseModule';
import type { DeezerSearchOptions, PaginatedResponse, DeezerTrack, DeezerAlbum, DeezerArtist, DeezerPlaylist, DeezerRadio, DeezerPodcast } from '../types';

/**
 * SearchModule
 * Busca unificada para todos os objetos do Deezer (track, album, artist, etc).
 */
export class SearchModule extends BaseModule {
  /**
   * Procura faixas. Suporta strings simples ou buscas avançadas como: 'artist:"eminem" track:"lose yourself"'
   */
  public async track(options: string | DeezerSearchOptions): Promise<PaginatedResponse<DeezerTrack>> {
    const params = typeof options === 'string' ? { q: options } : options;
    return this.client.request<PaginatedResponse<DeezerTrack>>(`/search`, params);
  }

  /**
   * Procura álbuns específicos.
   */
  public async album(options: string | DeezerSearchOptions): Promise<PaginatedResponse<DeezerAlbum>> {
    const params = typeof options === 'string' ? { q: options } : options;
    return this.client.request<PaginatedResponse<DeezerAlbum>>(`/search/album`, params);
  }

  /**
   * Procura artistas no catálogo.
   */
  public async artist(options: string | DeezerSearchOptions): Promise<PaginatedResponse<DeezerArtist>> {
    const params = typeof options === 'string' ? { q: options } : options;
    return this.client.request<PaginatedResponse<DeezerArtist>>(`/search/artist`, params);
  }

  /**
   * Busca playlists públicas contendo a palavra chave.
   */
  public async playlist(options: string | DeezerSearchOptions): Promise<PaginatedResponse<DeezerPlaylist>> {
    const params = typeof options === 'string' ? { q: options } : options;
    return this.client.request<PaginatedResponse<DeezerPlaylist>>(`/search/playlist`, params);
  }

  /**
   * Procura canais/estações de rádio pelo nome.
   */
  public async radio(options: string | DeezerSearchOptions): Promise<PaginatedResponse<DeezerRadio>> {
    const params = typeof options === 'string' ? { q: options } : options;
    return this.client.request<PaginatedResponse<DeezerRadio>>(`/search/radio`, params);
  }

  /**
   * Procura programas de podcast (cast).
   */
  public async podcast(options: string | DeezerSearchOptions): Promise<PaginatedResponse<DeezerPodcast>> {
    const params = typeof options === 'string' ? { q: options } : options;
    return this.client.request<PaginatedResponse<DeezerPodcast>>(`/search/podcast`, params);
  }
}
