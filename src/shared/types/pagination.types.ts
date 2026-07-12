// src\shared\types\pagination.type.ts

export interface IPaginationMeta {
  page: number;

  limit: number;

  total: number;

  totalPage: number;
}

export interface IPaginationParams {
  page?: number;

  limit?: number;
}

export interface ISearchParams {
  searchTerm?: string;
}

export interface ISortParams {
  sortBy?: string;

  sortOrder?: "asc" | "desc";
}

export interface IBaseQueryParams
  extends IPaginationParams, ISearchParams, ISortParams {
  fields?: string;
}

export interface IPaginatedData<T> {
  meta: IPaginationMeta;

  data: T[];
}
