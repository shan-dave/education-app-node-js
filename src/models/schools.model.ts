import { model, Schema, Document, Mongoose} from 'mongoose';
import { School } from '../interfaces/schools.interface';

const schoolSchema: Schema = new Schema({
  schoolName: {
    type: String,
    require: true
  },
  schoolPhoneNumber: {
    type: String,
    require: true
  },
  countryCode: {
    type: String,
    require: true
  },
  addressLine1: {
    type: String,
    require: true
  },
  addressLine2: {
    type: String
  },
  districtId: {
    type: Schema.Types.ObjectId,
    ref: 'districts',
    require: true
  },
  stateId: {
    type: Schema.Types.ObjectId,
    ref: 'states',
    require: true
  },
  country: {
    type: String,
    require: true
  },
  zipCode:{
    type: String,
    require: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  isActivated: {
    type: Boolean,
    default: false
  },
  isAssigned:{
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

const schoolModel = model<School & Document>('schools', schoolSchema);

export default schoolModel;