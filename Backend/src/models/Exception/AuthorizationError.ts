export default class AuthorizationError extends Error {
  message: string;
  shownMessage: string;

  constructor(message: string = "User isn't authoize for this action") {
    super(message);
    this.name = 'AuthorizationError';
    this.message = message;
    this.shownMessage = "User isn't authoize for this action";
    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }

}