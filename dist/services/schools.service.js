"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const HttpException_1 = tslib_1.__importDefault(require("../exceptions/HttpException"));
const schools_model_1 = tslib_1.__importDefault(require("../models/schools.model"));
const users_model_1 = tslib_1.__importDefault(require("../models/users.model"));
const roles_model_1 = tslib_1.__importDefault(require("../models/roles.model"));
const moment_1 = tslib_1.__importDefault(require("moment"));
const loadsh_1 = tslib_1.__importDefault(require("loadsh"));
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
class SchoolService {
    constructor() {
        this.schools = schools_model_1.default;
        this.users = users_model_1.default;
        this.roles = roles_model_1.default;
    }
    async createSchool(schoolData, userData) {
        const createSchoolData = await this.schools.create(Object.assign(Object.assign({}, schoolData), { createdBy: userData._id }));
        return createSchoolData;
    }
    async assignSchoolToUser(schoolData, userData) {
        const roles = await this.roles.find({});
        if (!roles)
            throw new HttpException_1.default(409, `Please insert role`);
        const role = loadsh_1.default.find(roles, loadsh_1.default.matchesProperty('name', 'School-Admin'));
        const findUserData = await (await this.users.findOne({ _id: schoolData.userId, isDeleted: false })).populate('role', 'name');
        if (!findUserData) {
            throw new HttpException_1.default(409, `User not found`);
        }
        else if (findUserData.role.toString() !== role._id.toString()) {
            throw new HttpException_1.default(409, `School is only assign to school admin user. this user is not a school admin`);
        }
        else if (findUserData.schoolId) {
            throw new HttpException_1.default(409, `School already assign to ${findUserData.firstName} ${findUserData.lastName}`);
        }
        const findschoolData = await this.schools.findOne({ _id: schoolData.schoolId, isDeleted: false });
        if (!findschoolData)
            throw new HttpException_1.default(409, `School not found`);
        const findUser = await (await this.users.findOne({ role: role._id, schoolId: schoolData.schoolId, isDeleted: false }).populate('schoolId', 'schoolName'));
        if (findUser)
            throw new HttpException_1.default(409, `School "${findUser.schoolId['schoolName']}" is already assign to "${findUser.email}" email`);
        const userId = {
            _id: schoolData.userId
        };
        const updateQuery = {
            schoolId: schoolData.schoolId,
            updatedBy: userData._id
        };
        const option = {
            new: true
        };
        const assignUserData = await this.users.findByIdAndUpdate(userId, updateQuery, option);
        const schoolId = {
            _id: schoolData.schoolId
        };
        const schoolUpdatequery = {
            _id: schoolData.schoolId,
            isAssigned: true,
            updatedBy: userData._id
        };
        const schoolIsVerify = await this.schools.findByIdAndUpdate(schoolId, schoolUpdatequery, option);
        return { assignUserData, schoolIsVerify };
    }
    async unassignSchoolToUser(schoolData, userData) {
        const roles = await this.roles.find({});
        if (!roles)
            throw new HttpException_1.default(409, `Please insert role`);
        const role = loadsh_1.default.find(roles, loadsh_1.default.matchesProperty('name', 'School-Admin'));
        const findUserData = await this.users.findOne({ _id: schoolData.userId, isDeleted: false }).populate('role', 'name');
        if (!findUserData) {
            throw new HttpException_1.default(409, `User not found`);
        }
        else if (findUserData.role.toString() !== role._id.toString()) {
            throw new HttpException_1.default(409, `School is only assign to school admin user. this user is not a school admin`);
        }
        else if (!findUserData.schoolId) {
            throw new HttpException_1.default(409, `School is not assign to ${findUserData.firstName} ${findUserData.lastName}`);
        }
        const findschoolData = await this.schools.findOne({ _id: schoolData.schoolId, isDeleted: false });
        if (!findschoolData)
            throw new HttpException_1.default(409, `School not found`);
        const userId = {
            _id: schoolData.userId
        };
        const updateQuery = {
            schoolId: null,
            updatedBy: userData._id
        };
        const option = {
            new: true
        };
        const assignUserData = await this.users.findByIdAndUpdate(userId, updateQuery, option);
        const schoolId = {
            _id: schoolData.schoolId
        };
        const schoolUpdatequery = {
            _id: schoolData.schoolId,
            isAssigned: false,
            updatedBy: userData._id
        };
        const schoolIsVerify = await this.schools.findByIdAndUpdate(schoolId, schoolUpdatequery, option);
        return { assignUserData, schoolIsVerify };
    }
    async getSchool(schoolData) {
        const pageNumber = (schoolData === null || schoolData === void 0 ? void 0 : schoolData.pageNumber) || 1;
        const pageSize = (schoolData === null || schoolData === void 0 ? void 0 : schoolData.pageSize) || 100;
        const limit = Number(pageSize);
        const skip = (Number(pageNumber) - 1) * limit;
        const roles = await this.roles.find({});
        if (!roles)
            throw new HttpException_1.default(409, `Please insert role`);
        const role = loadsh_1.default.find(roles, loadsh_1.default.matchesProperty('name', 'School-Admin'));
        let search = {
            $and: [
                { isDeleted: false }
            ]
        };
        // if(schoolData.isAssigned){
        //   search.$and.push({
        //     isAssigned: JSON.parse(schoolData.isAssigned)
        //   })
        // }
        if (schoolData.schoolId) {
            search.$and.push({
                _id: new mongoose_1.default.Types.ObjectId(schoolData.schoolId)
            });
        }
        // if(schoolData.country){
        //   search.$and.push({
        //     country: mongoose.Types.ObjectId(schoolData.country)
        //   })
        // }
        if (schoolData.districtId) {
            search.$and.push({
                districtId: new mongoose_1.default.Types.ObjectId(schoolData.districtId)
            });
        }
        if (schoolData.stateId) {
            search.$and.push({
                stateId: new mongoose_1.default.Types.ObjectId(schoolData.stateId)
            });
        }
        if (schoolData.search) {
            const searchRegex = new RegExp(schoolData.search, 'i');
            search.$and.push({
                schoolName: { $regex: searchRegex }
            });
        }
        const getSchoolData = await this.schools.aggregate([
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
                                        { $eq: ["$role", new mongoose_1.default.Types.ObjectId(role._id)] },
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
        ]).facet({
            "data": [
                // { $sort: sortBy },.
                { $skip: skip },
                { $limit: limit }
            ],
            "schoolCount": [
                { $count: "count" }
            ]
        });
        return getSchoolData;
    }
    async deleteSchool(schoolData, userData) {
        const findSchool = await this.schools.findOne({ _id: schoolData.schoolId });
        if (!findSchool) {
            throw new HttpException_1.default(409, `School not found`);
        }
        else if ((findSchool === null || findSchool === void 0 ? void 0 : findSchool.isDeleted) == true) {
            throw new HttpException_1.default(409, `School ${findSchool.schoolName} is already deleted`);
        }
        const deleteschoolData = await this.schools.findByIdAndUpdate(schoolData.schoolId, {
            isDeleted: true,
            deletedBy: userData._id,
            deletedAt: moment_1.default().utc().toDate()
        }, { new: true });
        return deleteschoolData;
    }
    async activateSchool(schoolData, userData) {
        const findSchool = await this.schools.findOne({ _id: schoolData.schoolId });
        if (!findSchool) {
            throw new HttpException_1.default(409, `School not found`);
        }
        else if ((findSchool === null || findSchool === void 0 ? void 0 : findSchool.isDeleted) == false) {
            throw new HttpException_1.default(409, `School ${findSchool.schoolName} is already activated`);
        }
        const activateSchoolData = await this.schools.findByIdAndUpdate(schoolData.schoolId, {
            isDeleted: false,
            updatedBy: userData._id
        }, { new: true });
        return activateSchoolData;
    }
    async updateSchool(schoolId, schoolData, userData) {
        const findschoolData = await this.schools.findOne({ _id: schoolId });
        if (!findschoolData) {
            throw new HttpException_1.default(409, `School not found`);
        }
        else if ((findschoolData === null || findschoolData === void 0 ? void 0 : findschoolData.isDeleted) == true) {
            throw new HttpException_1.default(409, `School ${findschoolData.schoolName} is already deleted`);
        }
        const updateSchoolData = await this.schools.findByIdAndUpdate(schoolId, Object.assign(Object.assign({}, schoolData), { updatedBy: userData._id }), { new: true });
        return updateSchoolData;
    }
    async createSchoolSubAdmin(schoolSubAdminData, userData) {
        const findUser = await this.users.findOne({ email: schoolSubAdminData.email, isDeleted: false });
        const find = await this.users.findOne({ email: schoolSubAdminData.email, isDeleted: false });
        if (findUser)
            throw new HttpException_1.default(409, `You're email ${schoolSubAdminData.email} already exists`);
        const roles = await this.roles.find({});
        if (!roles)
            throw new HttpException_1.default(409, `Please insert role`);
        const role = loadsh_1.default.find(roles, loadsh_1.default.matchesProperty('name', 'School-Sub-Admin'));
        if (role.name != 'School-Sub-Admin')
            throw new HttpException_1.default(409, `Please insert role for School Admin`);
        const checkSchoolSubAdmin = await this.users.findOne({ role: role._id, isDeleted: false, schoolId: schoolSubAdminData.schoolId });
        if (checkSchoolSubAdmin)
            throw new HttpException_1.default(409, `Already created sub admin for this school`);
        schoolSubAdminData = Object.assign(Object.assign({}, schoolSubAdminData), { password: await bcrypt_1.default.hash(schoolSubAdminData.password, 10), role: role._id, createdBy: userData._id });
        let createUserData = await this.users.create(schoolSubAdminData);
        return createUserData;
    }
    async updateSchoolSubAdmin(schoolSubAdminId, schoolSubAdminData, userData) {
        const findschooAdminData = await this.users.findOne({ _id: schoolSubAdminId, isDeleted: false });
        const roles = await this.roles.find({});
        if (!roles)
            throw new HttpException_1.default(409, `Please insert role`);
        const role = loadsh_1.default.find(roles, loadsh_1.default.matchesProperty('name', 'School-Sub-Admin'));
        if (!findschooAdminData) {
            throw new HttpException_1.default(409, `School-Sub-Admin not found`);
        }
        else if ((findschooAdminData === null || findschooAdminData === void 0 ? void 0 : findschooAdminData.isActivated) == true) {
            throw new HttpException_1.default(409, `School-Sub-Admin is Deactivated`);
        }
        else if ((findschooAdminData === null || findschooAdminData === void 0 ? void 0 : findschooAdminData.role) == role._id) {
            throw new HttpException_1.default(409, `This user is not a school-sub-admin`);
        }
        let updateScoolSubAdminData = await this.users.findByIdAndUpdate(schoolSubAdminId, {
            firstName: schoolSubAdminData.firstName,
            lastName: schoolSubAdminData.lastName,
            countryCode: schoolSubAdminData.countryCode,
            phoneNumber: schoolSubAdminData.phoneNumber,
            updatedBy: userData._id
        }, { new: true }).select('-password');
        return updateScoolSubAdminData;
    }
    async deleteSchoolSubAdmin(schoolSubAdminData, userData) {
        const roles = await this.roles.find({});
        if (!roles)
            throw new HttpException_1.default(409, `Please insert role`);
        const role = loadsh_1.default.find(roles, loadsh_1.default.matchesProperty('name', 'School-Sub-Admin'));
        const findSchoolSubAdmin = await this.users.findOne({ _id: schoolSubAdminData.schoolSubAdminId });
        if (!findSchoolSubAdmin) {
            throw new HttpException_1.default(409, `School-Sub-Admin not found`);
        }
        else if ((findSchoolSubAdmin === null || findSchoolSubAdmin === void 0 ? void 0 : findSchoolSubAdmin.isDeleted) == true) {
            throw new HttpException_1.default(409, `School-Sub-Admin ${findSchoolSubAdmin.email} is already deleted`);
        }
        else if ((findSchoolSubAdmin === null || findSchoolSubAdmin === void 0 ? void 0 : findSchoolSubAdmin.role) == role._id) {
            throw new HttpException_1.default(409, `This user is not a school-sub-admin`);
        }
        const deleteSchoolAdminData = await this.users.findByIdAndUpdate(schoolSubAdminData.schoolSubAdminId, {
            isDeleted: true,
            deletedBy: userData._id,
            deletedAt: moment_1.default().utc().toDate()
        }, { new: true }).select('-password');
        return deleteSchoolAdminData;
    }
    async activateSchoolSubAdmin(schoolSubAdminData, userData) {
        const roles = await this.roles.find({});
        if (!roles)
            throw new HttpException_1.default(409, `Please insert role`);
        const role = loadsh_1.default.find(roles, loadsh_1.default.matchesProperty('name', 'School-Sub-Admin'));
        const findSchoolSubAdmin = await this.users.findOne({ _id: schoolSubAdminData.schoolSubAdminId, isDeleted: false });
        if (!findSchoolSubAdmin) {
            throw new HttpException_1.default(409, `School-Sub-Admin not found`);
        }
        else if ((findSchoolSubAdmin === null || findSchoolSubAdmin === void 0 ? void 0 : findSchoolSubAdmin.role) == role._id) {
            throw new HttpException_1.default(409, `This user is not a school-sub-admin`);
        }
        let status;
        let statusMode;
        if (findSchoolSubAdmin.isActivated === false) {
            status = true;
            statusMode = 'Deactivated';
        }
        else {
            status = false;
            statusMode = 'Activated';
        }
        const activateSchoolAdminData = await this.users.findByIdAndUpdate(schoolSubAdminData.schoolSubAdminId, {
            isActivated: status,
            updatedBy: userData._id
        }, { new: true });
        return { activateSchoolAdminData, statusMode };
    }
    async getSchoolSubAdmin(schoolSubAdminData) {
        const pageNumber = (schoolSubAdminData === null || schoolSubAdminData === void 0 ? void 0 : schoolSubAdminData.pageNumber) || 1;
        const pageSize = (schoolSubAdminData === null || schoolSubAdminData === void 0 ? void 0 : schoolSubAdminData.pageSize) || 100;
        const limit = Number(pageSize);
        const skip = (Number(pageNumber) - 1) * limit;
        const roles = await this.roles.find({});
        if (!roles)
            throw new HttpException_1.default(409, `Please insert role`);
        const role = loadsh_1.default.find(roles, loadsh_1.default.matchesProperty('name', 'School-Sub-Admin'));
        if ((role === null || role === void 0 ? void 0 : role.name) != 'School-Sub-Admin')
            throw new HttpException_1.default(409, `Please insert role for School Admin`);
        let search = {
            $and: [
                { role: role._id },
                { isDeleted: false }
            ]
        };
        if (schoolSubAdminData.schoolId) {
            search.$and.push({
                schoolId: new mongoose_1.default.Types.ObjectId(schoolSubAdminData.schoolId)
            });
        }
        if (schoolSubAdminData.status) {
            search.$and.push({
                isActivated: JSON.parse(schoolSubAdminData.status)
            });
        }
        if (schoolSubAdminData.schoolSubAdminId) {
            search.$and.push({
                _id: new mongoose_1.default.Types.ObjectId(schoolSubAdminData.schoolSubAdminId)
            });
        }
        if (schoolSubAdminData.search) {
            const searchRegex = new RegExp(schoolSubAdminData.search, 'i');
            search.$and.push({
                $or: [{ firstName: { $regex: searchRegex } }, { lastName: { $regex: searchRegex } }]
            });
        }
        const getSchoolSubAdminData = await this.users.aggregate([
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
        // if(isEmpty(getSchoolSubAdminData[0]['data'])) throw new HttpException(409, `School-Sub-Admin record not found`);
        return getSchoolSubAdminData;
    }
}
exports.default = SchoolService;
//# sourceMappingURL=schools.service.js.map