
  export interface UnauthorizedErrorModel {
    code: string;
    message: string;
  }
  
  export class UnauthorizedError {
    error: UnauthorizedErrorModel;
  
    constructor(error: UnauthorizedErrorModel) {
      this.error = error;
    }
  }
  