"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const HttpException_1 = tslib_1.__importDefault(require("../exceptions/HttpException"));
const teachers_model_1 = tslib_1.__importDefault(require("../models/teachers.model"));
const students_model_1 = tslib_1.__importDefault(require("../models/students.model"));
const users_model_1 = tslib_1.__importDefault(require("../models/users.model"));
const moment_1 = tslib_1.__importDefault(require("moment"));
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
class StudentService {
    constructor() {
        this.students = students_model_1.default;
        this.users = users_model_1.default;
        this.teachers = teachers_model_1.default;
        // public async assignTeacher(body, user): Promise<Student> {
        //   const tracherIds = body.teacherIds
        //   const studentId = body.studentId
        //   const schoolId = body.schoolId
        //   const getStudentDetails = await this.students.findOne({_id : studentId, isDeleted: false})
        //   if(!getStudentDetails) throw new HttpException(409, `Student not found`);
        //   else if(getStudentDetails.schoolId.toString() != schoolId.toString()) throw new HttpException(409, `Student is not belongs to school`);
        //   for(const teacherId of tracherIds) {
        //     const teacherDetails = await this.teachers.findOne({_id: teacherId, isDeleted:false})
        //     if(!teacherDetails) throw new HttpException(409, `Teacher not found`);
        //     if(teacherDetails.schoolId.toString() != schoolId.toString())throw new HttpException(409, `Teacher is not belongs to school`);
        //     if(teacherDetails.schoolId.toString() != getStudentDetails.schoolId.toString())throw new HttpException(409, `Teacher and Student not belongs to same school`);
        //   }
        //   console.log('SAI')
        // }
    }
    async createStudent(studentData, userData) {
        const findSasId = await this.students.findOne({ sasId: studentData.sasId, isDeleted: false });
        const findAssessementId = await this.students.findOne({ assessementId: studentData.assessementId, isDeleted: false });
        if (findSasId)
            throw new HttpException_1.default(409, `SASId "${studentData.sasId}" already exists`);
        if (findAssessementId)
            throw new HttpException_1.default(409, `AssessementId "${studentData.assessementId}" already exists`);
        // if (userData.role['name'] == 'Teacher') studentData = { ...studentData, assignTeacherId: [userData._id] }
        const createStudent = await this.students.create(Object.assign(Object.assign({}, studentData), { createdBy: userData._id }));
        return createStudent;
    }
    async updateStudent(studentId, studentData, userData) {
        const findStudent = await this.students.findOne({ _id: studentId, isDeleted: false });
        const findUser = await this.users.findOne({ _id: userData._id, isDeleted: false }).populate({
            path: 'role'
        }).select('-password');
        if (!findStudent) {
            throw new HttpException_1.default(409, `Student not found`);
        }
        else if (findStudent.isActivated == true) {
            throw new HttpException_1.default(409, `Student is Deactivated`);
        }
        if (findUser.role['name'] == 'School-Admin' || findUser.role['name'] == 'School-Sub-Admin' || findUser.role['name'] == 'Teacher') {
            if (findUser.schoolId.toString() != findStudent.schoolId.toString()) {
                throw new HttpException_1.default(409, `This student is not belongs to your school`);
            }
        }
        const updatedStudent = await this.students.findByIdAndUpdate(studentId, Object.assign(Object.assign({}, studentData), { updatedBy: userData._id }), {
            new: true
        });
        return updatedStudent;
    }
    async deleteStudent(studentId, userData) {
        const findStudent = await this.students.findOne({ _id: studentId, isDeleted: false });
        const findUser = await this.users.findOne({ _id: userData._id, isDeleted: false }).populate({
            path: 'role'
        }).select('-password');
        if (!findStudent) {
            throw new HttpException_1.default(409, `Student not found`);
        }
        if (findUser.role['name'] == 'School-Admin' || findUser.role['name'] == 'School-Sub-Admin' || findUser.role['name'] == 'Teacher') {
            if (findUser.schoolId.toString() != findStudent.schoolId.toString()) {
                throw new HttpException_1.default(409, `This student is not belongs to your school`);
            }
        }
        const deleteStudent = await this.students.findByIdAndUpdate(studentId, {
            isDeleted: true,
            deletedBy: userData._id,
            deletedAt: moment_1.default().utc().toDate()
        }, { new: true }).select('-password');
        return deleteStudent;
    }
    async acivateStudent(studentId, userData) {
        const findStudent = await this.students.findOne({ _id: studentId, isDeleted: false });
        const findUser = await this.users.findOne({ _id: userData._id, isDeleted: false }).populate({
            path: 'role'
        }).select('-password');
        if (!findStudent) {
            throw new HttpException_1.default(409, `Student not found`);
        }
        if (findUser.role['name'] == 'School-Admin' || findUser.role['name'] == 'School-Sub-Admin' || findUser.role['name'] == 'Teacher') {
            if (findUser.schoolId.toString() != findStudent.schoolId.toString()) {
                throw new HttpException_1.default(409, `This student is not belongs to your school`);
            }
        }
        let status;
        let statusMode;
        if (findStudent.isActivated === false) {
            status = true;
            statusMode = 'Deactivated';
        }
        else {
            status = false;
            statusMode = 'Activated';
        }
        const activateStudentData = await this.students.findByIdAndUpdate(studentId, {
            isActivated: status,
            updatedBy: userData._id
        }, { new: true });
        return { activateStudentData, statusMode };
    }
    async getStudent(studentData) {
        const pageNumber = (studentData === null || studentData === void 0 ? void 0 : studentData.pageNumber) || 1;
        const pageSize = (studentData === null || studentData === void 0 ? void 0 : studentData.pageSize) || 100;
        const limit = Number(pageSize);
        const skip = (Number(pageNumber) - 1) * limit;
        let search = {
            $and: [{ isDeleted: false }]
        };
        if (studentData.status) {
            search.$and.push({
                isActivated: JSON.parse(studentData.status)
            });
        }
        if (studentData.studentId) {
            search.$and.push({
                _id: new mongoose_1.default.Types.ObjectId(studentData.studentId)
            });
        }
        if (studentData.schoolId) {
            search.$and.push({
                schoolId: new mongoose_1.default.Types.ObjectId(studentData.schoolId)
            });
        }
        if (studentData.gradeId) {
            search.$and.push({
                gradeId: new mongoose_1.default.Types.ObjectId(studentData.gradeId)
            });
        }
        if (studentData.search) {
            const searchRegex = new RegExp(studentData.search, 'i');
            search.$and.push({
                $or: [{ studentName: { $regex: searchRegex } }]
            });
        }
        const getTeacherData = await this.students.aggregate([
            { $match: search },
            {
                $lookup: {
                    from: 'schools',
                    localField: 'schoolId',
                    foreignField: '_id',
                    as: "school"
                }
            },
            {
                $lookup: {
                    from: 'grades',
                    localField: 'gradeId',
                    foreignField: '_id',
                    as: "grade"
                }
            },
            {
                $unwind: {
                    path: '$school',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: '$grade',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    _id: 1,
                    sasId: 1,
                    email: 1,
                    assessementId: 1,
                    schoolId: 1,
                    studentName: 1,
                    primaryLanguage: 1,
                    lastYearImprovedFlag: 1,
                    serviceMinutes: 1,
                    programType: 1,
                    yearsOfForeignEducation: 1,
                    screeningType: 1,
                    screeningScore: 1,
                    comment: 1,
                    gradeId: 1,
                    isActivated: 1,
                    schoonName: "$school.schoolName",
                    grade: "$grade.name"
                }
            }
        ]).facet({
            "data": [
                { $skip: skip },
                { $limit: limit }
            ],
            "count": [
                { $count: "count" }
            ]
        });
        return getTeacherData;
    }
}
exports.default = StudentService;
//# sourceMappingURL=students.service.js.map