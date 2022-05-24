import authMiddleware from '@/middlewares/auth.middleware';
import { Router } from 'express';
import GradesController from '../controllers/grades.controller'
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import { CreateGradeDto } from '../dtos/grades.dto'

class GradesRoute implements Route {
  public path = '/grades';
  public router = Router();
  public gradeController = new GradesController();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware('grade-list'), this.gradeController.getGrade);
    this.router.post(`${this.path}`, authMiddleware('create-grade'), validationMiddleware(CreateGradeDto, 'body'), this.gradeController.createGrade);
    this.router.put(`${this.path}/change_status/:gradeId`, authMiddleware('change-grade-status'), this.gradeController.changeGradeStatus);
    this.router.delete(`${this.path}/:gradeId`, authMiddleware('delete-grade'), this.gradeController.deleteGrade);
  }
}

export default GradesRoute;