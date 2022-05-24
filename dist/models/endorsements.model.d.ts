import mongoose from 'mongoose';
import { Endorsement } from '../interfaces/endorsements.interface';
declare const endorsementModel: mongoose.Model<Endorsement & mongoose.Document<any, any, any>, {}, {}>;
export default endorsementModel;
