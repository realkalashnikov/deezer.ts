import { BaseModule } from './BaseModule';
import type { DeezerArtist, DeezerAlbum, DeezerTrack, PaginatedResponse } from '../types';

export class ArtistModule extends BaseModule {
  public async get(id: number | string): Promise<DeezerArtist> {
    return this.client.request<DeezerArtist>(`/artist/${id}`);
  }

  public async getTop(id: number | string, limit: number = 10): Promise<PaginatedResponse<DeezerTrack>> {
    return this.client.request<PaginatedResponse<DeezerTrack>>(`/artist/${id}/top`, { limit });
  }

  public async getAlbums(id: number | string, limit: number = 25): Promise<PaginatedResponse<DeezerAlbum>> {
    return this.client.request<PaginatedResponse<DeezerAlbum>>(`/artist/${id}/albums`, { limit });
  }
}
