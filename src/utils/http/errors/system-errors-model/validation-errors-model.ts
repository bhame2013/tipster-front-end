export interface ValidationErrorModel {
  validationErrors: {
    [key: string]: {
      errors: string[]
    }
  }
}

export class ValidationError {
  errors: ValidationErrorModel

  constructor(errors: ValidationErrorModel) {
    this.errors = errors
  }
}
