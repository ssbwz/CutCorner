export default class GetUserProfileByUsernameResponse {
  firstname: string;
  midname: string | undefined;
  lastname: string;
  username: string;
  address: string | undefined;
  gender: string;
  profilePicture: string;

  constructor({
    firstname,
    midname,
    lastname,
    username,
    address,
    gender,
    profilePicture
  }: {
    firstname: string;
    midname: string | undefined;
    lastname: string;
    username: string;
    address: string | undefined;
    gender: string;
    profilePicture: string;
  }) {
    this.firstname = firstname;
    this.midname = midname;
    this.lastname = lastname;
    this.username = username;
    this.address = address;
    this.gender = gender;
    this.profilePicture = profilePicture;
  }
}
