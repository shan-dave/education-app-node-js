import { model, Schema, Document, Mongoose} from 'mongoose';
import { Student } from '../interfaces/students.interface';

const studentSchema: Schema = new Schema({
  sasId: {
    type: Number,
    require: true
  },
  assessementId: {
    type: Number,
    require: true
  },
  email:{
    type: String,
    require: true
  },
  // assignTeacherId: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'teachers',
  //   // require: true
  // }],
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: 'schools',
    require: true
  },
  gradeId: {
    type: Schema.Types.ObjectId,
    ref: 'grades',
    require: true
  },
  studentName: {
    type: String,
    require: true
  },
  // missingAnrolmentNo: {
  //   type: Boolean
  // },
  primaryLanguage: {
    type: String,
    require: true
  },
  lastYearImprovedFlag: {
    type: Boolean
  },
  serviceMinutes: {
    type: String,
  },
  programType: {
    type: String
  },
  yearsOfForeignEducation: {
    type: Number
  },
  screeningType: {
    type: String
  },
  screeningScore: {
    type: String
  },
  comment: {
    type: String
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

const studentModel = model<Student & Document>('students', studentSchema);

export default studentModel;