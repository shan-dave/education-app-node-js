import mongoose, { Schema, Document } from 'mongoose';
import { Grade } from '../interfaces/grades.interface';

const gradeSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  isDeleted:{
    type: Boolean,
    require: true,
    default: false
  },
  isActivated:{
    type: Boolean,
    require: true,
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

const gradeModel = mongoose.model<Grade & Document>('grades', gradeSchema);

export default gradeModel;
