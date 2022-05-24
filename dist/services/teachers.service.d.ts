import { Teacher } from '../interfaces/teachers.interface';
import { User } from '../interfaces/users.interface';
import { Role } from '../interfaces/roles.interface';
import mongoose from 'mongoose';
declare class TeacherService {
    teachers: mongoose.Model<Teacher & mongoose.Document<any, any, any>, {}, {}>;
    users: mongoose.Model<User & mongoose.Document<any, any, any>, {}, {}>;
    roles: mongoose.Model<Role & mongoose.Document<any, any, any>, {}, {}>;
    createTeacher(teacherData: any, userData: any): Promise<{
        createUserData: User;
        createTeacherData: Teacher;
    }>;
    updateTeacher(teacherId: any, teacherData: any, userData: any): Promise<{
        updateUserData: User;
        updateTeacherData: Teacher;
    }>;
    deleteTeacher(teacherId: any, userData: any): Promise<{
        deleteTeacherUserData: User;
        deleteTeacherData: Teacher;
    }>;
    acivateTeacher(teacherId: any, userData: any): Promise<{
        activateTeacherData: Teacher;
        activateTeacherUserData: User;
        statusMode: String;
    }>;
    getTeacher(teacherData: any): Promise<Teacher[]>;
}
export default TeacherService;
