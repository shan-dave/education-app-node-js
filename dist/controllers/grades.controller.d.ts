import { NextFunction, Response } from 'express';
import gradeService from '../services/grades.service';
import { IGetUserAuthInfo } from '../interfaces/request.interface';
declare class GradesController {
    gradeService: gradeService;
    createGrade: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    deleteGrade: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    changeGradeStatus: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    getGrade: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
}
export default GradesController;
