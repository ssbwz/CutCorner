import UserType from "../UserType";
import User from "../user";

export default class Barber extends User {
  workAddress: {
    city: string;
    street: string;
    postcode: string;
  };
  bio: string;
  services: {
    title: string;
    price: number;
    currencySign: string;
  }[];
  availabilities: {
    day: string;
    startTime?: string;
    endTime?: string;
  }[];

  constructor(
    id: string,
    firstname: string,
    midname: string | undefined,
    lastname: string,
    username: string,
    email: string,
    phoneNumber: string | undefined,
    address: string | undefined,
    birthdate: string,
    gender: string,
    profilePicture: string,
    userType: UserType,
    workAddress: {
      city: string;
      street: string;
      postcode: string;
    },
    bio: string,
    services: {
      title: string;
      price: number;
      currencySign: string;
    }[],
    availabilities: {
      day: string;
      startTime?: string;
      endTime?: string;
    }[]
  ) {
    super(
      id,
      firstname,
      midname,
      lastname,
      username,
      email,
      phoneNumber,
      address,
      birthdate,
      gender,
      profilePicture,
      userType
    );
    this.workAddress = workAddress;
    this.bio = bio;
    this.services = services;
    this.availabilities = availabilities;
  }
}
