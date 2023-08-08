import axios from "axios";
import jwt_decode from "jwt-decode";
const accessToken = localStorage.getItem("accessToken");


const header = () => {
    if (localStorage.getItem("accessToken") !== null) {
        return {
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("accessToken").accessToken
            }
        }
    }
    else
        return {
            "Content-type": "application/json"
        }
}
const axiosCheckToken = axios.create({
    baseURL: "http://localhost:5000/",
    ...header()
});




function isAuthorizied() {
    return accessToken !== null
}


function authorizationValidator() {
    
        function isTokenExpired(token) {
            try {
              const decodedToken = jwt_decode(token) || {};
              const expirationTime = decodedToken.exp;
          
              if (expirationTime === undefined) {
                // If the token doesn't have an expiration time, consider it as expired
                return true;
              }
          
              // Get the current time in seconds since January 1, 1970 (Unix timestamp)
              const currentTime = Math.floor(Date.now() / 1000);
          
              // Check if the token is expired
              return currentTime >= expirationTime;
          
            } catch (error) {
              // If there's an issue decoding the token, consider it as expired
              return true;
            }
          }

    return isTokenExpired(accessToken)
}

function Logout() {
    //Removing user info from the storage 
    localStorage.removeItem("accessToken")
    window.location.replace("/");
}

function GetTokenFromLocalStorage() {
    var token = localStorage.getItem("accessToken");
    return token;
}


function GetUserRoleFromToken() {
    var token = GetTokenFromLocalStorage();
    if (token !== null) {
        var userInformation = jwt_decode(token);
        return userInformation.role;
    }
}

function GetUserUsernameFromToken() {
    var token = GetTokenFromLocalStorage();
    if (token !== null) {
        var userInformation = jwt_decode(token);
        return userInformation.username;
    }
}

const loginWithGoogle = async (googleLoginData) => {
    const res = await axiosCheckToken.post("auth/login/google", googleLoginData)
    localStorage.setItem('accessToken', res.data.token)
    window.location.replace("/");
}

const AuthRole =  (role) => {
    return GetUserRoleFromToken() === role
}


const userTypes = {
    CUSTOMER : 'Customer',
    BARBER : 'Barber',
    ADMIN : 'Admin'
}

const authorization = {
    authorizationValidator,
    Logout,
    isAuthorizied,
    loginWithGoogle,
    GetUserRoleFromToken,
    GetUserUsernameFromToken,
    AuthRole,
    userTypes
};

export default authorization;
