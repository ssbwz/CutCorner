import { Router, Request, Response } from 'express';
import UserRepository from '../database/usersRepoImpl';
import UserDatabaseInterface from '../database/interfaces/usersRepoInterface';
import GetBarbersProfilesResponse from '../models/Users/Barbers/GetBarbersProfilesResponse'
import UsersControllerImpl from '../controllers/usersControllerImpl'
import UserControllerInterface from '../controllers/interface/usersControllerInterface'

const router: Router = Router();


const userRepository: UserDatabaseInterface = new UserRepository();
const userController = new UsersControllerImpl(userRepository)

router.get('/', async (req: Request, res: Response) => {

  const users = await userController.getUsers()

  if (users) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end("Couldn't find the users");
});

router.get('/username/:username', async (req: Request, res: Response) => {
  const searchedUsername: string = req.params.username;

  const user = await userController.getUserByUsername(searchedUsername);
  if (user) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end("Couldn't find the user");
});

router.get('/me', async (req: Request, res: Response) => {
  // todo: get the user id using the token
  const userid: string = "3e4258d8-e054-4a0d-8c2a-53cb6ba188c4";

  const user = await userController.getUserById(userid)

  if (user) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
    return;
  }
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end("Couldn't find the user");
});

router.get('/barbers/:pageNumber', async (req: Request, res: Response) => {
  const pageNumber: string = req.params.pageNumber;

  const barbers = await userController.getBarbers(Number(pageNumber))
  const barbersResponse = new GetBarbersProfilesResponse(barbers);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(barbersResponse));
});

export default router;
