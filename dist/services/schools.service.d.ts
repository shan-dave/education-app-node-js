import { School } from '../interfaces/schools.interface';
import { User } from '../interfaces/users.interface';
import mongoose from 'mongoose';
declare class SchoolService {
    schools: mongoose.Model<School & mongoose.Document<any, any, any>, {}, {}>;
    users: mongoose.Model<User & mongoose.Document<any, any, any>, {}, {}>;
    roles: mongoose.Model<import("../interfaces/roles.interface").Role & mongoose.Document<any, any, any>, {}, {}>;
    createSchool(schoolData: any, userData: any): Promise<School>;
    assignSchoolToUser(schoolData: any, userData: any): Promise<{
        assignUserData: User;
        schoolIsVerify: School;
    }>;
    unassignSchoolToUser(schoolData: any, userData: any): Promise<{
        assignUserData: User;
        schoolIsVerify: School;
    }>;
    getSchool(schoolData: any): Promise<School[]>;
    deleteSchool(schoolData: any, userData: any): Promise<School>;
    activateSchool(schoolData: any, userData: any): Promise<School>;
    updateSchool(schoolId: any, schoolData: any, userData: any): Promise<School>;
    createSchoolSubAdmin(schoolSubAdminData: any, userData: any): Promise<User>;
    updateSchoolSubAdmin(schoolSubAdminId: any, schoolSubAdminData: any, userData: any): Promise<User>;
    deleteSchoolSubAdmin(schoolSubAdminData: any, userData: any): Promise<User>;
    activateSchoolSubAdmin(schoolSubAdminData: any, userData: any): Promise<{
        activateSchoolAdminData: User;
        statusMode: String;
    }>;
    getSchoolSubAdmin(schoolSubAdminData: any): Promise<User[]>;
}
export default SchoolService;
