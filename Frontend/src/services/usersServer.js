import authorization from "./authorization";
import http from "./serverBase";
import jwt_decode from "jwt-decode";

const getCurrentProfile = async () => {
    if (authorization.isAuthorizied()) {
        authorization.authorizationValidator()

        switch (authorization.GetUserRoleFromToken()) {
            case authorization.userTypes.CUSTOMER: return await http.get("/users/me")
            case authorization.userTypes.BARBER: return await http.get("/users/barbers/me")
            case authorization.userTypes.ADMIN: throw new Error("Not implmented")
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

const getUserRegisterInfo = () => {
    return jwt_decode(localStorage.getItem("userInfo"))
}

const ValidateUsername = async (username) => {
    return await http.post("users/validation/username/" + username);
}

const registerUser = async (registerUserRequest) => {
    console.log(registerUserRequest)
    return await http.post("users/", registerUserRequest);
}
const usersServer = {
    getCurrentProfile,
    getUserByUsername,
    getBarbers,
    getBarberByUsername,
    getUserRegisterInfo,
    ValidateUsername,
    registerUser
};

export default usersServer;
