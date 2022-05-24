import { NextFunction, Response } from 'express';
import reportService from '../services/reports.service';
import { IGetUserAuthInfo } from '../interfaces/request.interface';
declare class ReportsController {
    reportService: reportService;
    createReport: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    updateReport: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    deleteReport: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    activateReport: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    getReport: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
}
export default ReportsController;
