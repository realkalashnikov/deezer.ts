import { BaseModule } from './BaseModule';
import type { DeezerAlbum, DeezerTrack, PaginatedResponse } from '../types';

export class AlbumModule extends BaseModule {
  public async get(id: number | string): Promise<DeezerAlbum> {
    return this.client.request<DeezerAlbum>(`/album/${id}`);
  }

  public async getTracks(id: number | string): Promise<PaginatedResponse<DeezerTrack>> {
    return this.client.request<PaginatedResponse<DeezerTrack>>(`/album/${id}/tracks`);
  }
}
