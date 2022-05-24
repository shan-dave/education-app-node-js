import mongoose from 'mongoose';
import { State } from '../interfaces/states.interface';
declare const stateModel: mongoose.Model<State & mongoose.Document<any, any, any>, {}, {}>;
export default stateModel;
