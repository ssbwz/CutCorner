const User = require("./user");

module.exports = class Barber extends User {
    constructor(firstname, midname, lastname, email, phoneNumber, address, birthdate, gender, profilePicture, createdAt, updatedAt, workAddress,bio, services, availability) {
      super(firstname, midname, lastname, email, phoneNumber, address, birthdate, gender, profilePicture, createdAt, updatedAt)
      this.workAddress = workAddress;
      this.bio = bio;
      this.services = services;
      this.availability = availability;
    }
  }

  