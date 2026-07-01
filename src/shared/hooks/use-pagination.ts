// src\shared\hooks\use-pagination.ts

import { useCallback, useState } from "react";

interface UsePaginationOptions {
  initialPage?: number;
  initialLimit?: number;
}

interface PaginationState {
  page: number;
  limit: number;
}

interface UsePaginationReturn {
  page: number;
  limit: number;

  setPage: (page: number) => void;

  setLimit: (limit: number) => void;

  nextPage: () => void;

  previousPage: () => void;

  resetPagination: () => void;

  pagination: PaginationState;
}

export function usePagination({
  initialPage = 1,
  initialLimit = 10,
}: UsePaginationOptions = {}): UsePaginationReturn {
  const [page, setPageState] = useState(initialPage);

  const [limit, setLimitState] = useState(initialLimit);

  const setPage = useCallback((newPage: number): void => {
    setPageState(Math.max(1, newPage));
  }, []);

  const setLimit = useCallback((newLimit: number): void => {
    setLimitState(newLimit);

    setPageState(1);
  }, []);

  const nextPage = useCallback((): void => {
    setPageState((currentPage) => currentPage + 1);
  }, []);

  const previousPage = useCallback((): void => {
    setPageState((currentPage) => Math.max(1, currentPage - 1));
  }, []);

  const resetPagination = useCallback((): void => {
    setPageState(initialPage);

    setLimitState(initialLimit);
  }, [initialPage, initialLimit]);

  return {
    page,
    limit,

    setPage,
    setLimit,

    nextPage,
    previousPage,

    resetPagination,

    pagination: {
      page,
      limit,
    },
  };
}
