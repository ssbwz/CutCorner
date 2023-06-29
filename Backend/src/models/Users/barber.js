const User = require("./user");

module.exports = class Barber extends User {
    constructor(id,firstname, midname, lastname, username, email, phoneNumber, address, birthdate, gender, profilePicture, createdAt, updatedAt, workAddress,bio, services, availability) {
      super(id,firstname, midname, lastname, username, email, phoneNumber, address, birthdate, gender, profilePicture, createdAt, updatedAt)
      this.workAddress = workAddress;
      this.bio = bio;
      this.services = services;
      this.availability = availability;
    }
  }

  