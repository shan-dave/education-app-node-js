import { NextFunction, Request, Response } from 'express';
import { Endorsement } from '../interfaces/endorsements.interface';
import endorsementService from '../services/endorsements.service';
import {IGetUserAuthInfo} from '../interfaces/request.interface'
class EndorsementsController {
    public endorsementService = new endorsementService()

    public createEndorsement = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
        try {
          const createEndorsementData = await this.endorsementService.createEndorsement(req.body, req.user);
          res.status(201).json({data: createEndorsementData, message: `Endorsement "${createEndorsementData.name}" created successfully` });
        } catch (error) {
          next(error);
        }
    };

    public updateEndorsement = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
        try {
            const endorsementData = req.body;
            const endorsementId = req.params.endorsementId
            const userData = req.user 
            const updateendorsementData = await this.endorsementService.updateEndorsement(endorsementId, endorsementData, userData);
            res.status(200).json({data: updateendorsementData, message: `Endorsement "${updateendorsementData.name}" updated successfully` });
        } catch (error) {
          next(error);
        }
    };

    public deleteEndorsement = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
        try {
            const endorsementId = req.params.endorsementId
            const userData = req.user 
            const deleteEndorsementData = await this.endorsementService.deleteEndorsement(endorsementId, userData);
            res.status(200).json({data: deleteEndorsementData, message: `Endorsement "${deleteEndorsementData.name}" deleted successfully` });
        } catch (error) {
          next(error);
        }
    };

    public changeEndorsementStatus = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
      try {
          const {changeEndorsementStatusData, statusMode} = await this.endorsementService.changeEndorsementStatus(req.params, req.user)
          res.status(200).json({ data: changeEndorsementStatusData, message: `Endorsement "${changeEndorsementStatusData.name}" ${statusMode} successfully` });
      } catch (error) {
        next(error);
      }
    };
    
    public getEndorsement = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
      try {
        const endorsementData = await this.endorsementService.getEndorsement(req.query, req.user)  
        const endorsementRecord = endorsementData ? endorsementData[0]['data'] : [];
        const endorsementCount = endorsementData ? endorsementData[0]['count'][0] ? endorsementData[0]?.['count'][0]?.count : 0 : 0;
  
        res.status(200).json({ data: endorsementRecord, count: endorsementCount, message: "Endorsement records fetch successfully"});  
      } catch (error) {
        next(error);
      }
    };

  //   public getSubject = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
  //       try{
  //         const getSubject = await this.endorsementService.getSubject(req.query);
  //         const subjectRecords = getSubject ? getSubject[0]['data'] : [];
  //         const subjectCount = getSubject ? getSubject[0]['count'][0] ? getSubject[0]?.['count'][0]?.count : 0 : 0;
    
  //         res.status(200).json({ data: subjectRecords, count: subjectCount, message: 'Subjects record fetch successfully'});
  //       } catch (err){
  //         next(err)
  //       }
  //     }
}

export default EndorsementsController