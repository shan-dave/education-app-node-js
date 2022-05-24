/// <reference types="mongoose" />
import { Grade } from '../interfaces/grades.interface';
declare class GreadeService {
    grades: import("mongoose").Model<Grade & import("mongoose").Document<any, any, any>, {}, {}>;
    creatGradee(body: any, user: any): Promise<Grade>;
    getGrade(query: any, user: any): Promise<Grade[]>;
    deleteGrade(gradeId: any, user: any): Promise<Grade>;
    changeGradeStatus(gradeId: any, user: any): Promise<{
        gradeData: Grade;
        statusMode: String;
    }>;
}
export default GreadeService;
