import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { CreateUserDto, LoginUserDto, ResetPasswordMailDto, ResetPasswordDto, ResetPasswordByUserDto,changePasswordByUserDto } from '../dtos/users.dto';
import Route from '../interfaces/routes.interface';
import authMiddleware from '../middlewares/auth.middleware';
import validationMiddleware from '../middlewares/validation.middleware';

class AuthRoute implements Route {
  public path = '/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`,  this.authController.signUp);
    this.router.post(`${this.path}login`, validationMiddleware(LoginUserDto, 'body'), this.authController.logIn);
    this.router.post(`${this.path}logout`, authMiddleware('logout'), this.authController.logOut);
    this.router.post(`${this.path}send_mail/reset_password`, validationMiddleware(ResetPasswordMailDto, 'body'), authMiddleware('send-mail-reset-password'), this.authController.resetPasswordSendMail);
    this.router.post(`${this.path}reset_password_by_auth`, validationMiddleware(ResetPasswordDto, 'body'), this.authController.resetPassword);
    this.router.post(`${this.path}change_password`, validationMiddleware(changePasswordByUserDto, 'body'), authMiddleware('change-password'), this.authController.changePassword);
    this.router.post(`${this.path}send_mail/reset_password_by_user`, validationMiddleware(ResetPasswordByUserDto, 'body'), this.authController.resetPasswordSemdMailByUser);
  }
}

export default AuthRoute;
