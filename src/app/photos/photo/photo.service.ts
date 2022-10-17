import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPhoto, IPhotoComment } from './photo.model';

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

  upload(description: string, allowComments: boolean, file: File) {
    const formData = new FormData();
    formData.append('description', description);
    formData.append('allowComments', allowComments ? 'true' : 'false'),
      formData.append('imageFile', file);
    return this._http.post(API + '/photos/upload', formData);
  }

  findById(photoId: number): Observable<IPhoto> {
    return this._http.get<IPhoto>(API + '/photos/' + photoId);
  }

  getComments(photoId: number) {
    return this._http.get<IPhotoComment[]>(
      API + '/photos/' + photoId + '/comments'
    );
  }
}
