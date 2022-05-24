import mongoose from 'mongoose';
import { Role } from '../interfaces/roles.interface';
declare const roleModel: mongoose.Model<Role & mongoose.Document<any, any, any>, {}, {}>;
export default roleModel;
