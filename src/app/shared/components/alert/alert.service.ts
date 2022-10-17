import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { clear } from 'console';
import { Subject } from 'rxjs';
import { Alert, AlertType } from './alert.model';

@Injectable({ providedIn: 'root' })
export class AlertService {
  alertSubject: Subject<Alert> = new Subject<Alert>();
  keepAfterRouteChange = false;

  constructor(private _router: Router) {
    _router.events.subscribe({
      next: (event) => {
        if (event instanceof NavigationStart) {
          if (this.keepAfterRouteChange) {
            this.keepAfterRouteChange = false;
          } else {
            this.clear();
          }
        }
      },
    });
  }

  success(message: string, keepAfterRouteChange: boolean = false) {
    this._alert(AlertType.SUCCESS, message, keepAfterRouteChange);
  }

  warning(message: string, keepAfterRouteChange: boolean = false) {
    this._alert(AlertType.WARNING, message, keepAfterRouteChange);
  }

  danger(message: string, keepAfterRouteChange: boolean = false) {
    this._alert(AlertType.DANGER, message, keepAfterRouteChange);
  }

  info(message: string, keepAfterRouteChange: boolean = false) {
    this._alert(AlertType.INFO, message, keepAfterRouteChange);
  }

  private _alert(
    alertType: AlertType,
    message: string,
    keepAfterRouteChange: boolean = false
  ) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.alertSubject.next(new Alert(alertType, message));
  }

  getAlert() {
    return this.alertSubject.asObservable();
  }

  clear() {
    this.alertSubject.next(null);
  }
}
