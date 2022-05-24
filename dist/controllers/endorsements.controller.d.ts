import { NextFunction, Response } from 'express';
import endorsementService from '../services/endorsements.service';
import { IGetUserAuthInfo } from '../interfaces/request.interface';
declare class EndorsementsController {
    endorsementService: endorsementService;
    createEndorsement: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    updateEndorsement: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    deleteEndorsement: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    changeEndorsementStatus: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
    getEndorsement: (req: IGetUserAuthInfo, res: Response, next: NextFunction) => Promise<void>;
}
export default EndorsementsController;
