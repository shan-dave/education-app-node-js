import { NextFunction, Response } from 'express';
import studentDashbordQueService from '../services/studentdashbordque.service';
import { IGetUserAuthInfo } from '../interfaces/request.interface';
declare class StudentDashbordQueController {
    studentDashbordQueService: studentDashbordQueService;
    createStudentDashbordQue: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    updateStudentDashbordQue: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    deleteStudentDashbordQue: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    activeStudentDashbordQue: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    getStudentDashbordQue: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    checkDefaultQue: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
}
export default StudentDashbordQueController;
