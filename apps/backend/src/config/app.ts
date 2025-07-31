function getEnv(key: string): string {
  const value: string | undefined = process.env[key];
  if (!value) {
    throw new Error(`❌ Environment variable "${key}" is not defined`);
  }
  return value;
}

export const APP_HOST: string = getEnv("APP_HOST");
export const APP_PORT: string = getEnv("APP_PORT");
export const TOKEN_AUDIENCE: string = getEnv("TOKEN_AUDIENCE");
export const TOKEN_DOMAIN: string = getEnv("TOKEN_DOMAIN");
export const NEWS_API_KEY: string = getEnv("NEWS_API_KEY");
