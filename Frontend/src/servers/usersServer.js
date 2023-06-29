import authorisation from "./authorisation";
import http from "./serverBase";

const getCurrentProfile = async () => {

    if (authorisation.isAuthorizied()) {
        authorisation.authorizationValidator()
        return await http.get("users/me")
    }
};


const getUserByUsername = async (username) => {
    if (authorisation.isAuthorizied()) {
        authorisation.authorizationValidator()
        const response = await http.get("users/username/" + username);
        return response
    }
};

const usersServer = {
    getCurrentProfile,
    getUserByUsername
};

export default usersServer;
