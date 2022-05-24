import { isEmpty } from '../utils/util';
import HttpException from '../exceptions/HttpException';
import { Student } from '../interfaces/students.interface';
import { Teacher } from '../interfaces/teachers.interface';
import teacherModel from '../models/teachers.model';
import { User } from '../interfaces/users.interface';
import studentsModel from '../models/students.model';
import usersModel from '../models/users.model';
import moment from 'moment';
import _ from 'loadsh';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

class StudentService {
  public students = studentsModel;
  public users = usersModel;
  public teachers = teacherModel

  public async createStudent(studentData, userData): Promise<Student> {
    const findSasId: Student = await this.students.findOne({ sasId: studentData.sasId, isDeleted: false });
    const findAssessementId: Student = await this.students.findOne({ assessementId: studentData.assessementId, isDeleted: false });
    if (findSasId) throw new HttpException(409, `SASId "${studentData.sasId}" already exists`);
    if (findAssessementId) throw new HttpException(409, `AssessementId "${studentData.assessementId}" already exists`);
    // if (userData.role['name'] == 'Teacher') studentData = { ...studentData, assignTeacherId: [userData._id] }
    const createStudent: Student = await this.students.create({
      ...studentData,
      createdBy: userData._id
    })

    return createStudent;
  }

  public async updateStudent(studentId, studentData, userData): Promise<Student> {
    const findStudent: Student = await this.students.findOne({ _id: studentId, isDeleted: false })
    const findUser: User = await this.users.findOne({ _id: userData._id, isDeleted: false }).populate({
      path: 'role'
    }).select('-password')
    if (!findStudent) {
      throw new HttpException(409, `Student not found`);
    } else if (findStudent.isActivated == true) {
      throw new HttpException(409, `Student is Deactivated`);
    }
    if (findUser.role['name'] == 'School-Admin' || findUser.role['name'] == 'School-Sub-Admin' || findUser.role['name'] == 'Teacher') {
      if (findUser.schoolId.toString() != findStudent.schoolId.toString()) {
        throw new HttpException(409, `This student is not belongs to your school`);
      }
    }

    const updatedStudent: Student = await this.students.findByIdAndUpdate(studentId, {
      ...studentData,
      updatedBy: userData._id
    }, {
      new: true
    })

    return updatedStudent;
  }

  public async deleteStudent(studentId, userData): Promise<Student> {
    const findStudent: Student = await this.students.findOne({ _id: studentId, isDeleted: false })
    const findUser: User = await this.users.findOne({ _id: userData._id, isDeleted: false }).populate({
      path: 'role'
    }).select('-password')
    if (!findStudent) {
      throw new HttpException(409, `Student not found`);
    }
    if (findUser.role['name'] == 'School-Admin' || findUser.role['name'] == 'School-Sub-Admin' || findUser.role['name'] == 'Teacher') {
      if (findUser.schoolId.toString() != findStudent.schoolId.toString()) {
        throw new HttpException(409, `This student is not belongs to your school`);
      }
    }
    const deleteStudent: Student = await this.students.findByIdAndUpdate(studentId, {
      isDeleted: true,
      deletedBy: userData._id,
      deletedAt: moment().utc().toDate()
    }, { new: true }).select('-password')

    return deleteStudent;
  }

  public async acivateStudent(studentId, userData): Promise<{ activateStudentData: Student; statusMode: String; }> {
    const findStudent: Student = await this.students.findOne({ _id: studentId, isDeleted: false })
    const findUser: User = await this.users.findOne({ _id: userData._id, isDeleted: false }).populate({
      path: 'role'
    }).select('-password')
    if (!findStudent) {
      throw new HttpException(409, `Student not found`);
    }
    if (findUser.role['name'] == 'School-Admin' || findUser.role['name'] == 'School-Sub-Admin' || findUser.role['name'] == 'Teacher') {
      if (findUser.schoolId.toString() != findStudent.schoolId.toString()) {
        throw new HttpException(409, `This student is not belongs to your school`);
      }
    }
    let status: Boolean;
    let statusMode: String;
    if (findStudent.isActivated === false) {
      status = true
      statusMode = 'Deactivated'
    } else {
      status = false
      statusMode = 'Activated'
    }
    const activateStudentData: Student = await this.students.findByIdAndUpdate(studentId, {
      isActivated: status,
      updatedBy: userData._id
    }, { new: true })

    return { activateStudentData, statusMode };
  }

  public async getStudent(studentData): Promise<Student[]> {
    const pageNumber = studentData?.pageNumber || 1;
    const pageSize = studentData?.pageSize || 100;
    const limit = Number(pageSize);
    const skip = (Number(pageNumber) - 1) * limit;
    let search = {
      $and: [{ isDeleted: false }] as any
    };
    if (studentData.status) {
      search.$and.push({
        isActivated: JSON.parse(studentData.status)
      })
    }
    if (studentData.studentId) {
      search.$and.push({
        _id: new mongoose.Types.ObjectId(studentData.studentId)
      })
    }

    if (studentData.schoolId) {
      search.$and.push({
        schoolId: new mongoose.Types.ObjectId(studentData.schoolId)
      })
    }

    if (studentData.gradeId) {
      search.$and.push({
        gradeId: new mongoose.Types.ObjectId(studentData.gradeId)
      })
    }

    if (studentData.search) {
      const searchRegex = new RegExp(studentData.search, 'i')
      search.$and.push({
        $or: [{ studentName: { $regex: searchRegex } }]
      })
    }

    const getTeacherData: Student[] = await this.students.aggregate([
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
        $unwind:
        {
          path: '$school',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind:
        {
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
    ]).facet(
      {
        "data": [
          { $skip: skip },
          { $limit: limit }
        ],
        "count": [
          { $count: "count" }
        ]
      }
    );
    return getTeacherData;
  }

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

export default StudentService;
