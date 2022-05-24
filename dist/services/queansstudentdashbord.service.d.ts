import { QueAnsStudentDashbord } from '../interfaces/queansstudentdashbord.interface';
import { Student } from '../interfaces/students.interface';
import mongoose from 'mongoose';
declare class QueAnsStudentDeashbordService {
    queAnsStudentDeashbord: mongoose.Model<QueAnsStudentDashbord & mongoose.Document<any, any, any>, {}, {}>;
    students: mongoose.Model<Student & mongoose.Document<any, any, any>, {}, {}>;
    createQueAnsStudentDashbord(queAnsData: any, userData: any): Promise<QueAnsStudentDashbord>;
    getQueAnsStudentDashbordListChart1(query: any, user: any): Promise<QueAnsStudentDashbord[]>;
    getQueAnsStudentDashbordListAttendanceChart(query: any, user: any): Promise<QueAnsStudentDashbord[]>;
    getQueAnsStudentDashbordListChart2(query: any, user: any): Promise<QueAnsStudentDashbord[]>;
    getQueAnsStudentDashbordListChart3(query: any, user: any): Promise<QueAnsStudentDashbord[]>;
    getQueAnsStudentDashbordListChart4(query: any, user: any): Promise<QueAnsStudentDashbord[]>;
    getQueAnsStudentDashbordListChart5(query: any, user: any): Promise<QueAnsStudentDashbord[]>;
    getQueAnsStudentDashbordListChart6(query: any, user: any): Promise<QueAnsStudentDashbord[]>;
}
export default QueAnsStudentDeashbordService;
