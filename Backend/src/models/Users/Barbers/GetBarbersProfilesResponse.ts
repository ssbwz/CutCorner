import Barber from "./barber";

export default class GetBarbersProfilesResponse {
  barbers: GetBarberProfileResponse[];

  constructor(users: any[]) {
    const barbers: GetBarberProfileResponse[] = [];
    for (let index = 0; index < users.length; index++) {
      if (users[index] instanceof Barber) {
        barbers.push(new GetBarberProfileResponse(users[index]));
      }
    }
    this.barbers = barbers;
  }
}

export class GetBarberProfileResponse {
  firstname: string;
  midname: string;
  lastname: string;
  username: string;
  profilePicture: string;
  services: {
    title: string;
    price: number;
    currencySign: string;
  }[];
  availability: {
    day: string;
    startTime?: string;
    endTime?: string;
  }[];

  constructor({
    firstname,
    midname,
    lastname,
    username,
    profilePicture,
    services,
    availability,
  }: {
    firstname: string;
    midname: string;
    lastname: string;
    username: string;
    profilePicture: string;
    services: {
      title: string;
      price: number;
      currencySign: string;
    }[];
    availability: {
      day: string;
      startTime?: string;
      endTime?: string;
    }[];
  }) {
    this.firstname = firstname;
    this.midname = midname;
    this.lastname = lastname;
    this.username = username;
    this.profilePicture = profilePicture;
    this.services = services;
    this.availability = availability;
  }
}
