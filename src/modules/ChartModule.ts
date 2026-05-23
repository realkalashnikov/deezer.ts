import { BaseModule } from './BaseModule';
import type { DeezerChart } from '../types';

export class ChartModule extends BaseModule {
  public async get(id: number | string = 0): Promise<DeezerChart> {
    return this.client.request<DeezerChart>(`/chart/${id}`);
  }
}
