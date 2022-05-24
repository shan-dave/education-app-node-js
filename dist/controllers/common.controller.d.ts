import { NextFunction, Response } from 'express';
import { IGetUserAuthInfo } from '../interfaces/request.interface';
import CommonService from '../services/commons.service';
declare class CommonController {
    commonService: CommonService;
    insertState: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    insertDistrict: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    deleteState: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    changeStateStatus: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    changeDistrictStatus: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    deleteDistrict: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    getState: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    getDistrict: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    getSchoolDashbord: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    getStateDashbord: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    getDistrictDashbord: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    getTeacherDashbord: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    getStudentDashbord: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
}
export default CommonController;
