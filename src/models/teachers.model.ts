import { model, Schema, Document, Mongoose } from 'mongoose';
import { Teacher } from '../interfaces/teachers.interface';

const teacherSchema: Schema = new Schema({
  endorsementId: [{
    type: Schema.Types.ObjectId,
    ref: 'endorsements',
    require: true
  }],
  firstName: {
    type: String,
    require:true
  },
  // teacherId: {
  //   type: String,
  //   require:true
  // },
  edId: {
    type: String,
    require:true
  },
  lastName: {
    type: String,
    require:true
  },
  schoolId:{
    type: Schema.Types.ObjectId,
    ref: 'schools',
    require: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    require: true
  },
  gradeIds: [{
    type: Schema.Types.ObjectId,
    ref: 'grades',
    require: true
  }],
  addressLine1:{
    type: String
  },
  addressLine2:{
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
  dateOfBirth: {
    type: Date,
    require: true
  },
  deletedAt: {
    type: Date,
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  isActivated: {
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
  }
},
{ timestamps: true });

const teacherModel = model<Teacher & Document>('teachers', teacherSchema);

export default teacherModel;