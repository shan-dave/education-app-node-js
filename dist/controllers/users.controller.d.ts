import { NextFunction, Response } from 'express';
import userService from '../services/users.service';
import { IGetUserAuthInfo } from '../interfaces/request.interface';
declare class UsersController {
    userService: userService;
    createSchoolUser: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    getUserProfile: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    updateSchoolUser: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    deleteSchoolUser: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    activateSchoolUser: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    getSchoolAdmin: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    updateAdminUser: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    getAdminUser: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
}
export default UsersController;
