export interface DeezerOptions {
  /**
   * Timeout opcional para as requisições em milissegundos
   * @default 5000
   */
  timeout?: number;
  /**
   * Quantidade máxima de requisições por segundo
   * @default 50 (limite oficial do Deezer)
   */
  maxRequestsPerSecond?: number;
}

export interface RequestInterceptor {
  (url: string, options: RequestInit): Promise<[string, RequestInit]>;
}

export interface ResponseInterceptor {
  (response: unknown): Promise<unknown>;
}

export interface Paging {
  total: number;
  next?: string;
  prev?: string;
}

export interface PaginatedResponse<T> extends Paging {
  data: T[];
}

export interface DeezerArtist {
  id: number;
  name: string;
  link: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  nb_album?: number;
  nb_fan?: number;
  radio?: boolean;
  tracklist: string;
  type: 'artist';
}

export interface DeezerAlbum {
  id: number;
  title: string;
  upc?: string;
  link: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  genre_id?: number;
  genres?: PaginatedResponse<DeezerGenre>;
  label?: string;
  nb_tracks?: number;
  duration?: number;
  fans?: number;
  release_date?: string;
  record_type?: string;
  available?: boolean;
  tracklist: string;
  explicit_lyrics?: boolean;
  artist?: DeezerArtist;
  tracks?: PaginatedResponse<DeezerTrack>;
  type: 'album';
}

export interface DeezerTrack {
  id: number;
  readable: boolean;
  title: string;
  title_short: string;
  title_version?: string;
  link: string;
  duration: number;
  track_position?: number;
  disk_number?: number;
  rank: number;
  release_date?: string;
  explicit_lyrics: boolean;
  explicit_content_lyrics?: number;
  explicit_content_cover?: number;
  preview: string;
  bpm?: number;
  gain?: number;
  artist: DeezerArtist;
  album: DeezerAlbum;
  type: 'track';
}

export interface DeezerPlaylist {
  id: number;
  title: string;
  description?: string;
  duration?: number;
  public?: boolean;
  is_loved_track?: boolean;
  collaborative?: boolean;
  nb_tracks?: number;
  fans?: number;
  link: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  checksum?: string;
  creator?: DeezerUser;
  tracks?: PaginatedResponse<DeezerTrack>;
  type: 'playlist';
}

export interface DeezerUser {
  id: number;
  name: string;
  lastname?: string;
  firstname?: string;
  email?: string;
  status?: number;
  birthday?: string;
  inscription_date?: string;
  gender?: string;
  link: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  country?: string;
  lang?: string;
  is_kid?: boolean;
  tracklist: string;
  type: 'user';
}

export interface DeezerGenre {
  id: number;
  name: string;
  picture: string;
  type: 'genre';
}

export interface DeezerChart {
  tracks: PaginatedResponse<DeezerTrack>;
  albums: PaginatedResponse<DeezerAlbum>;
  artists: PaginatedResponse<DeezerArtist>;
  playlists: PaginatedResponse<DeezerPlaylist>;
  podcasts: PaginatedResponse<any>;
}

export interface DeezerSearchOptions {
  q: string;
  strict?: 'on';
  order?: 'RANKING' | 'TRACK_ASC' | 'TRACK_DESC' | 'ARTIST_ASC' | 'ARTIST_DESC' | 'ALBUM_ASC' | 'ALBUM_DESC' | 'RATING_ASC' | 'RATING_DESC' | 'DURATION_ASC' | 'DURATION_DESC';
  index?: number;
  limit?: number;
}

export interface DeezerPodcast {
  id: number;
  title: string;
  description: string;
  available: boolean;
  rating: number;
  fans: number;
  link: string;
  share: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  type: 'podcast';
}

export interface DeezerEpisode {
  id: number;
  title: string;
  description: string;
  available: boolean;
  release_date: string;
  duration: number;
  link: string;
  share: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  podcast: DeezerPodcast;
  type: 'episode';
}

export interface DeezerRadio {
  id: number;
  title: string;
  description: string;
  share: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  tracklist: string;
  type: 'radio';
}

export interface DeezerEditorial {
  id: number;
  name: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  type: 'editorial';
}
