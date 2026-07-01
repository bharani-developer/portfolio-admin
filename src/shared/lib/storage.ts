const isBrowser = typeof window !== "undefined";

export const storage = {
  get<T>(key: string): T | null {
    if (!isBrowser) {
      return null;
    }

    try {
      const value = localStorage.getItem(key);

      if (!value) {
        return null;
      }

      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  },

  set<T>(key: string, value: T): void {
    if (!isBrowser) {
      return;
    }

    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore storage errors
    }
  },

  remove(key: string): void {
    if (!isBrowser) {
      return;
    }

    localStorage.removeItem(key);
  },

  clear(): void {
    if (!isBrowser) {
      return;
    }

    localStorage.clear();
  },

  has(key: string): boolean {
    if (!isBrowser) {
      return false;
    }

    return localStorage.getItem(key) !== null;
  },
} as const;
