import mongoose from 'mongoose';
import { Report } from '../interfaces/reports.interface';
declare const reportModel: mongoose.Model<Report & mongoose.Document<any, any, any>, {}, {}>;
export default reportModel;
