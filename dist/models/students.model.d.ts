import { Document } from 'mongoose';
import { Student } from '../interfaces/students.interface';
declare const studentModel: import("mongoose").Model<Student & Document<any, any, any>, {}, {}>;
export default studentModel;
