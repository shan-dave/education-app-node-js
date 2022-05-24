import { NextFunction, Response } from 'express';
import schoolService from '../services/schools.service';
import { IGetUserAuthInfo } from '../interfaces/request.interface';
declare class SchoolsController {
    schoolService: schoolService;
    createSchool: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    assignSchool: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    unassignSchool: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    getSchool: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    deleteSchool: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    activateSchool: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    updateSchool: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    createSchoolSubAdmin: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    updateSchoolSubAdmin: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    deleteSchoolSubAdmin: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    activateSchoolSubAdmin: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    getSchoolSubAdmin: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
}
export default SchoolsController;
