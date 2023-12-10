export class BusinessException extends Error {
  public errorData: object;

  constructor(message: string, errorData?: object) {
    super(message);
    this.errorData = errorData ? errorData : {};
  }
}
