import UserDatabaseInterface from "../database/interfaces/usersRepoInterface";
import usersControllerInterface from './interfaces/usersControllerInterface'
import GetBarberProfileResponse from "../models/Users/Barbers/GetBarberProfileResponse";
import Barber from "../models/Users/Barbers/barber";
import GetUserProfileByUsernameResponse from "../models/Users/GetUserProfileByUsernameResponse";
import User from "../models/Users/user";
import GetBarbersProfilesRequest from "../models/Users/Barbers/GetBarbersProfilesRequest";
import GetBarbersProfilesResponse from "../models/Users/Barbers/GetBarbersProfilesResponse";
import ValidationError from '../models/Exception/ValidationError'
import UsernameValidationReponse from '../models/Users/UsernameValidationReponse'
import RegisterUserRequest from "../models/Users/RegisterUserRequest";
import RegisterUserResponse from "../models/Users/RegisterUserResponse";
import UserType from "../models/Users/UserType";
const { v4: uuidv4 } = require('uuid');

UsernameValidationReponse
class UserControllerImpl implements usersControllerInterface {
  private userDatabase: UserDatabaseInterface;

  constructor(userDatabase: UserDatabaseInterface) {
    this.userDatabase = userDatabase;
  }
 async registerUser(request: RegisterUserRequest): Promise<RegisterUserResponse> {

const newUser = new User(
  uuidv4(),
  request.firstName,
  request.midName,
  request.lastName,
  request.username,
  request.email,
  request.phoneNumber,
  undefined, // address
  request.birthDate.toLocaleString(),
  request.gender,
  'profile_picture_url',
  UserType.CUSTOMER // or UserType.ADMIN or other appropriate value
);
    const user : User = await this.userDatabase.createUser(newUser);
    if (user) {
      return new RegisterUserResponse(true)
    }

    return new RegisterUserResponse(false, "Couldn't create user")
  }
  
  async ValidateUsername(username: string): Promise<UsernameValidationReponse> {
    const user = await this.userDatabase.getUserByUsername(username);
    if (user) {
      throw new ValidationError(
        'username',
        'This username has been taken.',
        username
      )
    }
    return new UsernameValidationReponse(
      {
        isUsernameValid: true,
        username: username
      }
    )
  }

  async getBarberByUsername(searchedUsername: string): Promise<GetBarberProfileResponse | null> {
    try {
      const barber = await this.userDatabase.getBarberByUsername(searchedUsername);
      if (barber) {
        const userResponse = new GetBarberProfileResponse(barber);
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
  async getBarbers(request: GetBarbersProfilesRequest): Promise<GetBarbersProfilesResponse> {
    const count = await this.userDatabase.getBarbersCount(request);
    const pagesCount = Math.ceil(count / 6);
    const barbers = await this.userDatabase.getBarbers(request)

    return new GetBarbersProfilesResponse(barbers, pagesCount);
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
