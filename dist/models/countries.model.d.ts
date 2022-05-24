import mongoose from 'mongoose';
import { Country } from '../interfaces/countries.interface';
declare const countryModel: mongoose.Model<Country & mongoose.Document<any, any, any>, {}, {}>;
export default countryModel;
