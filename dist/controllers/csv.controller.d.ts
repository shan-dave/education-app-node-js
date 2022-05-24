import { NextFunction, Response } from 'express';
import { IGetUserAuthInfo } from '../interfaces/request.interface';
import CSVService from '../services/csv.service';
declare class CSVController {
    csvService: CSVService;
    insertCSV: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
}
export default CSVController;
