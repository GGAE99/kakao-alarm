export interface ConfigType {
    PORT: number;

    DB_HOST: string;
    DB_PORT: number;
    DB_USER: string;
    DB_PASS: string;
    DB_NAME: string;

    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_SECRET: string;
    ACCESS_TOKEN_EXPIRE_SEC: number;
    REFRESH_TOKEN_EXPIRE_SEC: number;
    
    REDIS_HOST: string;
    REDIS_PORT: number;
  
    KAKAO_OAUTH_REST_API_KEY: string;
    KAKAO_OAUTH_SECRET: string;
  }
  