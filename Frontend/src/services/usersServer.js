import authorisation from "./authorization";
import http from "./serverBase";

const getCurrentProfile = async () => {
    if (authorisation.isAuthorizied()) {
        authorisation.authorizationValidator()

        switch (authorisation.GetUserRoleFromToken()) {
            case authorisation.userTypes.CUSTOMER: return await http.get("/users/me")
            case authorisation.userTypes.BARBER: return await http.get("/users/barbers/me")
            case authorisation.userTypes.ADMIN: throw new Error("Not implmented")
        }
    }
};


const getUserByUsername = async (username) => {
    const response = await http.get("users/username/" + username);
    return response
};

const getBarbers = async (searchRequest) => {
    const response = await http.get(`users/barbers/username/${searchRequest.username}/city/${searchRequest.city}/pagenumber/${searchRequest.pageNumber}`);
    return response
};

const getBarberByUsername = async (username) => {
    const response = await http.get("users/barbers/username/" + username);
    return response
};


const usersServer = {
    getCurrentProfile,
    getUserByUsername,
    getBarbers,
    getBarberByUsername
};

export default usersServer;
