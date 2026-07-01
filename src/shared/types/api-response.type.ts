// src\shared\types\api-response.type.ts

export interface IApiMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface IApiResponse<T> {
  success: boolean;

  statusCode: number;

  message: string;

  data: T;
}

export interface IPaginatedApiResponse<T> {
  success: boolean;

  statusCode: number;

  message: string;

  meta: IApiMeta;

  data: T[];
}

export interface IErrorSource {
  path: string;

  message: string;
}

export interface IApiErrorResponse {
  success: false;

  statusCode: number;

  message: string;

  errorSources?: IErrorSource[];

  stack?: string;
}
