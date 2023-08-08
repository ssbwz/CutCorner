import usersRepoInterface from "./interfaces/usersRepoInterface";
import { Collection, Db } from "mongodb";
import MongoDBConnection from "./connection";
import User from "../models/Users/user";
import Barber from "../models/Users/Barbers/barber";
import GetBarbersProfilesRequest from "../models/Users/Barbers/GetBarbersProfilesRequest";
import UserType from "../models/Users/UserType";

export default class UsersRepoImpl implements usersRepoInterface {
  private collection: Collection<User>;
  private database = new MongoDBConnection();
  private db: Db;

  constructor() {
    this.database.connect()
    this.db = this.database.getDatabase();
    this.collection = this.db.collection<User>("Users");
  }
  async getBarbersCount(request: GetBarbersProfilesRequest): Promise<number> {
    try {
      const searchObject: {
        userType: UserType;
        "workAddress.city"?: { $regex: string; $options: string };
        username?: { $regex: string; $options: string };
      } = {
        userType: "Barber" as UserType,
      };

      if (request.city) {
        searchObject["workAddress.city"] = { $regex: request.city, $options: "i" };
      }

      if (request.username) {
        searchObject.username = { $regex: request.username, $options: "i" };
      }
      const count = await this.collection
        .countDocuments(searchObject)

      return count
    }
    catch (err) {
      throw err
    }

  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.collection.findOne({
        "email": email
      });
      return user;
    } catch (error) {
      console.log("Error retrieving user by email:", error);
      return null;
    }
  }

  async getBarberByUsername(username: string): Promise<Barber | null> {
    try {
      const user = await this.collection.findOne({
        "username": username,
        userType: "Barber" as UserType
      });
      return <Barber | null>user;
    } catch (error) {
      console.log("Error retrieving user by username:", error);
      return null;
    }
  }

  async getUserByUsername(username: string): Promise<User | null> {
    try {
      const user = await this.collection.findOne({ username });
      return user;
    } catch (error) {
      console.log("Error retrieving user by username:", error);
      return null;
    }
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      const user: User | null = await this.collection.findOne({ id });
      return user;
    } catch (error) {
      console.log("Error retrieving user by ID:", error);
      return null;
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      const users = await this.collection.find().toArray();
      return users;
    } catch (error) {
      console.log("Error retrieving users:", error);
      return [];
    }
  }

  async getBarbers(request: GetBarbersProfilesRequest): Promise<Barber[]> {
    const collectionBarber: Collection<Barber> = this.db.collection<Barber>("Users");
    const pageSize = 6;
    const skipCount = (request.pageNumber - 1) * pageSize;


    const searchObject: {
      userType: UserType;
      "workAddress.city"?: { $regex: string; $options: string };
      username?: { $regex: string; $options: string };
    } = {
      userType: "Barber" as UserType,
    };

    if (request.city) {
      searchObject["workAddress.city"] = { $regex: request.city, $options: "i" };
    }

    if (request.username) {
      searchObject.username = { $regex: request.username, $options: "i" };
    }


    try {
      const users = await collectionBarber
        .find(searchObject)
        .skip(skipCount)
        .limit(pageSize)
        .toArray();

      const barbers: Barber[] = [];
      for (let index = 0; index < users.length; index++) {
        const barber = users[index];
        barbers.push(
          new Barber(
            barber.id,
            barber.firstname,
            barber.midname,
            barber.lastname,
            barber.username,
            barber.email,
            barber.phoneNumber,
            barber.address,
            barber.birthdate,
            barber.gender,
            barber.profilePicture,
            barber.createdAt,
            barber.updatedAt,
            barber.userType,
            barber.workAddress,
            barber.bio,
            barber.services,
            barber.availabilities
          )
        );
      }
      return barbers;
    } catch (error) {
      console.log("Error retrieving barbers:", error);
      return [];
    }
  }

}
