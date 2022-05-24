import mongoose, { Schema, Document } from 'mongoose';
import { Country } from '../interfaces/countries.interface';

const countrySchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  countryCode: {
    type: String,
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  deletedBy: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  deletedAt: {
    type: Date
  }
},
{timestamps: true});

const countryModel = mongoose.model<Country & Document>('countries', countrySchema);

export default countryModel;