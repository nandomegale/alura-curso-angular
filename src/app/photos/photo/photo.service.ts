import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPhoto } from './photo.model';

const API = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor(private _http: HttpClient) {}

  listFromUser(userName: string): Observable<IPhoto[]> {
    return this._http.get<IPhoto[]>(API + '/' + userName + '/photos');
  }

  listFromUserPaginated(userName: string, page: number): Observable<IPhoto[]> {
    const params = new HttpParams().append('page', page.toString());
    return this._http.get<IPhoto[]>(API + '/' + userName + '/photos', {
      params,
    });
  }
}
