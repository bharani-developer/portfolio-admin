// src\shared\types\error.type.ts

export interface IErrorSource {
  path: string;

  message: string;
}

export interface IApiError {
  success: false;

  statusCode: number;

  message: string;

  errorSources?: IErrorSource[];

  stack?: string;
}
