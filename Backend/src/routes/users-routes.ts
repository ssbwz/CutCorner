import { Router, Request, Response, NextFunction } from 'express';
import usersRepoImpl from '../database/usersRepoImpl';
import UserDatabaseInterface from '../database/interfaces/usersRepoInterface';
import GetBarbersProfilesResponse from '../models/Users/Barbers/GetBarbersProfilesResponse'
import UsersControllerImpl from '../controllers/usersControllerImpl'
import GetBarbersProfilesRequest from '../models/Users/Barbers/GetBarbersProfilesRequest'
import usersControllerInterface from '../controllers/interfaces/usersControllerInterface';
import { authUser, authRole, getTokenPayload } from './authorization/auth'
import UserType from '../models/Users/UserType';


const router: Router = Router();

const userRepository: UserDatabaseInterface = new usersRepoImpl();
const userController: usersControllerInterface = new UsersControllerImpl(userRepository)

router.get('/', authRole(UserType.ADMIN), async (req: Request, res: Response) => {
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

router.get('/me', authUser, async (req: Request, res: Response) => {
  if (!req.headers['authorization']) {
    res.sendStatus(401)
    return res.send('Not allowed')
  }
  const user = await userController.getUserByUsername(getTokenPayload(req.headers['authorization']).username)

  if (user) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
    return;
  }
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end("Couldn't find the user");
});



// barbers routes 
router.get('/barbers/me', authUser, authRole(UserType.BARBER), async (req: Request, res: Response) => {
  if (!req.headers['authorization']) {
    res.sendStatus(401)
    return res.send('Not allowed')
  }
  const user = await userController.getBarberByUsername(getTokenPayload(req.headers['authorization']).username)

  if (user) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
    return;
  }
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end("Couldn't find the barber");
});


router.get('/barbers/username/:username/city/:city/pagenumber/:pagenumber', async (req: Request, res: Response) => {
  const barbersResponse = await userController.getBarbers(new GetBarbersProfilesRequest({ username: req.params.username == 'undefined' ? undefined : req.params.username, city: req.params.city == 'undefined' ? undefined : req.params.city, pageNumber: req.params.pagenumber }))
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(barbersResponse));
});

router.get('/barbers/username/:username', async (req: Request, res: Response) => {
  const searchedUsername: string = req.params.username;

  const user = await userController.getBarberByUsername(searchedUsername);
  if (user) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end("Couldn't find the user");
});

export default router;
