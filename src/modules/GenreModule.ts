import { BaseModule } from './BaseModule';
import type { DeezerGenre, PaginatedResponse, DeezerArtist, DeezerRadio } from '../types';

/**
 * GenreModule
 * Resolve tudo sobre gêneros musicais no Deezer.
 */
export class GenreModule extends BaseModule {
  /**
   * Lista todos os gêneros disponíveis (se não passar ID).
   */
  public async getGenres(): Promise<PaginatedResponse<DeezerGenre>> {
    return this.client.request<PaginatedResponse<DeezerGenre>>('/genre');
  }

  /**
   * Pega os detalhes de um gênero específico.
   */
  public async get(id: number | string): Promise<DeezerGenre> {
    return this.client.request<DeezerGenre>(`/genre/${id}`);
  }

  /**
   * Pega todos os artistas associados a um determinado gênero.
   */
  public async getArtists(id: number | string, limit: number = 20): Promise<PaginatedResponse<DeezerArtist>> {
    return this.client.request<PaginatedResponse<DeezerArtist>>(`/genre/${id}/artists`, { limit });
  }

  /**
   * Pega as estações de rádio temáticas de um gênero específico.
   */
  public async getRadios(id: number | string, limit: number = 20): Promise<PaginatedResponse<DeezerRadio>> {
    return this.client.request<PaginatedResponse<DeezerRadio>>(`/genre/${id}/radios`, { limit });
  }
}
