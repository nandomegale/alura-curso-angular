export class Alert {
  constructor(
    public readonly alertType: AlertType,
    public readonly message: string
  ) {}
}

export enum AlertType {
  SUCCESS = 0,
  WARNING = 1,
  DANGER = 2,
  INFO = 3,
}
