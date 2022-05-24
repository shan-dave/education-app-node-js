import mongoose, { Schema, Document } from 'mongoose';
import { QueAnsStudentDashbord } from '../interfaces/queansstudentdashbord.interface'
const queAnsStudentDashbordSchema: Schema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'students',
    required: true
  },
  teacherId : {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  schoolId : {
    type: Schema.Types.ObjectId,
    ref: 'schools',
    required: true
  },
  districtId : {
    type: Schema.Types.ObjectId,
    ref: 'districts',
    required: true
  },
  queAns: [{
      questionId: {
        type: Schema.Types.ObjectId,
        ref: 'studentdashbordques',
        require: true
      },
      answer: {
        type : Schema.Types.Mixed,
        require: true
      },
      otherAns:{ type: String},
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
{timestamps: true});

const queAnsStudentDashbordModel = mongoose.model<QueAnsStudentDashbord & Document>('queansstudentdashbord', queAnsStudentDashbordSchema);

export default queAnsStudentDashbordModel;