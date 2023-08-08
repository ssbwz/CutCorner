import { Router, Request, Response } from 'express';


const router: Router = Router();

import AuthControllerInterface from '../controllers/interfaces/AuthControllerInterface';
import AuthControllerImpl from '../controllers/AuthControllerImpl';
import GoogleLoginRequest from '../models/Auth/GoogleLoginRequest';


const authControllerImpl : AuthControllerInterface = new AuthControllerImpl()

router.post('/login/google', async (req: Request, res: Response) => {

  try {
    const googleLoginRequest = new GoogleLoginRequest(req.body);
    const loginResponse = await authControllerImpl.loginWithGoogle(googleLoginRequest)
    res.status(201).json(loginResponse);
  } catch (error) {
    console.error('User login failed:', error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
});

export default router;
