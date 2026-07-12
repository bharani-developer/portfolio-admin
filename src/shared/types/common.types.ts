// src\shared\types\common.type.ts

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type Maybe<T> = T | null | undefined;

export interface IBaseEntity {
  _id: string;

  createdAt: string;

  updatedAt: string;
}

export interface ISelectOption<TValue extends string | number = string> {
  label: string;

  value: TValue;

  disabled?: boolean;
}

export interface ILabelValuePair<TValue = string> {
  label: string;

  value: TValue;
}

export interface IStatusOption {
  label: string;

  value: string;

  color?: string;
}

export interface IDateRange {
  from: Date;

  to: Date;
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

export type AsyncFunction<TResult> = () => Promise<TResult>;

export type VoidFunction = () => void;

export type ValueOf<T> = T[keyof T];
