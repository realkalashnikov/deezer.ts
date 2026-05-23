import type { DeezerClient } from '../DeezerClient';

export abstract class BaseModule {
  protected client: DeezerClient;

  constructor(client: DeezerClient) {
    this.client = client;
  }
}
