import bcrypt from 'bcrypt';
import { CreateUserDto } from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';
import { User } from '../interfaces/users.interface';
import { Role } from '../interfaces/roles.interface';
import userModel from '../models/users.model';
import roleModel from '../models/roles.model'
import { isEmpty } from '../utils/util';
import _ from 'loadsh';
import moment from 'moment';
import mongoose from 'mongoose';

class UserService {
  public users = userModel;
  public roles = roleModel;

  // public async findAllUser(): Promise<User[]> {
  //   const users: User[] = await this.users.find();
  //   return users;
  // }

  public async getUserProfile(user): Promise<User> {
    const findUser: User = await this.users.findOne({ _id: user._id }).select('-password');
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  // public async createUser(userData: CreateUserDto): Promise<User> {
  //   if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

  //   const findUser: User = await this.users.findOne({ email: userData.email });
  //   if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

  //   const hashedPassword = await bcrypt.hash(userData.password, 10);
  //   const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

  //   return createUserData;
  // }

  public async createSchoolUser(schoolAdminData, userData): Promise<User> {
    const findUser: User = await this.users.findOne({ email: schoolAdminData.email, isDeleted: false });
    if (findUser) throw new HttpException(409, `You're email ${schoolAdminData.email} already exists`);
    const roles = await this.roles.find({})
    if (!roles) throw new HttpException(409, `Please insert role`);
    const role = _.find(roles, _.matchesProperty('name', 'School-Admin'));
    if(role.name != 'School-Admin') throw new HttpException(409, `Please insert role for School Admin`);
    schoolAdminData = {...schoolAdminData, password: await bcrypt.hash(schoolAdminData.password, 10)}
    let createUserData: User = await this.users.create({ 
      ...schoolAdminData,
      role: role._id,
      createdBy: userData._id
    })
    
    return createUserData;
  }

  public async updateSchoolUser(schoolAdminId, schoolAdminData, userData): Promise<User> {
    const findschooAdminData: User = await this.users.findOne({ _id: schoolAdminId, isDeleted: false });
    if(!findschooAdminData) {
      throw new HttpException(409, `School Admin not found`);
    }else if(findschooAdminData.isActivated == true){
      throw new HttpException(409, `School Admin is deactivated`);
    }
    if(userData.role['name'] == 'School-Admin'){
      if(schoolAdminId.toString() != userData._id.toString()){
        throw new HttpException(500, `Forbidden`);
      }  
    }
    
    let updateSchoolAdminData: User = await this.users.findByIdAndUpdate(schoolAdminId, { 
      ...schoolAdminData,
      updatedBy: userData._id
    }, {new: true}).select('-password')
    
    return updateSchoolAdminData;
  }

  public async deleteSchoolAdmin(schoolAdminData, userData): Promise<User> {
    const findSchoolAdmin: User = await this.users.findOne({ _id: schoolAdminData.schoolAdminId }).populate('schoolId', 'schoolName');
    if (!findSchoolAdmin) {
      throw new HttpException(409, `School Admin not found`)
    }else if(findSchoolAdmin.isDeleted == true) {
      throw new HttpException(409, `School Admin ${findSchoolAdmin.email} is already deleted`)
    }
    if(findSchoolAdmin.schoolId){
      if(findSchoolAdmin.schoolId['schoolName']){
        throw new HttpException(409, `School Admin not deleted, Please unassign school ${findSchoolAdmin.schoolId['schoolName']}`)
      }
    }
    
    
    const deleteSchoolAdminData: User = await this.users.findByIdAndUpdate(schoolAdminData.schoolAdminId,{
        isDeleted: true,
        deletedBy: userData._id,
        deletedAt: moment().utc().toDate()
    }, {new: true}).select('-password')
    
    return deleteSchoolAdminData;
  }

  public async activateSchoolAdmin(schoolAdminData, userData): Promise<{activateSchoolAdminData: User; statusMode: String;}> {
    const findSchoolAdmin: User = await this.users.findOne({ _id: schoolAdminData.schoolAdminId, isDeleted: false });    
    if(!findSchoolAdmin) throw new HttpException(409, `School Admin not found`);
    let status: Boolean;
    let statusMode: String;
    if(findSchoolAdmin.isActivated === false){
      status = true
      statusMode = 'Deactivated'
    }else{
      status = false
      statusMode = 'Activated'
    }
    const activateSchoolAdminData: User = await this.users.findByIdAndUpdate(schoolAdminData.schoolAdminId,{
      isActivated: status,
      updatedBy: userData._id
    }, {new: true}).select('-password')
    
    return {activateSchoolAdminData, statusMode};
  }

  public async getSchoolAdmin(schoolAdminData): Promise<User[]> {
    const pageNumber = schoolAdminData?.pageNumber || 1;
    const pageSize = schoolAdminData?.pageSize || 100;
    const limit = Number(pageSize);
    const skip = (Number(pageNumber) - 1) * limit;

    const roles = await this.roles.find({})
    if (!roles) throw new HttpException(409, `Please insert role`);
    const role = _.find(roles, _.matchesProperty('name', 'School-Admin'));
    if(role.name != 'School-Admin') throw new HttpException(409, `Please insert role for School Admin`);

    let search = {
      $and: [
        {role: role._id},
        {isDeleted: false}
      ] as any
    };

    if(schoolAdminData.schoolAdminId){
      search.$and.push({
        _id: new mongoose.Types.ObjectId(schoolAdminData.schoolAdminId)
      })
    }
    if(schoolAdminData.status){
      search.$and.push({
        isActivated: JSON.parse(schoolAdminData.status)
      })
    }
    if (schoolAdminData.search) {
      const searchRegex = new RegExp(schoolAdminData.search, 'i') 
      search.$and.push({
        $or: [{firstName: { $regex: searchRegex } },{lastName: { $regex: searchRegex }}] 
      })
    }
    // const createSchoolData: School[] = await this.schools.find(search)
    // if(isEmpty(createSchoolData)) throw new HttpException(409, `School record not found`);
    const getSchoolAdminData: User[] = await this.users.aggregate([
      { $match: search },
      {
        $lookup: {
          from: 'schools',
          localField: 'schoolId',
          foreignField: '_id',
          as: "school"
        }
      },
      {$unset: ['password', '__v',
        'school.__v','school.createdAt', 'school.updatedAt', 'school.createdBy', 'school.updatedBy'
      ]},
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
    
    // if(isEmpty(getSchoolAdminData[0]['data'])) throw new HttpException(409, `School-Admin record not found`);
   
    return getSchoolAdminData;
  }

  public async updateAdminUser(adminId, adminData, userData): Promise<User> {
    const findschooAdminData: User = await this.users.findOne({ _id: adminId });
    if(!findschooAdminData) {
      throw new HttpException(409, `Super-Admin not found`);
    }else if(findschooAdminData.isDeleted == true){
      throw new HttpException(409, `Super-Admin is already deleted`);
    }
    if(findschooAdminData._id.toString() != userData._id.toString()){
      throw new HttpException(500, `Forbidden`);
    }
    
    let updateAdminData: User = await this.users.findByIdAndUpdate(adminId, { 
      firstName: adminData.firstName,
      lastName: adminData.lastName,
      countryCode: adminData.countryCode,
      phoneNumber: adminData.phoneNumber,
      updatedBy: userData._id
    }, {new: true}).select('-password')
    
    return updateAdminData;
  }

  public async getAdminUser(adminId, userData): Promise<User> {
    if(userData._id.toString() != adminId.toString()){
      throw new HttpException(500, `Forbidden`);
    }
    const getAdminData: User = await this.users.findById(adminId).select('-password -__v')   
    return getAdminData;
  }

  // public async createRole(userData): Promise<Role> {
  //   const createUserData = await this.roles.create(userData);

  //   return createUserData;
  // }

  // public async updateUser(userId: string, userData: CreateUserDto): Promise<User> {
  //   if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

  //   if (userData.email) {
  //     const findUser: User = await this.users.findOne({ email: userData.email });
  //     if (findUser && findUser._id != userId) throw new HttpException(409, `You're email ${userData.email} already exists`);
  //   }

  //   if (userData.password) {
  //     const hashedPassword = await bcrypt.hash(userData.password, 10);
  //     userData = { ...userData, password: hashedPassword };
  //   }

  //   const updateUserById: User = await this.users.findByIdAndUpdate(userId, { userData });
  //   if (!updateUserById) throw new HttpException(409, "You're not user");

  //   return updateUserById;
  // }

  // public async deleteUser(userId: string): Promise<User> {
  //   const deleteUserById: User = await this.users.findByIdAndDelete(userId);
  //   if (!deleteUserById) throw new HttpException(409, "You're not user");

  //   return deleteUserById;
  // }
}

export default UserService;
