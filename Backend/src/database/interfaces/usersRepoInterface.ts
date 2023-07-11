import Barber from "../../models/Users/Barbers/barber";
import User from "../../models/Users/user";


interface usersRepoInterface {
  getUserByUsername(username: string): Promise<User | null>;
  getBarberByUsername(username: string): Promise<Barber | null>;
  getUserById(id: string): Promise<User | null>;
  getUsers(): Promise<User[]>;
  getBarbers(pageNumber: number): Promise<Barber[]>;
}

export default usersRepoInterface;
