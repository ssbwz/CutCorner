export default class ValidationError extends Error {
  field: string;
  message: string;
  value: string;

  constructor(field: string, message: string, value: string) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
    this.message = message;
    this.value = value;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }

}