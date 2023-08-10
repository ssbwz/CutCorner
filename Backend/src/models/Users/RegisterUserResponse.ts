export default class RegisterUserResponse {
  success: boolean;
  message: string;
  timestamp: string;

  constructor(success: boolean = true, message: string = 'user registered') {
    this.success = success;
    this.message = message;
    this.timestamp = new Date().toLocaleString();
  }

  static error(message: string) {
    return new RegisterUserResponse(false, message);
  }
}