export default class RegisterUserRequest {
    birthDate: Date;
    email: string;
    firstName: string;
    gender: Gender;
    lastName: string;
    midName?: string | undefined;
    phoneNumber?: string | undefined;
    username: string;
  
    constructor({
      birthDate,
      email,
      firstName,
      gender,
      lastName,
      midName,
      phoneNumber,
      username
    }: {
      birthDate: Date;
      email: string;
      firstName: string;
      gender: Gender;
      lastName: string;
      midName?: string | undefined;
      phoneNumber?: string | undefined;
      username: string;
    }) {
      this.birthDate = birthDate;
      this.email = email;
      this.firstName = firstName;
      this.gender = gender;
      this.lastName = lastName;
      this.midName = midName;
      this.phoneNumber = phoneNumber;
      this.username = username;
    }
  }
  
  enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    PREFER_NOT_SAY = 'PREFER_NOT_SAY'
  }