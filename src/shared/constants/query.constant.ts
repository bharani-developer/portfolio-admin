export const QUERY_CONFIG = {
  STALE_TIME: {
    SHORT: 1000 * 60,
    MEDIUM: 1000 * 60 * 5,
    LONG: 1000 * 60 * 15,
    VERY_LONG: 1000 * 60 * 60,
  },

  GC_TIME: {
    SHORT: 1000 * 60 * 5,
    MEDIUM: 1000 * 60 * 10,
    LONG: 1000 * 60 * 30,
    VERY_LONG: 1000 * 60 * 60,
  },

  RETRY: {
    DEFAULT: 1,
    CRITICAL: 3,
    NONE: 0,
  },

  REFETCH: {
    ON_WINDOW_FOCUS: false,
    ON_RECONNECT: true,
    ON_MOUNT: true,
  },

  PAGINATION: {
    KEEP_PREVIOUS_DATA: true,
  },
} as const;
