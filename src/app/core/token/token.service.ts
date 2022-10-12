import { Injectable } from '@angular/core';

const KEY = 'authToken';

@Injectable({ providedIn: 'root' })
export class TokenService {
  constructor() {}

  hasToken() {
    return !!this.getToken();
  }

  setToken(token: string) {
    window.localStorage.setItem(KEY, token);
  }

  getToken(): string | null{
    return window.localStorage.getItem(KEY);
  }

  removeToken() {
    window.localStorage.removeItem(KEY);
  }


}
