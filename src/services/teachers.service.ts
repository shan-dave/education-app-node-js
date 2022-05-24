import { isEmpty } from '../utils/util';
import HttpException from '../exceptions/HttpException';
import { Teacher } from '../interfaces/teachers.interface';
import { User } from '../interfaces/users.interface';
import userModel from '../models/users.model';
import { Role } from '../interfaces/roles.interface';
import roleModel from '../models/roles.model';
import teachersModel from '../models/teachers.model';
import moment from 'moment';
import _ from 'loadsh';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

class TeacherService {
  public teachers = teachersModel;
  public users = userModel;
  public roles = roleModel;

  public async createTeacher(teacherData, userData): Promise<{ createUserData: User; createTeacherData: Teacher; }> {
    const roles = await this.roles.find({})
    if (!roles) throw new HttpException(409, `Please insert role`);
    const role = _.find(roles, _.matchesProperty('name', 'Teacher'));
    if (role.name != 'Teacher') throw new HttpException(409, `Please insert role for Teacher`);

    const findUser: User = await this.users.findOne({ email: teacherData.email, isDeleted: false });
    const findEdId: Teacher = await this.teachers.findOne({ edId: teacherData.edId, isDeleted: false });
    if (findUser) throw new HttpException(409, `email "${teacherData.email}" already exists`);
    else if (findEdId) throw new HttpException(409, `ED Id "${teacherData.edId}" already exists`);
    const createUserData: User = await this.users.create({
      firstName: teacherData.firstName,
      lastName: teacherData.lastName,
      countryCode: teacherData.countryCode,
      phoneNumber: teacherData.phoneNumber,
      email: teacherData.email,
      password: await bcrypt.hash(teacherData.password, 10),
      role: role._id,
      schoolId: teacherData.schoolId,
      districtId: teacherData.districtId,
      createdBy: userData._id
    })

    const createTeacherData: Teacher = await this.teachers.create({
      endorsementId: teacherData.endorsementId,
      gradeIds: teacherData.gradeIds,
      firstName: teacherData.firstName,
      edId: teacherData.edId,
      lastName: teacherData.lastName,
      schoolId: teacherData.schoolId,
      userId: createUserData._id,
      addressLine1: teacherData.addressLine1,
      addressLine2: teacherData.addressLine2,
      districtId: teacherData.districtId,
      stateId: teacherData.stateId,
      country: teacherData.country,
      dateOfBirth: teacherData.dateOfBirth
    })

    return { createUserData, createTeacherData };
  }

  public async updateTeacher(teacherId, teacherData, userData): Promise<{ updateUserData: User; updateTeacherData: Teacher; }> {
    const findTeacher: Teacher = await this.teachers.findOne({ _id: teacherId, isDeleted: false }).populate({
      path: 'userId',
      select: { password: 0 },
      populate: { path: 'role' }
    })
    const findUser: User = await this.users.findOne({ _id: userData._id, isDeleted: false }).populate({
      path: 'role'
    }).select('-password')
    if (!findTeacher) {
      throw new HttpException(409, `Teacher not found`);
    } else if (findTeacher.isActivated == true) {
      throw new HttpException(409, `Teacher is Deactivated`);
    }
    if (findUser.role['name'] == 'School-Admin' || findUser.role['name'] == 'School-Sub-Admin') {
      if (findUser.schoolId.toString() != findTeacher.schoolId.toString()) {
        throw new HttpException(409, `This teacher is not belongs to your school`);
      }
    }

    if (findUser.role['name'] == 'Teacher') {
      if (findUser._id.toString() != teacherId.toString()) {
        throw new HttpException(500, `Forbidden`);
      }
    }

    const updateTeacherData: Teacher = await this.teachers.findByIdAndUpdate(teacherId, {
      firstName: teacherData.firstName,
      lastName: teacherData.lastName,
      gradeIds: teacherData.gradeIds,
      addressLine1: teacherData.addressLine1,
      addressLine2: teacherData.addressLine2,
      districtId: teacherData.districtId,
      stateId: teacherData.stateId,
      country: teacherData.country,
      dateOfBirth: teacherData.dateOfBirth,
      updatedBy: userData._id
    }, { new: true }).populate('districtId').populate('stateId').populate('schoolId').populate('endorsementId')

    const updateUserData: User = await this.users.findByIdAndUpdate(updateTeacherData.userId['_id'], {
      firstName: teacherData.firstName,
      lastName: teacherData.lastName,
      countryCode: teacherData.countryCode,
      phoneNumber: teacherData.phoneNumber,
      updatedBy: userData._id
    }, { new: true }).select('-password')

    return { updateUserData, updateTeacherData };
  }

  public async deleteTeacher(teacherId, userData): Promise<{ deleteTeacherUserData: User; deleteTeacherData: Teacher; }> {
    const findTeacher: Teacher = await this.teachers.findOne({ _id: teacherId, isDeleted: false }).populate({
      path: 'userId',
      select: { password: 0 },
      populate: { path: 'role' }
    })
    const findUser: User = await this.users.findOne({ _id: userData._id, isDeleted: false }).populate({
      path: 'role'
    }).select('-password')
    if (!findTeacher) {
      throw new HttpException(409, `Teacher not found`);
    } else if (findTeacher?.isDeleted == true) {
      throw new HttpException(409, `Teacher ${findTeacher.userId['firstName']} ${findTeacher.userId['lastName']} is already deleted`)
    }

    if (findUser.role['name'] == 'School-Admin' || findUser.role['name'] == 'School-Sub-Admin') {
      if (findUser.schoolId.toString() != findTeacher.schoolId.toString()) {
        throw new HttpException(409, `This teacher is not belongs to your school`);
      }
    }

    const deleteTeacherData: Teacher = await this.teachers.findByIdAndUpdate(teacherId, {
      isDeleted: true,
      deletedBy: userData._id,
      deletedAt: moment().utc().toDate()
    }, { new: true })

    const deleteTeacherUserData: User = await this.users.findByIdAndUpdate(deleteTeacherData.userId['_id'], {
      isDeleted: true,
      deletedBy: userData._id,
      deletedAt: moment().utc().toDate()
    }, { new: true }).select('-password')

    return { deleteTeacherUserData, deleteTeacherData };
  }

  public async acivateTeacher(teacherId, userData): Promise<{ activateTeacherData: Teacher; activateTeacherUserData: User; statusMode: String; }> {
    const findTeacher: Teacher = await this.teachers.findOne({ _id: teacherId, isDeleted: false }).populate({
      path: 'userId',
      select: { password: 0 },
      populate: { path: 'role' }
    })
    const findUser: User = await this.users.findOne({ _id: userData._id, isDeleted: false }).populate({
      path: 'role'
    }).select('-password')

    if (!findTeacher) {
      throw new HttpException(409, `Teacher not found`);
    }

    if (findUser.role['name'] == 'School-Admin' || findUser.role['name'] == 'School-Sub-Admin') {
      if (findUser.schoolId.toString() != findTeacher.schoolId.toString()) {
        throw new HttpException(409, `This teacher is not belongs to your school`);
      }
    }
    let status: Boolean;
    let statusMode: String;
    if (findTeacher.isActivated === false) {
      status = true
      statusMode = 'Deactivated'
    } else {
      status = false
      statusMode = 'Activated'
    }
    const activateTeacherData: Teacher = await this.teachers.findByIdAndUpdate(teacherId, {
      isActivated: status,
      updatedBy: userData._id
    }, { new: true })

    const activateTeacherUserData: User = await this.users.findByIdAndUpdate(activateTeacherData.userId['_id'], {
      isActivated: status,
      updatedBy: userData._id
    }, { new: true }).select('-password')

    return { activateTeacherData, activateTeacherUserData, statusMode };
  }

  public async getTeacher(teacherData): Promise<Teacher[]> {
    const pageNumber = teacherData?.pageNumber || 1;
    const pageSize = teacherData?.pageSize || 100;
    const limit = Number(pageSize);
    const skip = (Number(pageNumber) - 1) * limit;
    let search = {
      $and: [{ isDeleted: false }] as any
    };
    if (teacherData.status) {
      search.$and.push({
        isActivated: JSON.parse(teacherData.status)
      })
    }
    if (teacherData.stateId) {
      search.$and.push({
        stateId: new mongoose.Types.ObjectId(teacherData.stateId)
      })
    }

    if (teacherData.districtId) {
      search.$and.push({
        districtId: new mongoose.Types.ObjectId(teacherData.districtId)
      })
    }

    if (teacherData.schoolId) {
      search.$and.push({
        schoolId: new mongoose.Types.ObjectId(teacherData.schoolId)
      })
    }
    if (teacherData.id) {
      search.$and.push({
        _id: new mongoose.Types.ObjectId(teacherData.id)
      })
    }
    if (teacherData.edId) {
      search.$and.push({
        edId: teacherData.edId
      })
    }

    if (teacherData.endorsementId) {
      let endorsementIds = []
      for (const endorsementId of teacherData.endorsementId) {
        endorsementIds.push(new mongoose.Types.ObjectId(endorsementId))
      }
      search.$and.push({
        endorsementId: { $in: endorsementIds }
      })
    }
    if (teacherData.gradeId) {
      search.$and.push({
        gradeIds: { $in: [new mongoose.Types.ObjectId(teacherData.gradeId)] }
      })
    }

    if (teacherData.search) {
      const searchRegex = new RegExp(teacherData.search, 'i')
      search.$and.push({
        $or: [{ firstName: { $regex: searchRegex } }, { lastName: { $regex: searchRegex } }]
      })
    }
    const getTeacherData: Teacher[] = await this.teachers.aggregate([
      { $match: search },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: "users"
        }
      },
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
          from: 'districts',
          localField: 'districtId',
          foreignField: '_id',
          as: "district"
        }
      },
      {
        $lookup: {
          from: 'states',
          localField: 'stateId',
          foreignField: '_id',
          as: "state"
        }
      },
      {
        $lookup: {
          from: 'endorsements',
          localField: 'endorsementId',
          foreignField: '_id',
          as: "endorsement"
        }
      },
      {
        $lookup: {
          from: 'grades',
          localField: 'gradeIds',
          foreignField: '_id',
          as: "grade"
        }
      },
      {
        $unset: ['users.password', '__v', 'users.__v', 'users.createdAt', 'users.updatedAt', 'users.role', 'users.createdBy', 'users.updatedBy',
          'state.__v', 'state.createdAt', 'state.updatedAt', 'state.role', 'state.createdBy', 'state.updatedBy',
          'district.__v', 'district.createdAt', 'district.updatedAt', 'district.createdBy', 'district.updatedBy',
          'endorsement.__v', 'endorsement.createdAt', 'endorsement.updatedAt', 'endorsement.createdBy', 'endorsement.updatedBy',
          'grade.__v', 'grade.createdAt', 'grade.updatedAt', 'grade.createdBy', 'grade.updatedBy',
          'school.__v', 'school.createdAt', 'school.updatedAt', 'school.createdBy', 'school.updatedBy'
        ]
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
}

export default TeacherService;
