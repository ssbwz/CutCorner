import UserType from './UserType'

export default class User {
  id: string;
  firstname: string;
  midname: string | undefined;
  lastname: string;
  username: string;
  email: string;
  phoneNumber: string | undefined;
  address: string | undefined;
  birthdate: string;
  gender: string;
  profilePicture: string;
  userType: UserType;

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
    userType: UserType
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
    this.userType = userType
  }
}
