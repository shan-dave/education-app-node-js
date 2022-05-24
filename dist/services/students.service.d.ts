import { Student } from '../interfaces/students.interface';
import { Teacher } from '../interfaces/teachers.interface';
import { User } from '../interfaces/users.interface';
import mongoose from 'mongoose';
declare class StudentService {
    students: mongoose.Model<Student & mongoose.Document<any, any, any>, {}, {}>;
    users: mongoose.Model<User & mongoose.Document<any, any, any>, {}, {}>;
    teachers: mongoose.Model<Teacher & mongoose.Document<any, any, any>, {}, {}>;
    createStudent(studentData: any, userData: any): Promise<Student>;
    updateStudent(studentId: any, studentData: any, userData: any): Promise<Student>;
    deleteStudent(studentId: any, userData: any): Promise<Student>;
    acivateStudent(studentId: any, userData: any): Promise<{
        activateStudentData: Student;
        statusMode: String;
    }>;
    getStudent(studentData: any): Promise<Student[]>;
}
export default StudentService;
