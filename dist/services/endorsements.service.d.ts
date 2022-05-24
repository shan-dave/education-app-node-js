import { Endorsement } from '../interfaces/endorsements.interface';
import mongoose from 'mongoose';
declare class EndorsementService {
    endorsements: mongoose.Model<Endorsement & mongoose.Document<any, any, any>, {}, {}>;
    createEndorsement(body: any, user: any): Promise<Endorsement>;
    updateEndorsement(endorsementId: any, endorsementData: any, userData: any): Promise<Endorsement>;
    deleteEndorsement(endorsementId: any, userData: any): Promise<Endorsement>;
    changeEndorsementStatus(endorsementData: any, userData: any): Promise<{
        changeEndorsementStatusData: Endorsement;
        statusMode: String;
    }>;
    getEndorsement(endorsementData: any, userData: any): Promise<Endorsement[]>;
}
export default EndorsementService;
