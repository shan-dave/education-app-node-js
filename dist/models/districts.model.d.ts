import mongoose from 'mongoose';
import { District } from '../interfaces/districts.interface';
declare const districtModel: mongoose.Model<District & mongoose.Document<any, any, any>, {}, {}>;
export default districtModel;
