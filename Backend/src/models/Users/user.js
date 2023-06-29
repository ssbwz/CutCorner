module.exports = class User {
    constructor(id,firstname, midname, lastname, username, email, phoneNumber, address, birthdate, gender, profilePicture, createdAt, updatedAt) {
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
      this.createdAt = createdAt || new Date();
      this.updatedAt = updatedAt || new Date();
    }
  }

  