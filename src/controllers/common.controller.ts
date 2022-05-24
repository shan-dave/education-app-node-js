import { NextFunction, Request, Response } from 'express';

import {IGetUserAuthInfo} from '../interfaces/request.interface'
import CommonService from '../services/commons.service'
class CommonController {
  public commonService = new CommonService();

  public insertState = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
        const stateData = await this.commonService.insertStateData(req.body, req.user)
        res.status(201).json({ data: stateData, message: "State name created successfully" });  
    } catch (error) {
      next(error);
    }
  };

  public insertDistrict = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
        const districtData = await this.commonService.insertDistrictData(req.body, req.user)
        res.status(201).json({ data: districtData, message: `State ${districtData.name} created successfully` });
    } catch (error) {
      next(error);
    }
  };

  public deleteState = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
        const stateData = await this.commonService.deleteState(req.params, req.user)  
        res.status(200).json({ data: stateData, message: `State "${stateData.name}" deleted successfully` });
    } catch (error) {
      next(error);
    }
  };

  public changeStateStatus = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
        const {changeStateStatusData, statusMode} = await this.commonService.changeStateStatus(req.params, req.user)
        res.status(200).json({ data: changeStateStatusData, message: `State "${changeStateStatusData.name}" ${statusMode} successfully` });
    } catch (error) {
      next(error);
    }
  };

  public changeDistrictStatus = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
      const {changeDistrictStatusData, statusMode} = await this.commonService.changeDistrictStatus(req.params, req.user)
      res.status(200).json({ data: changeDistrictStatusData, message: `District "${changeDistrictStatusData.name}" ${statusMode} successfully` });
    } catch (error) {
      next(error);
    }
  };
  

  public deleteDistrict = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
        const districtData = await this.commonService.deleteDistrict(req.params, req.user)  
        res.status(200).json({ data: districtData, message: `District "${districtData.name}" deleted successfully` });
    } catch (error) {
      next(error);
    }
  };

  public getState = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
      const stateData = await this.commonService.getState(req.query, req.user)  
      const stateRecord = stateData ? stateData[0]['data'] : [];
      const stateCount = stateData ? stateData[0]['count'][0] ? stateData[0]?.['count'][0]?.count : 0 : 0;

      res.status(200).json({ data: stateRecord, count: stateCount, message: "States record fetch successfully"});  
    } catch (error) {
      next(error);
    }
  };

  public getDistrict = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
      const districtData = await this.commonService.getDistrict(req.query, req.user)  
      const districtRecord = districtData ? districtData[0]['data'] : [];
      const districtCount = districtData ? districtData[0]['count'][0] ? districtData[0]?.['count'][0]?.count : 0 : 0;

      res.status(200).json({ data: districtRecord, count: districtCount, message: "Districts record fetch successfully"});
    } catch (error) {
      next(error);
    }
  };

  public getSchoolDashbord = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
        const schoolDashbord = await this.commonService.getSchoolDashbord(req.query)  
        res.status(200).json({ data: schoolDashbord, message: "School dashbord record fetch successfully" });
    } catch (error) {
      next(error);
    }
  };

  public getStateDashbord = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
        const stateDashbord = await this.commonService.getStateDashbord(req.query)  
        res.status(200).json({ data: stateDashbord, message: "State dashbord record fetch successfully" });
    } catch (error) {
      next(error);
    }
  };

  public getDistrictDashbord = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
        const districtDashbord = await this.commonService.getDistrictDashbord(req.query)  
        res.status(200).json({ data: districtDashbord, message: "District dashbord record fetch successfully" });
    } catch (error) {
      next(error);
    }
  };
  


  public getTeacherDashbord = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
        const teacherDashbord = await this.commonService.getTeacherDashbord(req.query)  
        res.status(200).json({ data: teacherDashbord, message: "Teachers dashbord record fetch successfully" });
    } catch (error) {
      next(error);
    }
  };

  public getStudentDashbord = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
        const studentDashbord = await this.commonService.getStudentDashbord(req.query)  
        res.status(200).json({ data: studentDashbord, message: "Student dashbord record fetch successfully" });
    } catch (error) {
      next(error);
    }
  };
} 


export default CommonController;