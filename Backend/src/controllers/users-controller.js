const Barber = require("../models/Users/barber")
const userRepository = require("../database/usersRepository")
const GetUserProfileByUsernameResponse = require("../models/Users/GetUserProfileByUsernameResponse")
const GetBarbersProfilesResponse = require("../models/Users/GetBarbersProfilesResponse")

exports.getUsers = async () => {
    try {
        return userRepository.getUsers()
    }
    catch (error) {
        console.log(error)
    }
}

exports.getbarbers = async (pageNumber) => {
    try {
        return new GetBarbersProfilesResponse(userRepository.getbarbers(pageNumber)).barbers
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
        if (user) {
            usaerResponse = new GetUserProfileByUsernameResponse(user)
            return usaerResponse;
        }

    } catch (err) {
        console.log(err);
    }
}
