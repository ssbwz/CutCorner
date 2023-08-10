import GetUserProfileByUsernameResponse from "../../models/Users/GetUserProfileByUsernameResponse";
import User from "../../models/Users/user";
import GetBarbersProfilesRequest from "../../models/Users/Barbers/GetBarbersProfilesRequest";
import GetBarbersProfilesResponse from "../../models/Users/Barbers/GetBarbersProfilesResponse";
import RegisterUserRequest from "../../models/Users/RegisterUserRequest";
import RegisterUserResponse from "../../models/Users/RegisterUserResponse";
import UsernameValidationReponse from "../../models/Users/UsernameValidationReponse";


interface usersControllerInterface {
  registerUser(request: RegisterUserRequest): Promise<RegisterUserResponse>
  getUsers(): Promise<User[]>;
  getBarbers(request: GetBarbersProfilesRequest): Promise<GetBarbersProfilesResponse>;
  getUserById(id: string): Promise<User | null>;
  getUserByUsername(searchedUsername: string): Promise<GetUserProfileByUsernameResponse | null>;
  getBarberByUsername(searchedUsername: string): Promise<GetUserProfileByUsernameResponse | null>;
  getUserByEmail(email : string): Promise<User | null>;
  ValidateUsername(username: string): Promise<UsernameValidationReponse>
}

export default usersControllerInterface;
