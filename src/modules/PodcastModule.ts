import { BaseModule } from './BaseModule';
import type { DeezerPodcast, PaginatedResponse, DeezerEpisode } from '../types';

/**
 * PodcastModule
 * Para encontrar e navegar pelos programas de podcast.
 */
export class PodcastModule extends BaseModule {
  /**
   * Pega os detalhes do podcast pelo ID (imagem, link, descricao).
   */
  public async get(id: number | string): Promise<DeezerPodcast> {
    return this.client.request<DeezerPodcast>(`/podcast/${id}`);
  }

  /**
   * Pega a lista de episódios de um podcast.
   * Ideal para montar o feed e deixar a paginação rolar no front.
   */
  public async getEpisodes(id: number | string, limit: number = 20): Promise<PaginatedResponse<DeezerEpisode>> {
    return this.client.request<PaginatedResponse<DeezerEpisode>>(`/podcast/${id}/episodes`, { limit });
  }
}
