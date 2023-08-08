import AuthControllerInterface from './interfaces/AuthControllerInterface'
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import GoogleLoginRequest from '../models/Auth/GoogleLoginRequest';
import LoginResponse from '../models/Auth/LoginResponse';
import { OAuth2Client } from 'google-auth-library';
import UsersRepoInterface from '../database/interfaces/usersRepoInterface';
import UsersRepoImpl from '../database/usersRepoImpl';
import UserControllerImpl from './usersControllerImpl';
import UsersControllerInterface from './interfaces/usersControllerInterface';


dotenv.config();

export default class AuthControllerImpl implements AuthControllerInterface {
    private client: OAuth2Client;
    private CLIENT_ID: string | undefined;

    private userRepository: UsersRepoInterface = new UsersRepoImpl();
    private userController: UsersControllerInterface = new UserControllerImpl(this.userRepository)

    constructor() {
        this.CLIENT_ID = process.env.CLIENT_ID_GOOGLE;

        if (this.CLIENT_ID === undefined) {
            // Handle the error, throw an exception, or provide a default value if needed.
            throw new Error('client_id environment variable is not defined.');
        }

        this.client = new OAuth2Client(this.CLIENT_ID);
    }


    private async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        try {
            const passwordMatch = await bcrypt.compare(password, hashedPassword);
            return passwordMatch;
        } catch (error) {
            console.error('Error comparing passwords:', error);
            throw error;
        }
    }

    private generateToken(payload: any) {
        const options = {
            expiresIn: '1h', // Example: Token expires in 1 hour
            // Add more options as needed
        };

        const secret: string | undefined = process.env.ACCESS_TOKEN_SECERT;

        if (secret === undefined) {
            // Handle the error, throw an exception, or provide a default value if needed.
            throw new Error('ACCESS_TOKEN_SECRET environment variable is not defined.');
        }

        try {
            const token = jwt.sign(payload, secret, options);
            return token;
        } catch (error) {
            // Handle any potential errors during token generation
            console.error('Error generating JWT token:', error);
            throw error;
        }
    }

    private async createHashedPassword(password: string): Promise<string> {
        try {
            const saltRounds = 10; // Number of salt rounds to generate
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            return hashedPassword;
        } catch (error) {
            console.error('Error creating hashed password:', error);
            throw error;
        }
    }

    public async loginWithGoogle(googleLoginRequest: GoogleLoginRequest): Promise<LoginResponse> {       
        const user = await this.userController.getUserByEmail(googleLoginRequest.email)
        const token = this.generateToken({
            username: user?.username,
            role: user?.userType
        })

        return new LoginResponse({ token: token })

    }
}
