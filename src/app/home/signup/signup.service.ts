import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewUser } from './new-user.model';

const API_URL = 'http://localhost:3000';

@Injectable()
export class SignUpService {
  constructor(private _http: HttpClient) {}

  checkUserNameTaken(userName: string) {
    return this._http.get(API_URL + '/user/exists/' + userName);
  }

  signup(newUser: NewUser){
    return this._http.post(API_URL + '/user/signup', newUser)
  }


}
