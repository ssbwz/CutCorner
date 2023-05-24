module.exports = class User {
    constructor(firstname, midname, lastname, email, phoneNumber, address, birthdate, gender, profilePicture, createdAt, updatedAt) {
      this.firstname = firstname;
      this.midname = midname;
      this.lastname = lastname;
      this.email = email;
      this.phoneNumber = phoneNumber;
      this.address = address;
      this.birthdate = birthdate;
      this.gender = gender;
      this.profilePicture = profilePicture;
      this.createdAt = createdAt || new Date();
      this.updatedAt = updatedAt || new Date();
    }
  }

  