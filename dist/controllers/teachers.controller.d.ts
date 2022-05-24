import { NextFunction, Response } from 'express';
import teacherService from '../services/teachers.service';
import { IGetUserAuthInfo } from '../interfaces/request.interface';
declare class TeachersController {
    teacherService: teacherService;
    createTeacher: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    updateTeacher: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    deleteTeacher: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    activateTeacher: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    getTeacher: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
}
export default TeachersController;
