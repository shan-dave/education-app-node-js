import mongoose, { Schema, Document } from 'mongoose';
import { Endorsement } from '../interfaces/endorsements.interface';

const endorsementSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  isActivated:{
    type: Boolean,
    default: false
  },
  deletedBy: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  deletedAt: {
    type: Date
  }
}, { timestamps: true });

const endorsementModel = mongoose.model<Endorsement & Document>('endorsements', endorsementSchema);

export default endorsementModel;
