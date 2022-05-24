import { StudentDashbordQue } from '../interfaces/studentdashbordque.interface';
import mongoose from 'mongoose';
declare class StudentDashbordQueService {
    studentDeashbordQue: mongoose.Model<StudentDashbordQue & mongoose.Document<any, any, any>, {}, {}>;
    createStudentDashbordQue(queData: any, userData: any): Promise<StudentDashbordQue>;
    updateStudentDashbordQue(queId: any, queData: any, userData: any): Promise<StudentDashbordQue>;
    deleteStudentDashbordQue(queId: any, userData: any): Promise<StudentDashbordQue>;
    aciveStudentDashbordQue(queId: any, userData: any): Promise<{
        activeStudentDashbordQueData: StudentDashbordQue;
        statusMode: String;
    }>;
    getStudentDashbordQue(queData: any): Promise<StudentDashbordQue[]>;
    checkDefaultQue(): Promise<Boolean>;
}
export default StudentDashbordQueService;
