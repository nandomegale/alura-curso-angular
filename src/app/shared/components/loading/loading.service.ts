import { Injectable } from '@angular/core';
import { startWith, Subject } from 'rxjs';
import { LoadingType } from './loading.model';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loadingSubject: Subject<LoadingType> = new Subject<LoadingType>();

  getLoading() {
    return this.loadingSubject
      .asObservable()
      .pipe(startWith(LoadingType.STOPPED));
  }

  start() {
    this.loadingSubject.next(LoadingType.LOADING);
  }

  stop() {
    this.loadingSubject.next(LoadingType.STOPPED);
  }
}
