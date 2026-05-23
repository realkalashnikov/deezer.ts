# deezer.ts

A massive, strongly typed, zero-dependency client for the Deezer API. Built for TypeScript and Node.js/Bun.

## Features

- 🛡️ **100% Coverage and Typing**: Covers Albums, Artists, Tracks, Playlists, Users, Podcasts, Episodes, Radios, Genres, Editorials, and Advanced Search. Everything is mapped.
- 📦 **Zero Dependencies**: Uses only native `fetch`. Ideal for Edge and Serverless.
- 🚦 **Built-in Rate Limiting**: Avoid getting blocked by the Deezer API. Automatic request queue management under the 50 req/s limit.
- 🚀 **Smart In-Memory Cache**: Avoid unnecessary calls by caching responses.
- 🔌 **Custom Interceptors**: Add logic before and after each API request.

## Installation

```bash
npm install github:realkalashnikov/deezer.ts
```

## Basic Usage

```typescript
import { DeezerClient } from 'deezer.ts';

const client = new DeezerClient();

async function run() {
  // Fetch artist profile, their top tracks and albums
  const artist = await client.artists.get(13); // Eminem
  const topTracks = await client.artists.getTop(13);
  
  // Get related radios and fans
  const radio = await client.artists.getRadio(13);
  const fans = await client.artists.getFans(13);

  // Podcasts and User History (Flow)
  const flow = await client.users.getFlow(123456);
  const podcast = await client.podcasts.get(123);
  
  // Advanced search
  const searchResults = await client.search.track('artist:"eminem" track:"lose yourself"');
}

run();
```

## Error Handling

The library throws `DeezerError` mapped errors when the API returns a failure.

```typescript
import { DeezerError } from 'deezer.ts';

try {
  await client.albums.get(9999999999);
} catch (error) {
  if (error instanceof DeezerError) {
    console.error(`API failed! Code: ${error.code} - ${error.message}`);
  }
}
```

## License
MIT
