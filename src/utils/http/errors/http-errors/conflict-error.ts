export interface ConflictErrorModel {
  code: string;
  message: string;
}

export class ConflictError {
  error: ConflictErrorModel;

  constructor(error: ConflictErrorModel) {
    this.error = error;
  }
}
