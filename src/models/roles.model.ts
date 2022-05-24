import mongoose, { Schema, Document } from 'mongoose';
import { Role } from '../interfaces/roles.interface';

const roleSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  }
}, { timestamps: true });

const roleModel = mongoose.model<Role & Document>('roles', roleSchema);

export default roleModel;
