import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
import AuthService from '../services/auth.service';
declare class AuthController {
    authService: AuthService;
    signUp: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    logIn: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    logOut: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    resetPasswordSendMail: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    resetPasswordSemdMailByUser: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    resetPassword: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    changePassword: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
}
export default AuthController;
