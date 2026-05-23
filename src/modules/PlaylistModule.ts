import { BaseModule } from './BaseModule';
import type { DeezerPlaylist, DeezerTrack, PaginatedResponse } from '../types';

export class PlaylistModule extends BaseModule {
  public async get(id: number | string): Promise<DeezerPlaylist> {
    return this.client.request<DeezerPlaylist>(`/playlist/${id}`);
  }

  public async getTracks(id: number | string): Promise<PaginatedResponse<DeezerTrack>> {
    return this.client.request<PaginatedResponse<DeezerTrack>>(`/playlist/${id}/tracks`);
  }
}
