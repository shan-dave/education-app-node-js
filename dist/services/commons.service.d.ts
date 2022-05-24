import { State } from '../interfaces/states.interface';
import { District } from '../interfaces/districts.interface';
import { School } from '../interfaces/schools.interface';
import { Teacher } from '../interfaces/teachers.interface';
import { Student } from '../interfaces/students.interface';
import mongoose from 'mongoose';
declare class CommonService {
    states: mongoose.Model<State & mongoose.Document<any, any, any>, {}, {}>;
    districts: mongoose.Model<District & mongoose.Document<any, any, any>, {}, {}>;
    schools: mongoose.Model<School & mongoose.Document<any, any, any>, {}, {}>;
    teachers: mongoose.Model<Teacher & mongoose.Document<any, any, any>, {}, {}>;
    students: mongoose.Model<Student & mongoose.Document<any, any, any>, {}, {}>;
    insertStateData(body: any, user: any): Promise<State>;
    insertDistrictData(body: any, user: any): Promise<District>;
    deleteState(stateData: any, userData: any): Promise<State>;
    changeStateStatus(stateData: any, userData: any): Promise<{
        changeStateStatusData: State;
        statusMode: String;
    }>;
    changeDistrictStatus(districtData: any, userData: any): Promise<{
        changeDistrictStatusData: District;
        statusMode: String;
    }>;
    deleteDistrict(params: any, user: any): Promise<District>;
    getState(stateData: any, userData: any): Promise<State[]>;
    getDistrict(params: any, userData: any): Promise<District[]>;
    getSchoolDashbord(queryData: any): Promise<School[]>;
    getStateDashbord(queryData: any): Promise<State[]>;
    getDistrictDashbord(queryData: any): Promise<District[]>;
    getStudentDashbord(queryData: any): Promise<Student[]>;
    getTeacherDashbord(queryData: any): Promise<Teacher[]>;
}
export default CommonService;
