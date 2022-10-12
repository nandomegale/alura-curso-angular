import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from '../token/token.service';
import { IUser } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private _userSubject = new BehaviorSubject<IUser | null>(null);
  private userName = '';

  constructor(private _tokenService: TokenService) {
    if (this._tokenService.hasToken()) {
      this._decodeAndNotify();
    }
  }

  setToken(token: string) {
    this._tokenService.setToken(token);
    this._decodeAndNotify();
  }

  getUser() {
    return this._userSubject.asObservable();
  }

  private _decodeAndNotify() {
    const token = String(this._tokenService.getToken());
    const user = jwtDecode(token) as IUser;
    (this.userName = user.name), this._userSubject.next(user);
  }

  logout() {
    this._tokenService.removeToken();
    this._userSubject.next(null);
  }

  isLogged() {
    return this._tokenService.hasToken();
  }

  getUserName() {
    return this.userName;
  }
}
