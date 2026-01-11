export interface BadRequestErrorModel {
  code: string;
  message: string;
  data?: any;
}

export class BadRequestError {
  error: BadRequestErrorModel;

  constructor(error: BadRequestErrorModel) {
    this.error = error;
  }
}
