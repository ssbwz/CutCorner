module.exports = class GetUserProfileByUsernameResponse{
    constructor({firstname, midname, lastname, username, address, gender, profilePicture, workAddress,bio, services, availability}) {
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
      this.availability = availability;
    }
  }

  