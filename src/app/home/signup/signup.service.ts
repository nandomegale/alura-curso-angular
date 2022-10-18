import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewUser } from './new-user.model';

import { environment } from 'src/environments/environment';

const API = environment.ApiURL;

@Injectable()
export class SignUpService {
  constructor(private _http: HttpClient) {}

  checkUserNameTaken(userName: string) {
    return this._http.get(API + '/user/exists/' + userName);
  }

  signup(newUser: NewUser){
    return this._http.post(API + '/user/signup', newUser)
  }


}
