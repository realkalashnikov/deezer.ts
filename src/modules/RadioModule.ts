import { BaseModule } from './BaseModule';
import type { DeezerRadio, PaginatedResponse, DeezerTrack } from '../types';

/**
 * RadioModule
 * Ponto de entrada para acessar o catálogo de estações de rádio do Deezer.
 */
export class RadioModule extends BaseModule {
  /**
   * Lista todas as rádios base disponíveis.
   */
  public async getRadios(limit: number = 20): Promise<PaginatedResponse<DeezerRadio>> {
    return this.client.request<PaginatedResponse<DeezerRadio>>('/radio', { limit });
  }

  /**
   * Pega os detalhes de uma rádio específica pelo ID.
   */
  public async get(id: number | string): Promise<DeezerRadio> {
    return this.client.request<DeezerRadio>(`/radio/${id}`);
  }

  /**
   * Descobre quais são as top rádios do momento (em alta).
   */
  public async getTop(limit: number = 20): Promise<PaginatedResponse<DeezerRadio>> {
    return this.client.request<PaginatedResponse<DeezerRadio>>('/radio/top', { limit });
  }

  /**
   * Retorna as faixas que estão tocando ou disponíveis na lista da rádio solicitada.
   */
  public async getTracks(id: number | string, limit: number = 20): Promise<PaginatedResponse<DeezerTrack>> {
    return this.client.request<PaginatedResponse<DeezerTrack>>(`/radio/${id}/tracks`, { limit });
  }
}
