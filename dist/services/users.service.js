"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const HttpException_1 = tslib_1.__importDefault(require("../exceptions/HttpException"));
const users_model_1 = tslib_1.__importDefault(require("../models/users.model"));
const roles_model_1 = tslib_1.__importDefault(require("../models/roles.model"));
const loadsh_1 = tslib_1.__importDefault(require("loadsh"));
const moment_1 = tslib_1.__importDefault(require("moment"));
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
class UserService {
    constructor() {
        this.users = users_model_1.default;
        this.roles = roles_model_1.default;
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
    // public async findAllUser(): Promise<User[]> {
    //   const users: User[] = await this.users.find();
    //   return users;
    // }
    async getUserProfile(user) {
        const findUser = await this.users.findOne({ _id: user._id }).select('-password');
        if (!findUser)
            throw new HttpException_1.default(409, "You're not user");
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
    async createSchoolUser(schoolAdminData, userData) {
        const findUser = await this.users.findOne({ email: schoolAdminData.email, isDeleted: false });
        if (findUser)
            throw new HttpException_1.default(409, `You're email ${schoolAdminData.email} already exists`);
        const roles = await this.roles.find({});
        if (!roles)
            throw new HttpException_1.default(409, `Please insert role`);
        const role = loadsh_1.default.find(roles, loadsh_1.default.matchesProperty('name', 'School-Admin'));
        if (role.name != 'School-Admin')
            throw new HttpException_1.default(409, `Please insert role for School Admin`);
        schoolAdminData = Object.assign(Object.assign({}, schoolAdminData), { password: await bcrypt_1.default.hash(schoolAdminData.password, 10) });
        let createUserData = await this.users.create(Object.assign(Object.assign({}, schoolAdminData), { role: role._id, createdBy: userData._id }));
        return createUserData;
    }
    async updateSchoolUser(schoolAdminId, schoolAdminData, userData) {
        const findschooAdminData = await this.users.findOne({ _id: schoolAdminId, isDeleted: false });
        if (!findschooAdminData) {
            throw new HttpException_1.default(409, `School Admin not found`);
        }
        else if (findschooAdminData.isActivated == true) {
            throw new HttpException_1.default(409, `School Admin is deactivated`);
        }
        if (userData.role['name'] == 'School-Admin') {
            if (schoolAdminId.toString() != userData._id.toString()) {
                throw new HttpException_1.default(500, `Forbidden`);
            }
        }
        let updateSchoolAdminData = await this.users.findByIdAndUpdate(schoolAdminId, Object.assign(Object.assign({}, schoolAdminData), { updatedBy: userData._id }), { new: true }).select('-password');
        return updateSchoolAdminData;
    }
    async deleteSchoolAdmin(schoolAdminData, userData) {
        const findSchoolAdmin = await this.users.findOne({ _id: schoolAdminData.schoolAdminId }).populate('schoolId', 'schoolName');
        if (!findSchoolAdmin) {
            throw new HttpException_1.default(409, `School Admin not found`);
        }
        else if (findSchoolAdmin.isDeleted == true) {
            throw new HttpException_1.default(409, `School Admin ${findSchoolAdmin.email} is already deleted`);
        }
        if (findSchoolAdmin.schoolId) {
            if (findSchoolAdmin.schoolId['schoolName']) {
                throw new HttpException_1.default(409, `School Admin not deleted, Please unassign school ${findSchoolAdmin.schoolId['schoolName']}`);
            }
        }
        const deleteSchoolAdminData = await this.users.findByIdAndUpdate(schoolAdminData.schoolAdminId, {
            isDeleted: true,
            deletedBy: userData._id,
            deletedAt: moment_1.default().utc().toDate()
        }, { new: true }).select('-password');
        return deleteSchoolAdminData;
    }
    async activateSchoolAdmin(schoolAdminData, userData) {
        const findSchoolAdmin = await this.users.findOne({ _id: schoolAdminData.schoolAdminId, isDeleted: false });
        if (!findSchoolAdmin)
            throw new HttpException_1.default(409, `School Admin not found`);
        let status;
        let statusMode;
        if (findSchoolAdmin.isActivated === false) {
            status = true;
            statusMode = 'Deactivated';
        }
        else {
            status = false;
            statusMode = 'Activated';
        }
        const activateSchoolAdminData = await this.users.findByIdAndUpdate(schoolAdminData.schoolAdminId, {
            isActivated: status,
            updatedBy: userData._id
        }, { new: true }).select('-password');
        return { activateSchoolAdminData, statusMode };
    }
    async getSchoolAdmin(schoolAdminData) {
        const pageNumber = (schoolAdminData === null || schoolAdminData === void 0 ? void 0 : schoolAdminData.pageNumber) || 1;
        const pageSize = (schoolAdminData === null || schoolAdminData === void 0 ? void 0 : schoolAdminData.pageSize) || 100;
        const limit = Number(pageSize);
        const skip = (Number(pageNumber) - 1) * limit;
        const roles = await this.roles.find({});
        if (!roles)
            throw new HttpException_1.default(409, `Please insert role`);
        const role = loadsh_1.default.find(roles, loadsh_1.default.matchesProperty('name', 'School-Admin'));
        if (role.name != 'School-Admin')
            throw new HttpException_1.default(409, `Please insert role for School Admin`);
        let search = {
            $and: [
                { role: role._id },
                { isDeleted: false }
            ]
        };
        if (schoolAdminData.schoolAdminId) {
            search.$and.push({
                _id: new mongoose_1.default.Types.ObjectId(schoolAdminData.schoolAdminId)
            });
        }
        if (schoolAdminData.status) {
            search.$and.push({
                isActivated: JSON.parse(schoolAdminData.status)
            });
        }
        if (schoolAdminData.search) {
            const searchRegex = new RegExp(schoolAdminData.search, 'i');
            search.$and.push({
                $or: [{ firstName: { $regex: searchRegex } }, { lastName: { $regex: searchRegex } }]
            });
        }
        // const createSchoolData: School[] = await this.schools.find(search)
        // if(isEmpty(createSchoolData)) throw new HttpException(409, `School record not found`);
        const getSchoolAdminData = await this.users.aggregate([
            { $match: search },
            {
                $lookup: {
                    from: 'schools',
                    localField: 'schoolId',
                    foreignField: '_id',
                    as: "school"
                }
            },
            { $unset: ['password', '__v',
                    'school.__v', 'school.createdAt', 'school.updatedAt', 'school.createdBy', 'school.updatedBy'
                ] },
        ]).facet({
            "data": [
                // { $sort: sortBy },
                { $skip: skip },
                { $limit: limit }
            ],
            "count": [
                { $count: "count" }
            ]
        });
        // if(isEmpty(getSchoolAdminData[0]['data'])) throw new HttpException(409, `School-Admin record not found`);
        return getSchoolAdminData;
    }
    async updateAdminUser(adminId, adminData, userData) {
        const findschooAdminData = await this.users.findOne({ _id: adminId });
        if (!findschooAdminData) {
            throw new HttpException_1.default(409, `Super-Admin not found`);
        }
        else if (findschooAdminData.isDeleted == true) {
            throw new HttpException_1.default(409, `Super-Admin is already deleted`);
        }
        if (findschooAdminData._id.toString() != userData._id.toString()) {
            throw new HttpException_1.default(500, `Forbidden`);
        }
        let updateAdminData = await this.users.findByIdAndUpdate(adminId, {
            firstName: adminData.firstName,
            lastName: adminData.lastName,
            countryCode: adminData.countryCode,
            phoneNumber: adminData.phoneNumber,
            updatedBy: userData._id
        }, { new: true }).select('-password');
        return updateAdminData;
    }
    async getAdminUser(adminId, userData) {
        if (userData._id.toString() != adminId.toString()) {
            throw new HttpException_1.default(500, `Forbidden`);
        }
        const getAdminData = await this.users.findById(adminId).select('-password -__v');
        return getAdminData;
    }
}
exports.default = UserService;
//# sourceMappingURL=users.service.js.map