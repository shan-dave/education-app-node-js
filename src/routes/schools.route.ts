import authMiddleware from '@/middlewares/auth.middleware';
import { Router } from 'express';
import SchoolsController from '../controllers/schools.controller';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import { CreateSchoolDto, SchoolAssignToUserDto, CreateSchoolSubAdminDto, UpdateSchoolSubAdminDto } from '../dtos/schools.dto'

class SchoolsRoute implements Route {
  public path = '/schools';
  public router = Router();
  public schoolsController = new SchoolsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/create`, validationMiddleware(CreateSchoolDto, 'body'), authMiddleware('create-school'), this.schoolsController.createSchool);
    this.router.post(`${this.path}/assign_to_user`, validationMiddleware(SchoolAssignToUserDto, 'body'), authMiddleware('assign-school'), this.schoolsController.assignSchool);
    this.router.put(`${this.path}/unassign_to_user`, validationMiddleware(SchoolAssignToUserDto, 'body'), authMiddleware('unassign-school'), this.schoolsController.unassignSchool);
    this.router.get(`${this.path}`, authMiddleware('get-school'), this.schoolsController.getSchool);
    // this.router.put(`${this.path}/delete/:schoolId`, authMiddleware('delete-school'), this.schoolsController.deleteSchool);
    // this.router.put(`${this.path}/activate/:schoolId`, authMiddleware('activate-school'), this.schoolsController.activateSchool);
    this.router.put(`${this.path}/update/:schoolId`, validationMiddleware(CreateSchoolDto, 'body'), authMiddleware('update-school'), this.schoolsController.updateSchool);
    this.router.post(`${this.path}/create/school_sub_admin`, validationMiddleware(CreateSchoolSubAdminDto, 'body'), authMiddleware('create-school-sub-admin'), this.schoolsController.createSchoolSubAdmin);
    this.router.put(`${this.path}/school_sub_admin/:schoolSubAdminId`, validationMiddleware(UpdateSchoolSubAdminDto, 'body'), authMiddleware('update-school-sub-admin'), this.schoolsController.updateSchoolSubAdmin);
    this.router.delete(`${this.path}/school_sub_admin/:schoolSubAdminId`, authMiddleware('delete-school-sub-admin'), this.schoolsController.deleteSchoolSubAdmin);
    this.router.put(`${this.path}/school_sub_admin/change_status/:schoolSubAdminId`, authMiddleware('activate-school-sub-admin'), this.schoolsController.activateSchoolSubAdmin);
    this.router.get(`${this.path}/get/school_sub_admin`, authMiddleware('get-school-sub-admin'), this.schoolsController.getSchoolSubAdmin);
  }
}

export default SchoolsRoute;