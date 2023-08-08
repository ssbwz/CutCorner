export default class GoogleLoginRequest {
    first_name: string;
    last_name: string;
    email: string;
    accountPhotoUrl: string

    constructor({
        first_name,
        last_name,
        email,
        accountPhotoUrl
    }: {
        first_name: string;
        last_name: string;
        email: string;
        accountPhotoUrl: string;
    }) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.accountPhotoUrl = accountPhotoUrl;
    }
}
