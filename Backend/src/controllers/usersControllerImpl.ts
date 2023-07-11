import UserDatabaseInterface from "../database/interfaces/usersRepoInterface";
import usersControllerInterface from './interface/usersControllerInterface'
import GetBarberProfilesResponse from "../models/Users/Barbers/GetBarberProfilesResponse";
import GetBarbersProfilesResponse from "../models/Users/Barbers/GetBarbersProfilesResponse";
import Barber from "../models/Users/Barbers/barber";
import GetUserProfileByUsernameResponse from "../models/Users/GetUserProfileByUsernameResponse";
import User from "../models/Users/user";
import { resolve } from "url";

class UserControllerImpl implements usersControllerInterface {
  private userDatabase: UserDatabaseInterface;

  constructor(userDatabase: UserDatabaseInterface) {
    this.userDatabase = userDatabase;
  }

  async getUsers() {
    return this.userDatabase.getUsers()
  }
  async getBarbers(pageNumber: number): Promise<Barber[]> {
    return await this.userDatabase.getBarbers(pageNumber)
  }
  async getUserById(id: string): Promise<User | null> {
    try {
      return await this.userDatabase.getUserById(id);
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  async getUserByUsername(searchedUsername: string): Promise<GetUserProfileByUsernameResponse | null> {
    try {
      const user = await this.userDatabase.getBarberByUsername(searchedUsername);
      if (user) {
        const userResponse = new GetBarberProfilesResponse(user);
        return userResponse;
      }
      return null
    } catch (err) {
      console.log(err);
      return null
    }

  }

}

export default UserControllerImpl;
