import { NextFunction, Response } from 'express';
import queAnsStudentDashbordService from '../services/queansstudentdashbord.service';
import { IGetUserAuthInfo } from '../interfaces/request.interface';
declare class QueAnsStudentDashbordController {
    queAnsStudentDashbordService: queAnsStudentDashbordService;
    createQueAnsStudentDashbord: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    getQueAnsStudentDashbordListChart1: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    getQueAnsStudentDashbordListAttendanceChart: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    getQueAnsStudentDashbordListChart2: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    getQueAnsStudentDashbordListChart3: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    getQueAnsStudentDashbordListChart4: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    getQueAnsStudentDashbordListChart5: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    getQueAnsStudentDashbordListChart6: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
}
export default QueAnsStudentDashbordController;
