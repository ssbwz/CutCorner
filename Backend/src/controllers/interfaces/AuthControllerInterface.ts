import GoogleLoginRequest from '../../models/Auth/GoogleLoginRequest'
import LoginResponse from '../../models/Auth/LoginResponse'

export default interface AuthControllerInterface {
    loginWithGoogle(googleLoginRequest: GoogleLoginRequest): Promise<LoginResponse>
}