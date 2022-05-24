import mongoose from 'mongoose';
import { Grade } from '../interfaces/grades.interface';
declare const gradeModel: mongoose.Model<Grade & mongoose.Document<any, any, any>, {}, {}>;
export default gradeModel;
