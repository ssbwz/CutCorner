export default class LoginResponse {
    token: string| undefined;
    info: any | undefined;

    constructor({
        token,
        info,
    }: {
        token: string | undefined;
        info: any | undefined;
    }) {
        this.token = token;
        this.info = info;
    }
}
