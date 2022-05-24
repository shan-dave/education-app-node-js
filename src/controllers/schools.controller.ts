import { NextFunction, Request, Response } from 'express';
// import { CreateUserDto } from '../dtos/users.dto';
import { School } from '../interfaces/schools.interface';
import schoolService from '../services/schools.service';
import emailService from '../services/email.service'
import {IGetUserAuthInfo} from '../interfaces/request.interface'
class SchoolsController {
  public schoolService = new schoolService();

  public createSchool = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
      const createSchoolData = await this.schoolService.createSchool(req.body, req.user);
      res.status(201).json({data: createSchoolData, message: 'School created successfully' });
    } catch (error) {
      next(error);
    }
  };

  public assignSchool = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try{
      const { assignUserData, schoolIsVerify } = await this.schoolService.assignSchoolToUser(req.body, req.user);
      res.status(200).json({message: `School "${schoolIsVerify.schoolName}" is successfully assign to "${assignUserData.email}" email` });
    } catch (err){
      next(err)
    }
  }

  public unassignSchool = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try{
      const { assignUserData, schoolIsVerify } = await this.schoolService.unassignSchoolToUser(req.body, req.user);
      res.status(200).json({message: `School "${schoolIsVerify.schoolName}" is successfully unassign to "${assignUserData.email}" email` });
    } catch (err){
      next(err)
    }
  }

  public getSchool = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try{
      const getSchoolData = await this.schoolService.getSchool(req.query);
      const schoolRecord = getSchoolData ? getSchoolData[0]['data'] : [];
      const schoolCount = getSchoolData ? getSchoolData[0]['schoolCount'][0] ? getSchoolData[0]?.['schoolCount'][0]?.count : 0 : 0;

      res.status(200).json({ data: schoolRecord, count: schoolCount, message: 'School records fetch successfully'});
    } catch (err){
      next(err)
    }
  }

  public deleteSchool = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
        const schoolData = await this.schoolService.deleteSchool(req.params, req.user)  
        res.status(200).json({ data: schoolData, message: "School deleted successfully" });
    } catch (error) {
      next(error);
    }
  };

  public activateSchool = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
        const schoolData = await this.schoolService.activateSchool(req.params, req.user)  
        res.status(200).json({ data: schoolData, message: "School activated successfully" });
    } catch (error) {
      next(error);
    }
  };

  public updateSchool = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
      const schoolId = req.params.schoolId;
      const createSchoolData = await this.schoolService.updateSchool(schoolId,req.body, req.user);
      res.status(200).json({data: createSchoolData, message: 'School record updated successfully' });
    } catch (error) {
      next(error);
    }
  };

  public createSchoolSubAdmin = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
      const createSchoolSubAdminData = await this.schoolService.createSchoolSubAdmin(req.body, req.user);
      await emailService.sendEmail(createSchoolSubAdminData.email, 'Verify your credentials', {username: createSchoolSubAdminData.email, password: req.body.password})
      res.status(201).json({message: `School-Sub-Admin created successfully and send credentials mail on school admin "${createSchoolSubAdminData.email}" email-id` });
    } catch (error) {
      next(error);
    }
  };

  public updateSchoolSubAdmin = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
      const schoolSubAdminData = req.body;
      const schoolSubAdminId = req.params.schoolSubAdminId
      const userData = req.user

      const updateSchoolSubAdminData = await this.schoolService.updateSchoolSubAdmin(schoolSubAdminId,schoolSubAdminData,userData);
      res.status(201).json({ data: updateSchoolSubAdminData, message: 'School-Sub-Admin record successfully updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteSchoolSubAdmin = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
        const schoolAdminData = await this.schoolService.deleteSchoolSubAdmin(req.params, req.user)  
        res.status(200).json({ data: schoolAdminData, message: "School-Sub-Admin deleted successfully" });
    } catch (error) {
      next(error);
    }
  };

  public activateSchoolSubAdmin = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
        const {activateSchoolAdminData, statusMode} = await this.schoolService.activateSchoolSubAdmin(req.params, req.user)  
        res.status(200).json({ data: activateSchoolAdminData, message: `School-Sub-Admin "${activateSchoolAdminData.firstName} ${activateSchoolAdminData.lastName}" ${statusMode} successfully` });
    } catch (error) {
      next(error);
    }
  };

  public getSchoolSubAdmin = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try{
      const getSchoolAdminData = await this.schoolService.getSchoolSubAdmin(req.query);
      const schoolAdminRecord = getSchoolAdminData ? getSchoolAdminData[0]['data'] : [];
      const schoolAdminCount = getSchoolAdminData ? getSchoolAdminData[0]['count'][0] ? getSchoolAdminData[0]?.['count'][0]?.count : 0 : 0;

      res.status(200).json({ data: schoolAdminRecord, count: schoolAdminCount, message: 'School Admin records fetch successfully'});
    } catch (err){
      next(err)
    }
  }
}

export default SchoolsController;