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
    midname: string,
    lastname: string,
    username: string,
    email: string,
    phoneNumber: string,
    address: string,
    birthdate: string,
    gender: string,
    profilePicture: string,
    createdAt: Date,
    updatedAt: Date,
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
      createdAt,
      updatedAt
    );
    this.workAddress = workAddress;
    this.bio = bio;
    this.services = services;
    this.availabilities = availabilities;
  }
}
