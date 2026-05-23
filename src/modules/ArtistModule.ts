import { BaseModule } from './BaseModule';
import type { DeezerArtist, DeezerAlbum, DeezerTrack, PaginatedResponse, DeezerPlaylist, DeezerUser } from '../types';

/**
 * ArtistModule
 * Focado no artista: top faixas, álbuns, fãs e relacionados.
 */
export class ArtistModule extends BaseModule {
  /**
   * Pega os dados principais do artista (imagem, nome, stats).
   */
  public async get(id: number | string): Promise<DeezerArtist> {
    return this.client.request<DeezerArtist>(`/artist/${id}`);
  }

  /**
   * As top 10 músicas mais famosas do artista no Deezer.
   */
  public async getTop(id: number | string, limit: number = 10): Promise<PaginatedResponse<DeezerTrack>> {
    return this.client.request<PaginatedResponse<DeezerTrack>>(`/artist/${id}/top`, { limit });
  }

  /**
   * Todos os álbuns, singles e EPs já lançados pelo artista.
   */
  public async getAlbums(id: number | string, limit: number = 25): Promise<PaginatedResponse<DeezerAlbum>> {
    return this.client.request<PaginatedResponse<DeezerAlbum>>(`/artist/${id}/albums`, { limit });
  }

  /**
   * Descubra artistas parecidos com este (recomendação do Deezer).
   */
  public async getRelated(id: number | string, limit: number = 20): Promise<PaginatedResponse<DeezerArtist>> {
    return this.client.request<PaginatedResponse<DeezerArtist>>(`/artist/${id}/related`, { limit });
  }

  /**
   * Smart radio baseada nesse artista.
   */
  public async getRadio(id: number | string, limit: number = 20): Promise<PaginatedResponse<DeezerTrack>> {
    return this.client.request<PaginatedResponse<DeezerTrack>>(`/artist/${id}/radio`, { limit });
  }

  /**
   * Playlists editoriais e públicas que contém faixas desse artista.
   */
  public async getPlaylists(id: number | string, limit: number = 20): Promise<PaginatedResponse<DeezerPlaylist>> {
    return this.client.request<PaginatedResponse<DeezerPlaylist>>(`/artist/${id}/playlists`, { limit });
  }

  /**
   * Lista dos fãs mais apaixonados (que favoritaram o artista).
   */
  public async getFans(id: number | string, limit: number = 20): Promise<PaginatedResponse<DeezerUser>> {
    return this.client.request<PaginatedResponse<DeezerUser>>(`/artist/${id}/fans`, { limit });
  }
}
