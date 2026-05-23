# deezer.ts

Um client completo, fortemente tipado e com zero dependências para a API do Deezer. Feito para TypeScript e Node.js/Bun.

## Características

- 🛡️ **Fortemente Tipado**: Tipos completos para todos os retornos e endpoints da API do Deezer.
- 📦 **Zero Dependências**: Usa apenas o `fetch` nativo.
- 🚦 **Rate Limiting Embutido**: Evite ser bloqueado pela API do Deezer. Gerenciamento automático da fila de requisições.
- 🚀 **Cache Automático**: Evite chamadas desnecessárias guardando as respostas na memória por um tempo determinado.
- 🔌 **Interceptadores**: Adicione lógica customizada antes e depois de cada requisição.

## Instalação

```bash
npm install github:realkalashnikov/deezer.ts
```
*(Certifique-se de configurar a tag de versão se for usar em produção)*

## Uso Básico

```typescript
import { DeezerClient } from 'deezer.ts';

const client = new DeezerClient();

async function run() {
  // Buscar um artista
  const artist = await client.artists.get(13); // Eminem
  console.log(artist.name);

  // Buscar os top tracks de um artista
  const topTracks = await client.artists.getTop(13);
  console.log(topTracks.data.map(track => track.title));
  
  // Fazer uma busca geral
  const searchResults = await client.search.track('Lose Yourself');
  console.log(searchResults.data[0].title);
}

run();
```

## Tratamento de Erros

A biblioteca lança erros do tipo `DeezerError` quando a API retorna alguma falha (como ID inválido, limite excedido, etc).

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
