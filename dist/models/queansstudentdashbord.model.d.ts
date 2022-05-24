import mongoose from 'mongoose';
import { QueAnsStudentDashbord } from '../interfaces/queansstudentdashbord.interface';
declare const queAnsStudentDashbordModel: mongoose.Model<QueAnsStudentDashbord & mongoose.Document<any, any, any>, {}, {}>;
export default queAnsStudentDashbordModel;
