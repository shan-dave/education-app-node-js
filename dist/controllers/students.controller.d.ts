import { NextFunction, Response } from 'express';
import studentService from '../services/students.service';
import { IGetUserAuthInfo } from '../interfaces/request.interface';
declare class StudentsController {
    studentService: studentService;
    createStudent: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    updateStudent: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    deleteStudent: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    activateStudent: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    getStudent: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
}
export default StudentsController;
