import { BaseModule } from './BaseModule';
import type { DeezerAlbum, DeezerTrack, PaginatedResponse, DeezerUser } from '../types';

/**
 * AlbumModule
 * Gerencia a busca de álbuns, suas faixas e até os fãs que favoritaram.
 */
export class AlbumModule extends BaseModule {
  /**
   * Pega o álbum completo pelo ID (capas, data de lançamento, etc).
   */
  public async get(id: number | string): Promise<DeezerAlbum> {
    return this.client.request<DeezerAlbum>(`/album/${id}`);
  }

  /**
   * Pega apenas a lista de faixas de um álbum.
   */
  public async getTracks(id: number | string, limit: number = 50): Promise<PaginatedResponse<DeezerTrack>> {
    return this.client.request<PaginatedResponse<DeezerTrack>>(`/album/${id}/tracks`, { limit });
  }

  /**
   * Traz a galera (fãs) que tem esse álbum nos favoritos.
   */
  public async getFans(id: number | string, limit: number = 20): Promise<PaginatedResponse<DeezerUser>> {
    return this.client.request<PaginatedResponse<DeezerUser>>(`/album/${id}/fans`, { limit });
  }
}
