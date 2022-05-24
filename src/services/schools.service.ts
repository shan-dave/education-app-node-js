import { isEmpty } from '../utils/util';
import HttpException from '../exceptions/HttpException';
import { School } from '../interfaces/schools.interface';
import { User } from '../interfaces/users.interface';
import schoolModel from '../models/schools.model';
import userModel from '../models/users.model';
import roleModel from '../models/roles.model';
import moment from 'moment';
import _ from 'loadsh';
import mongoose from 'mongoose'
import bcrypt from 'bcrypt';
class SchoolService {
  public schools = schoolModel;
  public users = userModel;
  public roles = roleModel;

  public async createSchool(schoolData, userData): Promise<School> {

    const createSchoolData: School = await this.schools.create({
      ...schoolData,
      createdBy: userData._id
    })

    return createSchoolData;
  }

  public async assignSchoolToUser(schoolData, userData): Promise<{ assignUserData: User; schoolIsVerify: School; }> {
    const roles = await this.roles.find({})
    if (!roles) throw new HttpException(409, `Please insert role`);
    const role = _.find(roles, _.matchesProperty('name', 'School-Admin'));
    const findUserData: User = await (await this.users.findOne({ _id: schoolData.userId, isDeleted: false })).populate('role', 'name');
    if (!findUserData) {
      throw new HttpException(409, `User not found`)
    } else if (findUserData.role.toString() !== role._id.toString()) {
      throw new HttpException(409, `School is only assign to school admin user. this user is not a school admin`);
    } else if (findUserData.schoolId) {
      throw new HttpException(409, `School already assign to ${findUserData.firstName} ${findUserData.lastName}`);
    }
    const findschoolData: School = await this.schools.findOne({ _id: schoolData.schoolId, isDeleted: false });
    if (!findschoolData) throw new HttpException(409, `School not found`);
    const findUser: User = await (await this.users.findOne({ role: role._id, schoolId: schoolData.schoolId, isDeleted: false }).populate('schoolId', 'schoolName'));
    if (findUser) throw new HttpException(409, `School "${findUser.schoolId['schoolName']}" is already assign to "${findUser.email}" email`);
    const userId = {
      _id: schoolData.userId
    }
    const updateQuery = {
      schoolId: schoolData.schoolId,
      updatedBy: userData._id
    }

    const option = {
      new: true
    }
    const assignUserData: User = await this.users.findByIdAndUpdate(userId, updateQuery, option)
    const schoolId = {
      _id: schoolData.schoolId
    }
    const schoolUpdatequery = {
      _id: schoolData.schoolId,
      isAssigned: true,
      updatedBy: userData._id
    }
    const schoolIsVerify: School = await this.schools.findByIdAndUpdate(schoolId, schoolUpdatequery, option)

    return { assignUserData, schoolIsVerify };
  }

  public async unassignSchoolToUser(schoolData, userData): Promise<{ assignUserData: User; schoolIsVerify: School; }> {
    const roles = await this.roles.find({})
    if (!roles) throw new HttpException(409, `Please insert role`);
    const role = _.find(roles, _.matchesProperty('name', 'School-Admin'));

    const findUserData: User = await this.users.findOne({ _id: schoolData.userId, isDeleted: false }).populate('role', 'name');
    if (!findUserData) {
      throw new HttpException(409, `User not found`)
    } else if (findUserData.role.toString() !== role._id.toString()) {
      throw new HttpException(409, `School is only assign to school admin user. this user is not a school admin`);
    } else if (!findUserData.schoolId) {
      throw new HttpException(409, `School is not assign to ${findUserData.firstName} ${findUserData.lastName}`);
    }

    const findschoolData: School = await this.schools.findOne({ _id: schoolData.schoolId, isDeleted: false });
    if (!findschoolData) throw new HttpException(409, `School not found`);

    const userId = {
      _id: schoolData.userId
    }
    const updateQuery = {
      schoolId: null,
      updatedBy: userData._id
    }
    const option = {
      new: true
    }
    const assignUserData: User = await this.users.findByIdAndUpdate(userId, updateQuery, option)
    const schoolId = {
      _id: schoolData.schoolId
    }
    const schoolUpdatequery = {
      _id: schoolData.schoolId,
      isAssigned: false,
      updatedBy: userData._id
    }
    const schoolIsVerify: School = await this.schools.findByIdAndUpdate(schoolId, schoolUpdatequery, option)

    return { assignUserData, schoolIsVerify };
  }

  public async getSchool(schoolData): Promise<School[]> {
    const pageNumber = schoolData?.pageNumber || 1;
    const pageSize = schoolData?.pageSize || 100;
    const limit = Number(pageSize);
    const skip = (Number(pageNumber) - 1) * limit;
    const roles = await this.roles.find({})
    if (!roles) throw new HttpException(409, `Please insert role`);
    const role = _.find(roles, _.matchesProperty('name', 'School-Admin'));
    let search = {
      $and: [
        { isDeleted: false }
      ] as any
    };

    // if(schoolData.isAssigned){
    //   search.$and.push({
    //     isAssigned: JSON.parse(schoolData.isAssigned)
    //   })
    // }
    if (schoolData.schoolId) {
      search.$and.push({
        _id: new mongoose.Types.ObjectId(schoolData.schoolId)
      })
    }
    // if(schoolData.country){
    //   search.$and.push({
    //     country: mongoose.Types.ObjectId(schoolData.country)
    //   })
    // }

    if (schoolData.districtId) {
      search.$and.push({
        districtId: new mongoose.Types.ObjectId(schoolData.districtId)
      })
    }

    if (schoolData.stateId) {
      search.$and.push({
        stateId: new mongoose.Types.ObjectId(schoolData.stateId)
      })
    }
    if (schoolData.search) {
      const searchRegex = new RegExp(schoolData.search, 'i')
      search.$and.push({
        schoolName: { $regex: searchRegex }
      })
    }
    const getSchoolData: School[] = await this.schools.aggregate([
      { $match: search },
      {
        $lookup: {
          from: 'users',
          let: {
            schoolId: '$_id'
          },
          pipeline: [{
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$role", new mongoose.Types.ObjectId(role._id)] },
                  { $eq: ["$schoolId", "$$schoolId"] },
                  
                ]
              }
            }
          },
          ],
          as: 'users'
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
          from: 'districts',
          localField: 'districtId',
          foreignField: '_id',
          as: "district"
        }
      },
      {
        $unset: ['users.password', '__v', 'users.__v', 'users.createdAt', 'users.updatedAt', 'users.role', 'users.createdBy', 'users.updatedBy',
          'state.__v', 'state.createdAt', 'state.updatedAt', 'state.role', 'state.createdBy', 'state.updatedBy',
          'city.__v', 'city.createdAt', 'city.updatedAt', 'city.role', 'city.createdBy', 'city.updatedBy',
          'country.__v', 'country.createdAt', 'country.updatedAt', 'country.role', 'country.createdBy', 'country.updatedBy'
        ]
      },
    ]).facet(
      {
        "data": [
          // { $sort: sortBy },.
          { $skip: skip },
          { $limit: limit }
        ],
        "schoolCount": [
          { $count: "count" }
        ]
      }
    );

    return getSchoolData;
  }

  public async deleteSchool(schoolData, userData): Promise<School> {
    const findSchool: School = await this.schools.findOne({ _id: schoolData.schoolId });
    if (!findSchool) {
      throw new HttpException(409, `School not found`);
    }
    else if (findSchool?.isDeleted == true) {
      throw new HttpException(409, `School ${findSchool.schoolName} is already deleted`)
    }
    const deleteschoolData: School = await this.schools.findByIdAndUpdate(schoolData.schoolId, {
      isDeleted: true,
      deletedBy: userData._id,
      deletedAt: moment().utc().toDate()
    }, { new: true })

    return deleteschoolData;
  }

  public async activateSchool(schoolData, userData): Promise<School> {
    const findSchool: School = await this.schools.findOne({ _id: schoolData.schoolId });
    if (!findSchool) {
      throw new HttpException(409, `School not found`);
    }
    else if (findSchool?.isDeleted == false) {
      throw new HttpException(409, `School ${findSchool.schoolName} is already activated`)
    }
    const activateSchoolData: School = await this.schools.findByIdAndUpdate(schoolData.schoolId, {
      isDeleted: false,
      updatedBy: userData._id
    }, { new: true })

    return activateSchoolData;
  }

  public async updateSchool(schoolId, schoolData, userData): Promise<School> {
    const findschoolData: School = await this.schools.findOne({ _id: schoolId });
    if (!findschoolData) {
      throw new HttpException(409, `School not found`);
    } else if (findschoolData?.isDeleted == true) {
      throw new HttpException(409, `School ${findschoolData.schoolName} is already deleted`);
    }
    const updateSchoolData: School = await this.schools.findByIdAndUpdate(schoolId, {
      ...schoolData,
      updatedBy: userData._id
    }, { new: true })

    return updateSchoolData;
  }

  public async createSchoolSubAdmin(schoolSubAdminData, userData): Promise<User> {
    const findUser: User = await this.users.findOne({ email: schoolSubAdminData.email, isDeleted: false });
    const find: User = await this.users.findOne({ email: schoolSubAdminData.email, isDeleted: false });
    if (findUser) throw new HttpException(409, `You're email ${schoolSubAdminData.email} already exists`);
    const roles = await this.roles.find({})
    if (!roles) throw new HttpException(409, `Please insert role`);
    const role = _.find(roles, _.matchesProperty('name', 'School-Sub-Admin'));
    if (role.name != 'School-Sub-Admin') throw new HttpException(409, `Please insert role for School Admin`);
    const checkSchoolSubAdmin: User = await this.users.findOne({ role: role._id, isDeleted: false, schoolId: schoolSubAdminData.schoolId });
    if (checkSchoolSubAdmin) throw new HttpException(409, `Already created sub admin for this school`);

    schoolSubAdminData = { ...schoolSubAdminData, password: await bcrypt.hash(schoolSubAdminData.password, 10), role: role._id, createdBy: userData._id }
    let createUserData: User = await this.users.create(schoolSubAdminData)

    return createUserData;
  }

  public async updateSchoolSubAdmin(schoolSubAdminId, schoolSubAdminData, userData): Promise<User> {
    const findschooAdminData: User = await this.users.findOne({ _id: schoolSubAdminId, isDeleted: false });
    const roles = await this.roles.find({})
    if (!roles) throw new HttpException(409, `Please insert role`);
    const role = _.find(roles, _.matchesProperty('name', 'School-Sub-Admin'));
    if (!findschooAdminData) {
      throw new HttpException(409, `School-Sub-Admin not found`);
    } else if (findschooAdminData?.isActivated == true) {
      throw new HttpException(409, `School-Sub-Admin is Deactivated`);
    } else if (findschooAdminData?.role == role._id) {
      throw new HttpException(409, `This user is not a school-sub-admin`);
    }
    let updateScoolSubAdminData: User = await this.users.findByIdAndUpdate(schoolSubAdminId, {
      firstName: schoolSubAdminData.firstName,
      lastName: schoolSubAdminData.lastName,
      countryCode: schoolSubAdminData.countryCode,
      phoneNumber: schoolSubAdminData.phoneNumber,
      updatedBy: userData._id
    }, { new: true }).select('-password')

    return updateScoolSubAdminData;
  }

  public async deleteSchoolSubAdmin(schoolSubAdminData, userData): Promise<User> {
    const roles = await this.roles.find({})
    if (!roles) throw new HttpException(409, `Please insert role`);
    const role = _.find(roles, _.matchesProperty('name', 'School-Sub-Admin'));
    const findSchoolSubAdmin: User = await this.users.findOne({ _id: schoolSubAdminData.schoolSubAdminId });
    if (!findSchoolSubAdmin) {
      throw new HttpException(409, `School-Sub-Admin not found`);
    } else if (findSchoolSubAdmin?.isDeleted == true) {
      throw new HttpException(409, `School-Sub-Admin ${findSchoolSubAdmin.email} is already deleted`)
    } else if (findSchoolSubAdmin?.role == role._id) {
      throw new HttpException(409, `This user is not a school-sub-admin`);
    }
    const deleteSchoolAdminData: User = await this.users.findByIdAndUpdate(schoolSubAdminData.schoolSubAdminId, {
      isDeleted: true,
      deletedBy: userData._id,
      deletedAt: moment().utc().toDate()
    }, { new: true }).select('-password')

    return deleteSchoolAdminData;
  }

  public async activateSchoolSubAdmin(schoolSubAdminData, userData): Promise<{ activateSchoolAdminData: User; statusMode: String; }> {
    const roles = await this.roles.find({})
    if (!roles) throw new HttpException(409, `Please insert role`);
    const role = _.find(roles, _.matchesProperty('name', 'School-Sub-Admin'));
    const findSchoolSubAdmin: User = await this.users.findOne({ _id: schoolSubAdminData.schoolSubAdminId, isDeleted: false });
    if (!findSchoolSubAdmin) {
      throw new HttpException(409, `School-Sub-Admin not found`);
    } else if (findSchoolSubAdmin?.role == role._id) {
      throw new HttpException(409, `This user is not a school-sub-admin`);
    }
    let status: Boolean;
    let statusMode: String;
    if (findSchoolSubAdmin.isActivated === false) {
      status = true
      statusMode = 'Deactivated'
    } else {
      status = false
      statusMode = 'Activated'
    }
    const activateSchoolAdminData: User = await this.users.findByIdAndUpdate(schoolSubAdminData.schoolSubAdminId, {
      isActivated: status,
      updatedBy: userData._id
    }, { new: true })

    return { activateSchoolAdminData, statusMode };
  }

  public async getSchoolSubAdmin(schoolSubAdminData): Promise<User[]> {
    const pageNumber = schoolSubAdminData?.pageNumber || 1;
    const pageSize = schoolSubAdminData?.pageSize || 100;
    const limit = Number(pageSize);
    const skip = (Number(pageNumber) - 1) * limit;
    const roles = await this.roles.find({})
    if (!roles) throw new HttpException(409, `Please insert role`);
    const role = _.find(roles, _.matchesProperty('name', 'School-Sub-Admin'));

    if (role?.name != 'School-Sub-Admin') throw new HttpException(409, `Please insert role for School Admin`);
    let search = {
      $and: [
        { role: role._id },
        { isDeleted: false }
      ] as any
    };
    if (schoolSubAdminData.schoolId) {
      search.$and.push({
        schoolId: new mongoose.Types.ObjectId(schoolSubAdminData.schoolId)
      })
    }
    if (schoolSubAdminData.status) {
      search.$and.push({
        isActivated: JSON.parse(schoolSubAdminData.status)
      })
    }
    if (schoolSubAdminData.schoolSubAdminId) {
      search.$and.push({
        _id: new mongoose.Types.ObjectId(schoolSubAdminData.schoolSubAdminId)
      })
    }
    if (schoolSubAdminData.search) {
      const searchRegex = new RegExp(schoolSubAdminData.search, 'i')
      search.$and.push({
        $or: [{ firstName: { $regex: searchRegex } }, { lastName: { $regex: searchRegex } }]
      })
    }
    const getSchoolSubAdminData: User[] = await this.users.aggregate([
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
        $unset: ['password', '__v',
          'school.__v', 'school.createdAt', 'school.updatedAt', 'school.createdBy', 'school.updatedBy'
        ]
      },
    ]).facet(
      {
        "data": [
          // { $sort: sortBy },
          { $skip: skip },
          { $limit: limit }
        ],
        "count": [
          { $count: "count" }
        ]
      }
    );

    // if(isEmpty(getSchoolSubAdminData[0]['data'])) throw new HttpException(409, `School-Sub-Admin record not found`);

    return getSchoolSubAdminData;
  }
}

export default SchoolService;
