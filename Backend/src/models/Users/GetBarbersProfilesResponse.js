const Barber = require("./barber");

module.exports = class GetBarbersProfilesResponse{
  constructor(users) {
    const barbers = []
    for (let index = 0; index < users.length; index++) {
      if(users[index] instanceof Barber)
      barbers.push(new GetBarberProfileResponse(users[index]))      
    }
    this.barbers = barbers;
  }
}




class GetBarberProfileResponse{
  constructor({firstname, midname, lastname, username, profilePicture, services, availability}) {
    this.firstname = firstname;
    this.midname = midname;
    this.lastname = lastname;
    this.username = username;
    this.profilePicture = profilePicture;
    this.services = services;
    this.availability = availability;
  }
}

  