const Barber = require("../models/Users/barber")
const userRepository = require("../database/usersRepository")
const GetUserProfileByUsernameResponse = require("../models/Users/GetUserProfileByUsernameResponse")

exports.getUsers = async () => {
    try {
        return userRepository.getUsers()
    }
    catch (error) {
        console.log(error)
    }
}


exports.getUserById = async (id) => {
    try {
        return userRepository.getUserById(id);
    } catch (err) {
        console.log(err);
    }
}

exports.getUserByUsername = (searchedUsername) => {
    try {
        user = userRepository.getUserByUsername(searchedUsername);
        usaerResponse = new GetUserProfileByUsernameResponse(user)
        return usaerResponse;
    } catch (err) {
        console.log(err);
    }
}
