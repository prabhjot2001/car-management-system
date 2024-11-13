const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (value === undefined) {
    throw new Error(`cannot find the environment variable ${key}`);
  }

  return value;
};

export const PORT = getEnv("PORT", "5000");
export const APP_ORIGIN = getEnv("APP_ORIGIN");
export const URL = getEnv("URL");
