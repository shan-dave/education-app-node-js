import mongoose, { Schema, Document } from 'mongoose';
import { District } from '../interfaces/districts.interface';

const districtSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  sauCode : {
    type: String,
    required: true
  },
  stateId: {
    type: Schema.Types.ObjectId,
    ref: 'states',
    required: true
  },
  isActivated: {
    type: Boolean,
    default: false
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

const districtModel = mongoose.model<District & Document>('districts', districtSchema);

export default districtModel;