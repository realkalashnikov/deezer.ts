# deezer.ts

Um client gigantesco, fortemente tipado e com zero dependências para a API do Deezer. Feito para TypeScript e Node.js/Bun.

## Características

- 🛡️ **100% de Cobertura e Tipagem**: Engloba Álbuns, Artistas, Tracks, Playlists, Usuários, Podcasts, Episódios, Rádios, Gêneros, Editoriais e Busca Avançada. Tudo mapeado.
- 📦 **Zero Dependências**: Usa apenas o `fetch` nativo. Ideal para Edge e Serverless.
- 🚦 **Rate Limiting Embutido**: Evite ser bloqueado pela API do Deezer. Gerenciamento automático da fila de requisições sob o limite de 50 req/s.
- 🚀 **Cache Inteligente na Memória**: Evite chamadas desnecessárias guardando as respostas.
- 🔌 **Interceptadores Customizados**: Adicione lógica antes e depois de cada request da API.

## Instalação

```bash
npm install github:realkalashnikov/deezer.ts
```

## Uso Básico

```typescript
import { DeezerClient } from 'deezer.ts';

const client = new DeezerClient();

async function run() {
  // Buscar o perfil do artista, seus top tracks e álbuns
  const artist = await client.artists.get(13); // Eminem
  const topTracks = await client.artists.getTop(13);
  
  // Pegar as rádios relacionadas e fãs
  const radio = await client.artists.getRadio(13);
  const fans = await client.artists.getFans(13);

  // Podcasts e Histórico de Usuário (Flow)
  const flow = await client.users.getFlow(123456);
  const podcast = await client.podcasts.get(123);
  
  // Busca avançada
  const searchResults = await client.search.track('artist:"eminem" track:"lose yourself"');
}

run();
```

## Tratamento de Erros

A biblioteca lança erros do tipo `DeezerError` mapeados quando a API retorna falha.

```typescript
import { DeezerError } from 'deezer.ts';

try {
  await client.albums.get(9999999999);
} catch (error) {
  if (error instanceof DeezerError) {
    console.error(`Deu ruim na API! Código: ${error.code} - ${error.message}`);
  }
}
```

## Licença
MIT
