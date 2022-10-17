import { Component, Input, OnInit } from '@angular/core';
import { Alert, AlertType } from './alert.model';
import { AlertService } from './alert.service';

@Component({
  selector: 'ap-alert',
  templateUrl: 'alert.component.html',
})
export class AlertComponent implements OnInit {
  @Input() timeout = 3000;
  alerts: Alert[] = [];

  constructor(private _alertService: AlertService) {
    this._alertService.getAlert().subscribe({
      next: (alert) => {
        if (!alert) {
          this.alerts = [];
          return;
        }
        this.alerts.push(alert);
        setTimeout(() => this.removeAlert(alert), this.timeout);
      },
    });
  }

  ngOnInit() {}

  removeAlert(alertToRemove: Alert) {
    this.alerts = this.alerts.filter((alert) => alert != alertToRemove);
  }

  getAlertClass(alert: Alert) {
    if (!Alert) return '';
    switch (alert.alertType) {
      case AlertType.SUCCESS:
        return 'alert alert-success';
      case AlertType.WARNING:
        return 'alert alert-warning';
      case AlertType.DANGER:
        return 'alert alert-danger';
      case AlertType.INFO:
        return 'alert alert-info';
    }
  }
}
