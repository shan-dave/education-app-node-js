import mongoose from 'mongoose';
import { User } from '../interfaces/users.interface';
declare const userModel: mongoose.Model<User & mongoose.Document<any, any, any>, {}, {}>;
export default userModel;
