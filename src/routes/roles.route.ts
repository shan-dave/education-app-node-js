import authMiddleware from '@/middlewares/auth.middleware';
import { Router } from 'express';
import RolesController from '../controllers/roles.controller'
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
// import { CreateCityDto, CreateCountryDto, CreateStateDto, DeleteCountryDto, DeleteStateDto, DeleteCityDto} from '../dtos/common.dto'

class CommonsRoute implements Route {
  public path = '/role';
  public router = Router();
  public roleController = new RolesController();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware('role-list'), this.roleController.getRole);
    // this.router.get(`/get/city`, authMiddleware('city-list'), this.commonController.getCity);
  }
}

export default CommonsRoute;