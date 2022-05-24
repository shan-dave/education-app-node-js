import { Document } from 'mongoose';
import { Teacher } from '../interfaces/teachers.interface';
declare const teacherModel: import("mongoose").Model<Teacher & Document<any, any, any>, {}, {}>;
export default teacherModel;
