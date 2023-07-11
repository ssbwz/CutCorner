import GetUserProfileByUsernameResponse from "../../models/Users/GetUserProfileByUsernameResponse";
import Barber from "../../models/Users/Barbers/barber";
import User from "../../models/Users/user";


interface usersControllerInterface {
  getUsers(): Promise<User[]>;
  getBarbers(pageNumber: number): Promise<Barber[]>;
  getUserById(id: string): Promise<User | null>;
  getUserByUsername(searchedUsername: string): Promise<GetUserProfileByUsernameResponse | null>;
}

export default usersControllerInterface;
