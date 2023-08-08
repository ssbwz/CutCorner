import GetBarbersProfilesRequest from "../../models/Users/Barbers/GetBarbersProfilesRequest";
import Barber from "../../models/Users/Barbers/barber";
import User from "../../models/Users/user";


interface usersRepoInterface {
  getUserByEmail(email: string): Promise<User | null>;
  getUserByUsername(username: string): Promise<User | null>;
  getBarberByUsername(username: string): Promise<Barber | null>;
  getUserById(id: string): Promise<User | null>;
  getUsers(): Promise<User[]>;
  getBarbers(request: GetBarbersProfilesRequest): Promise<Barber[]>;
}

export default usersRepoInterface;
