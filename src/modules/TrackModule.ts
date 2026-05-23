import { BaseModule } from './BaseModule';
import type { DeezerTrack } from '../types';

export class TrackModule extends BaseModule {
  public async get(id: number | string): Promise<DeezerTrack> {
    return this.client.request<DeezerTrack>(`/track/${id}`);
  }
}
