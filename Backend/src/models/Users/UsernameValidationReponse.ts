export default class UsernameValidationReponse {
    isUsernameValid: boolean;
    username: string;

    constructor(
        { isUsernameValid, username }:
            {
                isUsernameValid: boolean,
                username: string
            }) {
        this.username = username;
        this.isUsernameValid = isUsernameValid
    }
}