import { BaseModule } from './BaseModule';
import type { DeezerEpisode } from '../types';

/**
 * EpisodeModule
 * Módulo focado especificamente no episódio de um podcast.
 */
export class EpisodeModule extends BaseModule {
  /**
   * Traz toda a metadata de um episódio pelo ID.
   */
  public async get(id: number | string): Promise<DeezerEpisode> {
    return this.client.request<DeezerEpisode>(`/episode/${id}`);
  }
}
