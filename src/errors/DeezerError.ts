export class DeezerError extends Error {
  public code?: number;
  public type?: string;

  constructor(message: string, code?: number, type?: string) {
    super(message);
    this.name = 'DeezerError';
    this.code = code;
    this.type = type;

    if ((Error as any).captureStackTrace) {
      (Error as any).captureStackTrace(this, DeezerError);
    }
  }
}
