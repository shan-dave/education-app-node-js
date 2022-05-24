import mongoose, { Schema, Document } from 'mongoose';
import { Report } from '../interfaces/reports.interface';

const reportSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  userId : {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  startDate:{
    type: String,
    require: true
  },
  endDate:{
    type: String,
    require: true
  },
  districtId: {
    type: Schema.Types.ObjectId,
    ref: 'districts',
  },
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: 'schools',
  },
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'students',
  },
  questionId:{
    type: Schema.Types.ObjectId,
    ref: 'studentdashbordques',
  },
  answer: {
    type: String,
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

const reportModel = mongoose.model<Report & Document>('reports', reportSchema);

export default reportModel;