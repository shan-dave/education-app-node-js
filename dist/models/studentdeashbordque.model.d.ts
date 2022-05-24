import mongoose from 'mongoose';
import { StudentDashbordQue } from '../interfaces/studentdashbordque.interface';
declare const studentDashbordQueModel: mongoose.Model<StudentDashbordQue & mongoose.Document<any, any, any>, {}, {}>;
export default studentDashbordQueModel;
