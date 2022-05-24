import authMiddleware from '@/middlewares/auth.middleware';
import { Router } from 'express';
import CommonController from '../controllers/common.controller'
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import { CreateDistrictDto, DashbordDto,ChangeStateStatusDto, CreateStateDto, ChangeDistrictStatusDto, DeleteStateDto, DeleteDistrictDto, GetStateDto} from '../dtos/common.dto'

class CommonsRoute implements Route {
  public path = '/';
  public router = Router();
  public commonController = new CommonController();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // this.router.post(`${this.path}insert/country`, validationMiddleware(CreateCountryDto, 'body'), authMiddleware('insert-country'), this.commonController.insertContry);39020202
    this.router.post(`${this.path}insert/state`, validationMiddleware(CreateStateDto, 'body'), authMiddleware('insert-state'), this.commonController.insertState);
    this.router.post(`${this.path}insert/district`, validationMiddleware(CreateDistrictDto, 'body'), authMiddleware('insert-disctict'), this.commonController.insertDistrict);

    // this.router.put(`${this.path}delete/country/:countryId`, validationMiddleware(DeleteCountryDto, 'params'), authMiddleware('delete-country'), this.commonController.deleteContry);
    this.router.delete(`${this.path}state/:stateId`, validationMiddleware(DeleteStateDto, 'params'), authMiddleware('delete-state'), this.commonController.deleteState);
    this.router.put(`${this.path}state/change_status/:stateId`, validationMiddleware(ChangeStateStatusDto, 'params'), authMiddleware('change-state-status'), this.commonController.changeStateStatus);
    this.router.delete(`${this.path}district/:districtId`, validationMiddleware(DeleteDistrictDto, 'params'), authMiddleware('delete-district'), this.commonController.deleteDistrict);
    this.router.put(`${this.path}district/change_status/:districtId`, validationMiddleware(ChangeDistrictStatusDto, 'params'), authMiddleware('change-district-status'), this.commonController.changeDistrictStatus);
    // this.router.get(`${this.path}get/country`, authMiddleware('country-list'), this.commonController.getCountry);
    this.router.get(`${this.path}get/state`, authMiddleware('state-list'), this.commonController.getState);
    this.router.get(`${this.path}get/district`, authMiddleware('district-list'), this.commonController.getDistrict);

    this.router.get(`${this.path}dashbord/school`, authMiddleware('dashbord'), this.commonController.getSchoolDashbord);
    // this.router.get(`${this.path}dashbord/country`, validationMiddleware(DashbordDto, 'query'), authMiddleware('dashbord'), this.commonController.getCountryDashbord);
    this.router.get(`${this.path}dashbord/state`, authMiddleware('dashbord'), this.commonController.getStateDashbord);
    this.router.get(`${this.path}dashbord/district`,  authMiddleware('dashbord'), this.commonController.getDistrictDashbord);
    this.router.get(`${this.path}dashbord/student`,  authMiddleware('dashbord'), this.commonController.getStudentDashbord);
    this.router.get(`${this.path}dashbord/teacher`,  authMiddleware('dashbord'), this.commonController.getTeacherDashbord);
  }
}

export default CommonsRoute;