import { User } from '../interfaces/users.interface';
import { Role } from '../interfaces/roles.interface';
import mongoose from 'mongoose';
declare class UserService {
    users: mongoose.Model<User & mongoose.Document<any, any, any>, {}, {}>;
    roles: mongoose.Model<Role & mongoose.Document<any, any, any>, {}, {}>;
    getUserProfile(user: any): Promise<User>;
    createSchoolUser(schoolAdminData: any, userData: any): Promise<User>;
    updateSchoolUser(schoolAdminId: any, schoolAdminData: any, userData: any): Promise<User>;
    deleteSchoolAdmin(schoolAdminData: any, userData: any): Promise<User>;
    activateSchoolAdmin(schoolAdminData: any, userData: any): Promise<{
        activateSchoolAdminData: User;
        statusMode: String;
    }>;
    getSchoolAdmin(schoolAdminData: any): Promise<User[]>;
    updateAdminUser(adminId: any, adminData: any, userData: any): Promise<User>;
    getAdminUser(adminId: any, userData: any): Promise<User>;
}
export default UserService;
