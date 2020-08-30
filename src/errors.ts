export class HTTPError extends Error {
  public code: number;

  constructor(message: string, code = 500) {
    super(message);
    this.code = code;
  }
}

export class UsageAlreadyOpen extends HTTPError {
  constructor() {
    super('This user already has a car usage open');
    this.code = 403;

    Object.setPrototypeOf(this, UsageAlreadyOpen.prototype);
  }
}

export class CarAlreadyInUse extends HTTPError {
  constructor() {
    super('This car is already in use by another driver');
    this.code = 403;

    Object.setPrototypeOf(this, CarAlreadyInUse.prototype);
  }
}
