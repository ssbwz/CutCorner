export default class GetBarbersProfilesRequest {
    username: string | undefined;
    city: string | undefined;
    pageNumber: number;

    constructor(
        { username, city, pageNumber }:
         { username: string | undefined, city: string | undefined, pageNumber: string }) {
        this.username = username;
        this.city = city;
        this.pageNumber = Number(pageNumber);
    }
}