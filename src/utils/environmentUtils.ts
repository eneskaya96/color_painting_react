export enum Environment {
  Development = 'development',
  Production = 'production',
}

export const CURRENT_ENVIRONMENT = process.env.NEXT_PUBLIC_ENV;
export const AUTH0_DOMAIN = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
export const AUTH0_CLIENT_ID = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;
export const AUTH0_CALLBACK_URL = process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL;
export const AUTH0_AUDIENCE = process.env.NEXT_PUBLIC_AUTH0_AUDIENCE;

export const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
export const BACKEND_API_TOKEN = process.env.NEXT_PUBLIC_BACKEND_API_TOKEN;
