import { BaseModule } from './BaseModule';
import type { DeezerUser, DeezerAlbum, DeezerArtist, DeezerPlaylist, DeezerTrack, PaginatedResponse } from '../types';

export class UserModule extends BaseModule {
  public async get(id: number | string): Promise<DeezerUser> {
    return this.client.request<DeezerUser>(`/user/${id}`);
  }

  public async getAlbums(id: number | string): Promise<PaginatedResponse<DeezerAlbum>> {
    return this.client.request<PaginatedResponse<DeezerAlbum>>(`/user/${id}/albums`);
  }

  public async getArtists(id: number | string): Promise<PaginatedResponse<DeezerArtist>> {
    return this.client.request<PaginatedResponse<DeezerArtist>>(`/user/${id}/artists`);
  }

  public async getPlaylists(id: number | string): Promise<PaginatedResponse<DeezerPlaylist>> {
    return this.client.request<PaginatedResponse<DeezerPlaylist>>(`/user/${id}/playlists`);
  }

  public async getTracks(id: number | string): Promise<PaginatedResponse<DeezerTrack>> {
    return this.client.request<PaginatedResponse<DeezerTrack>>(`/user/${id}/tracks`);
  }
}
