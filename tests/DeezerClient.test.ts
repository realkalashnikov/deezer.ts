import { describe, it, expect, beforeEach, mock, spyOn } from 'bun:test';
import { DeezerClient } from '../src/DeezerClient';
import { DeezerError } from '../src/errors/DeezerError';

describe('DeezerClient', () => {
  let client: DeezerClient;

  beforeEach(() => {
    client = new DeezerClient();
    client.clearCache();
  });

  it('should instantiate with all properties', () => {
    expect(client.albums).toBeDefined();
    expect(client.artists).toBeDefined();
    expect(client.charts).toBeDefined();
    expect(client.playlists).toBeDefined();
    expect(client.search).toBeDefined();
    expect(client.tracks).toBeDefined();
    expect(client.users).toBeDefined();
  });

  it('should be able to fetch an artist (Eminem)', async () => {
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

  it('should throw a DeezerError when the API returns an error (e.g., artist does not exist)', async () => {
    const fetchSpy = spyOn(globalThis, 'fetch').mockImplementation(async () => {
      return new Response(JSON.stringify({
        error: {
          type: 'DataException',
          message: 'no data',
          code: 800
        }
      }), {
        status: 200, // Deezer often returns 200 even with an error in the payload
        headers: { 'Content-Type': 'application/json' }
      });
    });

    expect(client.artists.get(9999999999)).rejects.toThrow(DeezerError);

    fetchSpy.mockRestore();
  });
});
