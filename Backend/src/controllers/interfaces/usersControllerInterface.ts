import GetUserProfileByUsernameResponse from "../../models/Users/GetUserProfileByUsernameResponse";
import Barber from "../../models/Users/Barbers/barber";
import User from "../../models/Users/user";
import GetBarbersProfilesRequest from "../../models/Users/Barbers/GetBarbersProfilesRequest";


interface usersControllerInterface {
  getUsers(): Promise<User[]>;
  getBarbers(request: GetBarbersProfilesRequest): Promise<Barber[]>;
  getUserById(id: string): Promise<User | null>;
  getUserByUsername(searchedUsername: string): Promise<GetUserProfileByUsernameResponse | null>;
  getBarberByUsername(searchedUsername: string): Promise<GetUserProfileByUsernameResponse | null>;
  getUserByEmail(email : string): Promise<User | null>;
}

export default usersControllerInterface;
