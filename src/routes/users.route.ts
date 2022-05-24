import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import authMiddleware from '../middlewares/auth.middleware';

class UsersRoute implements Route {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // this.router.get(`${this.path}`, this.usersController.getUsers);
    // this.router.get(`${this.path}/:id`, this.usersController.getUserById);
    // this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);
    // this.router.put(`${this.path}/:id`, validationMiddleware(CreateUserDto, 'body', true), this.usersController.updateUser);
    // this.router.delete(`${this.path}/:id`, this.usersController.deleteUser);
    this.router.post(`${this.path}/school_admin`, validationMiddleware(CreateUserDto, 'body'), authMiddleware('create-school-admin'), this.usersController.createSchoolUser);
    this.router.put(`${this.path}/school_admin/:schoolAdminId`, validationMiddleware(UpdateUserDto, 'body'), authMiddleware('update-school-admin'), this.usersController.updateSchoolUser);
    this.router.delete(`${this.path}/school_admin/:schoolAdminId`, authMiddleware('delete-school-admin'), this.usersController.deleteSchoolUser);
    this.router.get(`${this.path}/school_admin`, authMiddleware('get-school-admin'), this.usersController.getSchoolAdmin);
    this.router.put(`${this.path}/school_admin/change_status/:schoolAdminId`, authMiddleware('activate-school-admin'), this.usersController.activateSchoolUser);
 
    this.router.get(`${this.path}/profile`, authMiddleware('get-user-profile'), this.usersController.getUserProfile);   
    
     
    this.router.put(`${this.path}/admin/:adminId`, validationMiddleware(UpdateUserDto, 'body'), authMiddleware('update-admin-user'), this.usersController.updateAdminUser);
    this.router.get(`${this.path}/admin/:adminId`, authMiddleware('get-admin-user'), this.usersController.getAdminUser);
  }
}

export default UsersRoute;
