import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { IPhoto } from '../photo/photo.model';
import { PhotoService } from '../photo/photo.service';

@Injectable({
  providedIn: 'root',
})
export class PhotoListResolver implements Resolve<Observable<IPhoto[]>> {
  constructor(private _photoService: PhotoService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IPhoto[]> {
    const userName = route.params['userName'];

    return this._photoService.listFromUserPaginated(userName, 1);
  }
}
