declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      JWT_SECRET: string;
      JWT_EXPIRES_IN: string;
      MONGO_URI: string;
    }
  }
}

export {};
