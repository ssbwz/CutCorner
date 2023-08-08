export default class GetBarberProfileResponse {
  firstname: string;
  midname: string;
  lastname: string;
  username: string;
  address: string;
  gender: string;
  profilePicture: string;
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

  constructor({
    firstname,
    midname,
    lastname,
    username,
    address,
    gender,
    profilePicture,
    workAddress,
    bio,
    services,
    availabilities,
  }: {
    firstname: string;
    midname: string;
    lastname: string;
    username: string;
    address: string;
    gender: string;
    profilePicture: string;
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
  }) {
    this.firstname = firstname;
    this.midname = midname;
    this.lastname = lastname;
    this.username = username;
    this.address = address;
    this.gender = gender;
    this.profilePicture = profilePicture;
    this.workAddress = workAddress;
    this.bio = bio;
    this.services = services;
    this.availabilities = availabilities;
  }
}
