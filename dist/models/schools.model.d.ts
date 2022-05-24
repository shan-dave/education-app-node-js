import { Document } from 'mongoose';
import { School } from '../interfaces/schools.interface';
declare const schoolModel: import("mongoose").Model<School & Document<any, any, any>, {}, {}>;
export default schoolModel;
