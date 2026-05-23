import { describe, it, expect, beforeEach, mock, spyOn } from 'bun:test';
import { DeezerClient } from '../src/DeezerClient';
import { DeezerError } from '../src/errors/DeezerError';

describe('DeezerClient', () => {
  let client: DeezerClient;

  beforeEach(() => {
    client = new DeezerClient();
    client.clearCache();
  });

  it('deve instanciar com todas as propriedades', () => {
    expect(client.albums).toBeDefined();
    expect(client.artists).toBeDefined();
    expect(client.charts).toBeDefined();
    expect(client.playlists).toBeDefined();
    expect(client.search).toBeDefined();
    expect(client.tracks).toBeDefined();
    expect(client.users).toBeDefined();
  });

  it('deve conseguir buscar um artista (Eminem)', async () => {
    const fetchSpy = spyOn(globalThis, 'fetch').mockImplementation(async () => {
      return new Response(JSON.stringify({
        id: 13,
        name: 'Eminem',
        type: 'artist'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    });

    const artist = await client.artists.get(13);
    expect(artist.name).toBe('Eminem');
    expect(artist.id).toBe(13);

    fetchSpy.mockRestore();
  });

  it('deve lançar um DeezerError quando a API retorna erro (ex: artista não existe)', async () => {
    const fetchSpy = spyOn(globalThis, 'fetch').mockImplementation(async () => {
      return new Response(JSON.stringify({
        error: {
          type: 'DataException',
          message: 'no data',
          code: 800
        }
      }), {
        status: 200, // O Deezer muitas vezes retorna 200 mesmo com erro no payload
        headers: { 'Content-Type': 'application/json' }
      });
    });

    expect(client.artists.get(9999999999)).rejects.toThrow(DeezerError);

    fetchSpy.mockRestore();
  });
});
