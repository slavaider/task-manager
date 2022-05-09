import { environment } from './environment';

export const PROD_BACKEND_URL =
  'https://slavaider-proxy.herokuapp.com/http://v1115797.hosted-by-vdsina.ru:4000';
export const DEV_BACKEND_URL = 'http://localhost:4200';

export const BASE_URL = environment.production ? PROD_BACKEND_URL : DEV_BACKEND_URL;
