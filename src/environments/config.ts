import { isDevMode } from '@angular/core';

export const BACKEND_URL = 'http://v1115797.hosted-by-vdsina.ru:4000/';

export const BASE_URL = isDevMode() ? 'http://localhost:4200' : BACKEND_URL;
