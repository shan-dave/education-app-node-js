import { email } from 'envalid';
import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '../dtos/users.dto';
import { RequestWithUser } from '../interfaces/auth.interface';
import { User } from '../interfaces/users.interface';
import AuthService from '../services/auth.service';
import emailService from '../services/email.service';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const signUpUserData: User = await this.authService.signup(userData);

      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const { accessToken, findUser } = await this.authService.login(userData);
      res.status(200).json({ data: { accessToken, role: findUser.role['name'] }, message: 'Successfully login' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);
      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ message: 'Successfully logout' });
    } catch (error) {
      next(error);
    }
  };

  public resetPasswordSendMail = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const userId = req.body.userId;
      const {accessToken, findUser} = await this.authService.resetPasswordForMail(userId,userData);
      await emailService.sendResetPasswordEmail(findUser.email, findUser, accessToken)
      res.status(200).json({ message: `Reset Password mail successfully sent on ${findUser.email}` });
    } catch (error) {
      next(error);
    }
  };

  public resetPasswordSemdMailByUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const email = req.body.email;
      const {accessToken, findUser} = await this.authService.resetPasswordByUserForMail(email);
      await emailService.sendResetPasswordEmail(findUser.email, findUser, accessToken)
      res.status(200).json({ message: `Reset Password mail successfully sent on ${findUser.email}` });
    } catch (error) {
      next(error);
    }
  };

  public resetPassword = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const token = req.body.token;
      const password = req.body.password;
      const findUser = await this.authService.resetPassword(token, password);
      res.status(200).json({ message: `Reset Password successfully` });
    } catch (error) {
      next(error);
    }
  };

  public changePassword = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      const body = req.body;
      const findUser = await this.authService.changePassword(body, user);
      res.status(200).json({ message: `Change Password successfully` });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
