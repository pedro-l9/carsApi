export class HTTPError extends Error {
  public code: number;

  constructor(message: string, code = 500) {
    super(message);
    this.code = code;
  }
}

export class UsageAlreadyOpen extends HTTPError {
  constructor() {
    super('This driver already has a car usage open');
    this.code = 403;
  }
}

export class CarAlreadyInUse extends HTTPError {
  constructor() {
    super('This car is already in use by another driver');
    this.code = 403;
  }
}

export class NoCarWithId extends HTTPError {
  constructor(id: number) {
    super(`There is no car with the id ${id}`);
    this.code = 400;
  }
}

export class NoDriverWithId extends HTTPError {
  constructor(id: number) {
    super(`There is no driver with the id ${id}`);
    this.code = 400;
  }
}
