import { BaseModule } from './BaseModule';
import type { DeezerUser, DeezerAlbum, DeezerArtist, DeezerPlaylist, DeezerTrack, PaginatedResponse, DeezerRadio, DeezerPodcast } from '../types';

/**
 * UserModule
 * Coleta todas as informações de perfis públicos de usuários no Deezer.
 */
export class UserModule extends BaseModule {
  /**
   * Retorna os dados básicos do perfil do usuário.
   */
  public async get(id: number | string): Promise<DeezerUser> {
    return this.client.request<DeezerUser>(`/user/${id}`);
  }

  /**
   * Todos os álbuns que esse usuário favoritou.
   */
  public async getAlbums(id: number | string, limit: number = 20): Promise<PaginatedResponse<DeezerAlbum>> {
    return this.client.request<PaginatedResponse<DeezerAlbum>>(`/user/${id}/albums`, { limit });
  }

  /**
   * A biblioteca de artistas curtidos pelo usuário.
   */
  public async getArtists(id: number | string, limit: number = 20): Promise<PaginatedResponse<DeezerArtist>> {
    return this.client.request<PaginatedResponse<DeezerArtist>>(`/user/${id}/artists`, { limit });
  }

  /**
   * Playlists criadas ou favoritadas por essa pessoa.
   */
  public async getPlaylists(id: number | string, limit: number = 20): Promise<PaginatedResponse<DeezerPlaylist>> {
    return this.client.request<PaginatedResponse<DeezerPlaylist>>(`/user/${id}/playlists`, { limit });
  }

  /**
   * A lista de músicas favoritas (liked tracks) do usuário.
   */
  public async getTracks(id: number | string, limit: number = 50): Promise<PaginatedResponse<DeezerTrack>> {
    return this.client.request<PaginatedResponse<DeezerTrack>>(`/user/${id}/tracks`, { limit });
  }

  /**
   * O famoso 'Flow' pessoal. A inteligência do Deezer rodando para esse usuário.
   */
  public async getFlow(id: number | string, limit: number = 20): Promise<PaginatedResponse<DeezerTrack>> {
    return this.client.request<PaginatedResponse<DeezerTrack>>(`/user/${id}/flow`, { limit });
  }

  /**
   * Histórico recente do que esse usuário andou escutando.
   */
  public async getHistory(id: number | string, limit: number = 20): Promise<PaginatedResponse<DeezerTrack>> {
    return this.client.request<PaginatedResponse<DeezerTrack>>(`/user/${id}/history`, { limit });
  }

  /**
   * Perfis que este usuário segue no Deezer.
   */
  public async getFollowings(id: number | string, limit: number = 20): Promise<PaginatedResponse<DeezerUser>> {
    return this.client.request<PaginatedResponse<DeezerUser>>(`/user/${id}/followings`, { limit });
  }

  /**
   * Pessoas que estão seguindo esse perfil.
   */
  public async getFollowers(id: number | string, limit: number = 20): Promise<PaginatedResponse<DeezerUser>> {
    return this.client.request<PaginatedResponse<DeezerUser>>(`/user/${id}/followers`, { limit });
  }

  /**
   * Rádios que o usuário favoritou.
   */
  public async getRadios(id: number | string, limit: number = 20): Promise<PaginatedResponse<DeezerRadio>> {
    return this.client.request<PaginatedResponse<DeezerRadio>>(`/user/${id}/radios`, { limit });
  }

  /**
   * Podcasts assinados pelo usuário.
   */
  public async getPodcasts(id: number | string, limit: number = 20): Promise<PaginatedResponse<DeezerPodcast>> {
    return this.client.request<PaginatedResponse<DeezerPodcast>>(`/user/${id}/podcasts`, { limit });
  }

  /**
   * O Top histórico pessoal desse usuário.
   */
  public async getCharts(id: number | string, category: 'tracks' | 'albums' | 'artists' | 'playlists' = 'tracks', limit: number = 20): Promise<PaginatedResponse<any>> {
    return this.client.request<PaginatedResponse<any>>(`/user/${id}/charts/${category}`, { limit });
  }
}
