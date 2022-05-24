"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const HttpException_1 = tslib_1.__importDefault(require("../exceptions/HttpException"));
const states_model_1 = tslib_1.__importDefault(require("../models/states.model"));
const districts_model_1 = tslib_1.__importDefault(require("../models/districts.model"));
const schools_model_1 = tslib_1.__importDefault(require("../models/schools.model"));
const teachers_model_1 = tslib_1.__importDefault(require("../models/teachers.model"));
const students_model_1 = tslib_1.__importDefault(require("../models/students.model"));
const moment_1 = tslib_1.__importDefault(require("moment"));
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
class CommonService {
    constructor() {
        this.states = states_model_1.default;
        this.districts = districts_model_1.default;
        this.schools = schools_model_1.default;
        this.teachers = teachers_model_1.default;
        this.students = students_model_1.default;
    }
    // public async insertCountryData(countryData, userData): Promise<Country> {
    //   const findCountry: Country = await this.countries.findOne({ name: countryData.countryName.toLowerCase(), isDeleted: false });
    //   if (findCountry) throw new HttpException(409, `Country ${countryData.countryName} is already exist`);
    //   const insertedCountryData: Country = await this.countries.create({
    //       name: countryData.countryName.toLowerCase(),
    //       countryCode: countryData.countryCode,
    //       createdBy: userData._id
    //   })
    //   return insertedCountryData;
    // }
    async insertStateData(body, user) {
        const findState = await this.states.findOne({ name: body.name.toLowerCase(), isDeleted: false });
        if (findState)
            throw new HttpException_1.default(409, `State ${body.stateName} is already exist`);
        const insertedStateData = await this.states.create(Object.assign(Object.assign({}, body), { createdBy: user._id }));
        return insertedStateData;
    }
    async insertDistrictData(body, user) {
        const findDistrict = await this.districts.findOne({ name: body.name, sauCode: body.sauCode, isDeleted: false });
        if (findDistrict)
            throw new HttpException_1.default(409, `District "${findDistrict.name}" is already exist`);
        const findDistrictSauCode = await this.districts.findOne({ sauCode: body.sauCode, isDeleted: false });
        if (findDistrictSauCode)
            throw new HttpException_1.default(409, `District SAU Code "${findDistrictSauCode.sauCode}" must be unique`);
        const insertedCityData = await this.districts.create(Object.assign(Object.assign({}, body), { createdBy: user._id }));
        return insertedCityData;
    }
    // public async deleteCountry(countryData, userData): Promise<Country> {
    //   const findCountry: Country = await this.countries.findOne({ _id: countryData.countryId, isDeleted: true });
    //   if (findCountry) throw new HttpException(409, `Country ${findCountry.name} is already deleted`);
    //   const deleteCountryData: Country = await this.countries.findByIdAndUpdate(countryData.countryId,{
    //       isDeleted: true,
    //       deletedBy: userData._id,
    //       deletedAt: moment().utc().toDate()
    //   }, {new: true})
    //   return deleteCountryData;
    // }
    async deleteState(stateData, userData) {
        const findState = await this.states.findOne({ _id: stateData.stateId, isDeleted: true });
        if (findState)
            throw new HttpException_1.default(409, `State "${findState.name}" is already deleted`);
        const deleteStateData = await this.states.findByIdAndUpdate(stateData.stateId, {
            isDeleted: true,
            deletedBy: userData._id,
            deletedAt: moment_1.default().utc().toDate()
        }, { new: true });
        return deleteStateData;
    }
    async changeStateStatus(stateData, userData) {
        const findState = await this.states.findOne({ _id: stateData.stateId });
        if (!findState)
            throw new HttpException_1.default(409, `State not found`);
        let status;
        let statusMode;
        if (findState.isActivated === false) {
            status = true;
            statusMode = 'Deactivated';
        }
        else {
            status = false;
            statusMode = 'Activated';
        }
        const changeStateStatusData = await this.states.findByIdAndUpdate(stateData.stateId, {
            isActivated: status,
            updatedBy: userData._id
        }, { new: true });
        return { changeStateStatusData, statusMode };
    }
    async changeDistrictStatus(districtData, userData) {
        const findDistrict = await this.districts.findOne({ _id: districtData.districtId });
        if (!findDistrict)
            throw new HttpException_1.default(409, `District not found`);
        let status;
        let statusMode;
        if (findDistrict.isActivated === false) {
            status = true;
            statusMode = 'Deactivated';
        }
        else {
            status = false;
            statusMode = 'Activated';
        }
        const changeDistrictStatusData = await this.districts.findByIdAndUpdate(districtData.districtId, {
            isActivated: status,
            updatedBy: userData._id
        }, { new: true });
        return { changeDistrictStatusData, statusMode };
    }
    async deleteDistrict(params, user) {
        const findDistrict = await this.districts.findOne({ _id: params.districtId, isDeleted: true });
        if (findDistrict)
            throw new HttpException_1.default(409, `District ${findDistrict.name} is already deleted`);
        const deleteDistrictData = await this.districts.findByIdAndUpdate(params.districtId, {
            isDeleted: true,
            deletedBy: user._id,
            deletedAt: moment_1.default().utc().toDate()
        }, { new: true });
        return deleteDistrictData;
    }
    async getState(stateData, userData) {
        const pageNumber = (stateData === null || stateData === void 0 ? void 0 : stateData.pageNumber) || 1;
        const pageSize = (stateData === null || stateData === void 0 ? void 0 : stateData.pageSize) || 100;
        const limit = Number(pageSize);
        const skip = (Number(pageNumber) - 1) * limit;
        let search = {
            $and: [
                { isDeleted: false }
            ]
        };
        if (stateData.status) {
            search.$and.push({ isActivated: JSON.parse(stateData.status) });
        }
        if (stateData.stateId) {
            search.$and.push({ _id: new mongoose_1.default.Types.ObjectId(stateData.stateId) });
        }
        if (stateData.search) {
            const searchRegex = new RegExp(stateData.search, 'i');
            search.$and.push({
                name: { $regex: searchRegex }
            });
        }
        if (stateData.pageNumber && stateData.pageSize) {
            const getStateData = await this.states.aggregate([
                { $match: search },
            ]).facet({
                "data": [
                    // { $sort: sortBy },.
                    { $skip: skip },
                    { $limit: limit }
                ],
                "count": [
                    { $count: "count" }
                ]
            });
            return getStateData;
        }
        else {
            const getStateData = await this.states.aggregate([
                { $match: search },
            ]).facet({
                "data": [],
                "count": [
                    { $count: "count" }
                ]
            });
            return getStateData;
        }
    }
    async getDistrict(params, userData) {
        const pageNumber = (params === null || params === void 0 ? void 0 : params.pageNumber) || 1;
        const pageSize = (params === null || params === void 0 ? void 0 : params.pageSize) || 100;
        const limit = Number(pageSize);
        const skip = (Number(pageNumber) - 1) * limit;
        let search = {
            $and: [
                { isDeleted: false }
            ]
        };
        if (params.status) {
            search.$and.push({ isActivated: JSON.parse(params.status) });
        }
        if (params.stateId) {
            search.$and.push({ stateId: new mongoose_1.default.Types.ObjectId(params.stateId) });
        }
        if (params.districtId) {
            search.$and.push({ _id: new mongoose_1.default.Types.ObjectId(params.districtId) });
        }
        if (params.search) {
            const searchRegex = new RegExp(params.search, 'i');
            search.$and.push({
                name: { $regex: searchRegex }
            });
        }
        if (params.pageNumber && params.pageSize) {
            const getDistrictData = await this.districts.aggregate([
                { $match: search },
                {
                    $lookup: {
                        from: 'states',
                        localField: 'stateId',
                        foreignField: '_id',
                        as: "state"
                    }
                },
            ]).facet({
                "data": [
                    // { $sort: sortBy },.
                    { $skip: skip },
                    { $limit: limit }
                ],
                "count": [
                    { $count: "count" }
                ]
            });
            return getDistrictData;
        }
        else {
            const getDistrictData = await this.districts.aggregate([
                { $match: search },
                {
                    $lookup: {
                        from: 'states',
                        localField: 'stateId',
                        foreignField: '_id',
                        as: "state"
                    }
                },
            ]).facet({
                "data": [
                // { $sort: sortBy },
                ],
                "count": [
                    { $count: "count" }
                ]
            });
            return getDistrictData;
        }
    }
    async getSchoolDashbord(queryData) {
        let search = {
            $and: [
                { isDeleted: false }
            ]
        };
        if (queryData.startDate && queryData.endDate) {
            search.$and.push({ createdAt: { $gte: moment_1.default.utc(queryData.startDate).set({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }).toDate() } });
            search.$and.push({ createdAt: { $lte: moment_1.default.utc(queryData.endDate).set({ hours: 23, minutes: 59, seconds: 59, milliseconds: 999 }).toDate() } });
        }
        if (queryData.status) {
            search.$and.push({ isActivated: JSON.parse(queryData.status) });
        }
        const schoolDashbord = await this.schools.aggregate([
            {
                $match: search
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    date: '$_id',
                    count: 1,
                    _id: 0
                }
            },
            {
                $sort: {
                    date: 1
                }
            }
        ]);
        return schoolDashbord;
    }
    async getStateDashbord(queryData) {
        let search = {
            $and: [
                { isDeleted: false },
            ]
        };
        if (queryData.startDate && queryData.endDate) {
            search.$and.push({ createdAt: { $gte: moment_1.default.utc(queryData.startDate).set({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }).toDate() } });
            search.$and.push({ createdAt: { $lte: moment_1.default.utc(queryData.endDate).set({ hours: 23, minutes: 59, seconds: 59, milliseconds: 999 }).toDate() } });
        }
        if (queryData.status) {
            search.$and.push({ isActivated: JSON.parse(queryData.status) });
        }
        const stateDashbord = await this.states.aggregate([
            {
                $match: search
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    date: '$_id',
                    count: 1,
                    _id: 0
                }
            },
            {
                $sort: {
                    date: 1
                }
            }
        ]);
        return stateDashbord;
    }
    async getDistrictDashbord(queryData) {
        let search = {
            $and: [
                { isDeleted: false },
            ]
        };
        if (queryData.startDate && queryData.endDate) {
            search.$and.push({ createdAt: { $gte: moment_1.default.utc(queryData.startDate).set({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }).toDate() } });
            search.$and.push({ createdAt: { $lte: moment_1.default.utc(queryData.endDate).set({ hours: 23, minutes: 59, seconds: 59, milliseconds: 999 }).toDate() } });
        }
        if (queryData.status) {
            search.$and.push({ isActivated: JSON.parse(queryData.status) });
        }
        const districtDashbord = await this.districts.aggregate([
            {
                $match: search
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    date: '$_id',
                    count: 1,
                    _id: 0
                }
            },
            {
                $sort: {
                    date: 1
                }
            }
        ]);
        return districtDashbord;
    }
    async getStudentDashbord(queryData) {
        let search = {
            $and: [
                { isDeleted: false },
            ]
        };
        if (queryData.startDate && queryData.endDate) {
            search.$and.push({ createdAt: { $gte: moment_1.default.utc(queryData.startDate).set({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }).toDate() } });
            search.$and.push({ createdAt: { $lte: moment_1.default.utc(queryData.endDate).set({ hours: 23, minutes: 59, seconds: 59, milliseconds: 999 }).toDate() } });
        }
        if (queryData.status) {
            search.$and.push({ isActivated: JSON.parse(queryData.status) });
        }
        if (queryData.schoolId) {
            search.$and.push({ schoolId: new mongoose_1.default.Types.ObjectId(queryData.schoolId) });
        }
        const studentDashbord = await this.students.aggregate([
            {
                $match: search
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    date: '$_id',
                    count: 1,
                    _id: 0
                }
            },
            {
                $sort: {
                    date: 1
                }
            }
        ]);
        return studentDashbord;
    }
    async getTeacherDashbord(queryData) {
        let search = {
            $and: [
                { isDeleted: false }
            ]
        };
        if (queryData.startDate && queryData.endDate) {
            search.$and.push({ createdAt: { $gte: moment_1.default.utc(queryData.startDate).set({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }).toDate() } });
            search.$and.push({ createdAt: { $lte: moment_1.default.utc(queryData.endDate).set({ hours: 23, minutes: 59, seconds: 59, milliseconds: 999 }).toDate() } });
        }
        if (queryData.status) {
            search.$and.push({ isActivated: JSON.parse(queryData.status) });
        }
        if (queryData.schoolId) {
            search.$and.push({ schoolId: new mongoose_1.default.Types.ObjectId(queryData.schoolId) });
        }
        const teacherDashbord = await this.teachers.aggregate([
            {
                $match: search
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    date: '$_id',
                    // records: 1,
                    count: 1,
                    _id: 0
                }
            },
            {
                $sort: {
                    date: 1
                }
            }
        ]);
        return teacherDashbord;
    }
}
exports.default = CommonService;
//# sourceMappingURL=commons.service.js.map