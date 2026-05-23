import { BaseModule } from './BaseModule';
import type { DeezerEditorial, PaginatedResponse, DeezerAlbum, DeezerChart } from '../types';

/**
 * EditorialModule
 * Controla os blocos de escolhas editoriais, seleções da equipe do Deezer e lançamentos.
 */
export class EditorialModule extends BaseModule {
  /**
   * Pega a lista de editoriais (seleções da semana, destaques, etc).
   */
  public async getEditorials(limit: number = 20): Promise<PaginatedResponse<DeezerEditorial>> {
    return this.client.request<PaginatedResponse<DeezerEditorial>>('/editorial', { limit });
  }

  /**
   * Pega os detalhes de um editorial específico pelo ID.
   */
  public async get(id: number | string): Promise<DeezerEditorial> {
    return this.client.request<DeezerEditorial>(`/editorial/${id}`);
  }

  /**
   * Retorna as paradas de sucesso (charts) daquele editorial específico.
   * Se quiser os globais, passe id = 0.
   */
  public async getCharts(id: number | string = 0): Promise<DeezerChart> {
    return this.client.request<DeezerChart>(`/editorial/${id}/charts`);
  }

  /**
   * Pega os novos lançamentos e recomendações separados por gêneros/editoriais.
   */
  public async getReleases(id: number | string = 0, limit: number = 20): Promise<PaginatedResponse<DeezerAlbum>> {
    return this.client.request<PaginatedResponse<DeezerAlbum>>(`/editorial/${id}/releases`, { limit });
  }
}
