export default class User {
  id: string;
  firstname: string;
  midname: string;
  lastname: string;
  username: string;
  email: string;
  phoneNumber: string;
  address: string;
  birthdate: string;
  gender: string;
  profilePicture: string;
  createdAt: Date;
  updatedAt: Date;

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
    createdAt: Date = new Date(),
    updatedAt: Date = new Date()
  ) {
    this.id = id;
    this.firstname = firstname;
    this.midname = midname;
    this.lastname = lastname;
    this.username = username;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.birthdate = birthdate;
    this.gender = gender;
    this.profilePicture = profilePicture;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
