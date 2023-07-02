import authorisation from "./authorisation";
import http from "./serverBase";

const getCurrentProfile = async () => {
    if (authorisation.isAuthorizied()) {
        authorisation.authorizationValidator()
        return await http.get("users/me")
    }
};


const getUserByUsername = async (username) => {
    const response = await http.get("users/username/" + username);
    return response
};

const getBarbers = async (pageNumber) => {
    const response = await http.get("users/barbers/" + pageNumber);
    return response
};

const usersServer = {
    getCurrentProfile,
    getUserByUsername,
    getBarbers
};

export default usersServer;
