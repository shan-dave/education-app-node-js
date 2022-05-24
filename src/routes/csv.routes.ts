import authMiddleware from '@/middlewares/auth.middleware';
import { Router } from 'express';
import CSVController from '../controllers/csv.controller';
import MediaController from '../controllers/media.controller'
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
// import {CreateSchoolDto} from '../dtos/schools.dto'

class SchoolsRoute implements Route {
  public path = '/insert_csv';
  public router = Router();
  public csvController = new CSVController();
  public mediaController = new MediaController();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/create`, authMiddleware('insert-csv'), this.mediaController.upload,  this.csvController.insertCSV);
  }
}

export default SchoolsRoute;