import { Router } from "express";
import Route from '../interfaces/routes.interface';
import validationMiddleware from "../middlewares/validation.middleware";
import authMiddleware from "../middlewares/auth.middleware";
import ReportsController from "../controllers/reports.controller";
import { CreateReportDto } from '../dtos/reports.dto'

class ReportsRoute implements Route {
  public path = '/reports';
  public router = Router();
  public reportsController = new ReportsController()

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, validationMiddleware(CreateReportDto, 'body'), authMiddleware('create-report'), this.reportsController.createReport)
    this.router.put(`${this.path}/:reportId`, validationMiddleware(CreateReportDto, 'body'), authMiddleware('update-report'), this.reportsController.updateReport);
    this.router.delete(`${this.path}/:reportId`, authMiddleware('delete-report'), this.reportsController.deleteReport);
    this.router.put(`${this.path}/change_status/:reportId`, authMiddleware('activate-report'), this.reportsController.activateReport);
    this.router.get(`${this.path}`, authMiddleware('get-student'), this.reportsController.getReport);
  }
}

export default ReportsRoute;