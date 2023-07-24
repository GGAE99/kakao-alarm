export type Tokens = {
    accessToken: string;
    refreshToken: string;
  };
  
  export interface JwtPayload {
    email: string;
  }
  
  type RefreshTokenObj = { refreshToken: string };
  export type JwtPayloadWithRefreshToken = JwtPayload & RefreshTokenObj;
  
  export enum CookieKeys {
    ACCESS_TOKEN = 'AppAT',
    REFRESH_TOKEN = 'AppRT',
  }

  export type UserPayload = {
    email: string;
  }
  