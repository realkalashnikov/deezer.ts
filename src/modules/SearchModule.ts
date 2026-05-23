import { BaseModule } from './BaseModule';
import type { DeezerSearchOptions, PaginatedResponse, DeezerTrack, DeezerAlbum, DeezerArtist, DeezerPlaylist } from '../types';

export class SearchModule extends BaseModule {
  public async track(options: string | DeezerSearchOptions): Promise<PaginatedResponse<DeezerTrack>> {
    const params = typeof options === 'string' ? { q: options } : options;
    return this.client.request<PaginatedResponse<DeezerTrack>>(`/search`, params);
  }

  public async album(options: string | DeezerSearchOptions): Promise<PaginatedResponse<DeezerAlbum>> {
    const params = typeof options === 'string' ? { q: options } : options;
    return this.client.request<PaginatedResponse<DeezerAlbum>>(`/search/album`, params);
  }

  public async artist(options: string | DeezerSearchOptions): Promise<PaginatedResponse<DeezerArtist>> {
    const params = typeof options === 'string' ? { q: options } : options;
    return this.client.request<PaginatedResponse<DeezerArtist>>(`/search/artist`, params);
  }

  public async playlist(options: string | DeezerSearchOptions): Promise<PaginatedResponse<DeezerPlaylist>> {
    const params = typeof options === 'string' ? { q: options } : options;
    return this.client.request<PaginatedResponse<DeezerPlaylist>>(`/search/playlist`, params);
  }
}
