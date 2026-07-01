function getEnvVariable(key: keyof ImportMetaEnv): string {
  const value = import.meta.env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

export const env = {
  APP_ENV: import.meta.env.MODE,

  APP_NAME: import.meta.env.VITE_APP_NAME ?? "Portfolio Admin",

  API_BASE_URL: getEnvVariable("VITE_API_BASE_URL"),

  ENABLE_DEVTOOLS: import.meta.env.VITE_ENABLE_DEVTOOLS === "true",

  IS_DEVELOPMENT: import.meta.env.DEV,

  IS_PRODUCTION: import.meta.env.PROD,

  GOOGLE_CLIENT_ID: import.meta.env.GOOGLE_CLIENT_ID,

} as const;
