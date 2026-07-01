// src\app\query-client.ts

import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      console.error("Query Error:", error);
    },
  }),

  mutationCache: new MutationCache({
    onError: (error) => {
      console.error("Mutation Error:", error);
    },
  }),

  defaultOptions: {
    queries: {
      retry: 1,

      staleTime: 1000 * 60 * 5,

      gcTime: 1000 * 60 * 10,

      refetchOnWindowFocus: false,

      refetchOnReconnect: true,

      refetchOnMount: true,

      networkMode: "online",
    },

    mutations: {
      retry: 1,

      networkMode: "online",
    },
  },
});
