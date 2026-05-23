import { BaseModule } from './BaseModule';
import type { DeezerPlaylist, DeezerTrack, PaginatedResponse, DeezerUser } from '../types';

/**
 * PlaylistModule
 * Buscar playlists públicas, suas tracks e fãs.
 */
export class PlaylistModule extends BaseModule {
  /**
   * Carrega os metadados da playlist.
   */
  public async get(id: number | string): Promise<DeezerPlaylist> {
    return this.client.request<DeezerPlaylist>(`/playlist/${id}`);
  }

  /**
   * Carrega a lista completa de faixas dessa playlist.
   */
  public async getTracks(id: number | string, limit: number = 50): Promise<PaginatedResponse<DeezerTrack>> {
    return this.client.request<PaginatedResponse<DeezerTrack>>(`/playlist/${id}/tracks`, { limit });
  }

  /**
   * Usuários que adicionaram essa playlist nos favoritos.
   */
  public async getFans(id: number | string, limit: number = 20): Promise<PaginatedResponse<DeezerUser>> {
    return this.client.request<PaginatedResponse<DeezerUser>>(`/playlist/${id}/fans`, { limit });
  }

  /**
   * Rádio inteligente gerada a partir da vibe dessa playlist.
   */
  public async getRadio(id: number | string, limit: number = 20): Promise<PaginatedResponse<DeezerTrack>> {
    return this.client.request<PaginatedResponse<DeezerTrack>>(`/playlist/${id}/radio`, { limit });
  }
}
