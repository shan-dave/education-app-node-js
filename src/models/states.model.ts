import mongoose, { Schema, Document } from 'mongoose';
import { State } from '../interfaces/states.interface';

const stateSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
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

const stateModel = mongoose.model<State & Document>('states', stateSchema);

export default stateModel;