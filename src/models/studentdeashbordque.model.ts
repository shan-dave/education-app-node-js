import mongoose, { Schema, Document } from 'mongoose';
import { StudentDashbordQue } from '../interfaces/studentdashbordque.interface';

const studentDashbordQueSchema: Schema = new Schema({
  questionType: {
    type: String,//checkBox, radio, text
    required: true
  },
  answerType: {
    type: String,//string, number, boolean
    required: true
  },
  isAssignAllSchool: {
    type: Boolean,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  default: {
    type: Boolean,
    required: true
  },
  otherAnsRequired: {
    type: Boolean,
    required: true
  },
  isRequired:{
    type: Boolean,
    required: true
  },
  isSelectMultiple:{
    type: Boolean,
    required: true
  },
  otherAnsRequiredValue: {
    type: String
  },
  option: Schema.Types.Mixed,
  assignedSchool: [{
    type: Schema.Types.ObjectId,
    ref: 'schools'
  }],
  isDeleted: {
    type: Boolean,
    default: false
  },
  isActivated: {
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
  { timestamps: true });

const studentDashbordQueModel = mongoose.model<StudentDashbordQue & Document>('studentdashbordques', studentDashbordQueSchema);

export default studentDashbordQueModel;