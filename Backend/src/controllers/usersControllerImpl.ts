import UserDatabaseInterface from "../database/interfaces/usersRepoInterface";
import usersControllerInterface from './interfaces/usersControllerInterface'
import GetBarberProfileResponse from "../models/Users/Barbers/GetBarberProfileResponse";
import Barber from "../models/Users/Barbers/barber";
import GetUserProfileByUsernameResponse from "../models/Users/GetUserProfileByUsernameResponse";
import User from "../models/Users/user";
import GetBarbersProfilesRequest from "../models/Users/Barbers/GetBarbersProfilesRequest";

class UserControllerImpl implements usersControllerInterface {
  private userDatabase: UserDatabaseInterface;

  constructor(userDatabase: UserDatabaseInterface) {
    this.userDatabase = userDatabase;
  }
  async getBarberByUsername(searchedUsername: string): Promise<GetBarberProfileResponse | null> {
    try {
      const user = await this.userDatabase.getBarberByUsername(searchedUsername);
      if (user) {
        const userResponse = new GetBarberProfileResponse(user);
        return userResponse;
      }
      return null
    } catch (err) {
      console.log(err);
      return null
    }
  }
  public async getUserByEmail(email: string): Promise<User | null> {
    try {
      return await this.userDatabase.getUserByEmail(email);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async getUsers() {
    return this.userDatabase.getUsers()
  }
  async getBarbers(request: GetBarbersProfilesRequest): Promise<Barber[]> {
    return await this.userDatabase.getBarbers(request)
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
      const user = await this.userDatabase.getUserByUsername(searchedUsername);
      if (user) {
        const userResponse = new GetUserProfileByUsernameResponse(user);
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
