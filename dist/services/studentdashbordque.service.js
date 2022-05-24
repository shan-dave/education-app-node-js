"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const HttpException_1 = tslib_1.__importDefault(require("../exceptions/HttpException"));
const studentdeashbordque_model_1 = tslib_1.__importDefault(require("../models/studentdeashbordque.model"));
const moment_1 = tslib_1.__importDefault(require("moment"));
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
class StudentDashbordQueService {
    constructor() {
        this.studentDeashbordQue = studentdeashbordque_model_1.default;
    }
    async createStudentDashbordQue(queData, userData) {
        const findQue = await this.studentDeashbordQue.findOne({ question: queData.question, isDeleted: false });
        if (findQue)
            throw new HttpException_1.default(409, `Question '${findQue.question}' is already exist`);
        const createStudentDashbordQueData = await this.studentDeashbordQue.create(Object.assign(Object.assign({}, queData), { createdBy: userData._id }));
        return createStudentDashbordQueData;
    }
    async updateStudentDashbordQue(queId, queData, userData) {
        const findQue = await this.studentDeashbordQue.findOne({ _id: queId, isDeleted: false });
        if (!findQue) {
            throw new HttpException_1.default(409, `Subject not found`);
        }
        else if ((findQue === null || findQue === void 0 ? void 0 : findQue.isActivated) == true) {
            throw new HttpException_1.default(409, `Question '${findQue.question}' is deactivated`);
        }
        const updateQueData = await this.studentDeashbordQue.findByIdAndUpdate(queId, Object.assign(Object.assign({}, queData), { updatedBy: userData._id }), { new: true });
        return updateQueData;
    }
    async deleteStudentDashbordQue(queId, userData) {
        const findQue = await this.studentDeashbordQue.findOne({ _id: queId, isDeleted: false });
        if (!findQue) {
            throw new HttpException_1.default(409, `Question not found`);
        }
        const deleteStudentDashbordQueData = await this.studentDeashbordQue.findByIdAndUpdate(queId, {
            isDeleted: true,
            deletedBy: userData._id,
            deletedAt: moment_1.default().utc().toDate()
        }, { new: true });
        return deleteStudentDashbordQueData;
    }
    async aciveStudentDashbordQue(queId, userData) {
        const findQue = await this.studentDeashbordQue.findOne({ _id: queId, isDeleted: false });
        if (!findQue) {
            throw new HttpException_1.default(409, `Question not found`);
        }
        let status;
        let statusMode;
        if (findQue.isActivated === false) {
            status = true;
            statusMode = 'Deactivated';
        }
        else {
            status = false;
            statusMode = 'Activated';
        }
        const activeStudentDashbordQueData = await this.studentDeashbordQue.findByIdAndUpdate(queId, {
            isActivated: status,
            updatedBy: userData._id
        }, { new: true });
        return { activeStudentDashbordQueData, statusMode };
    }
    async getStudentDashbordQue(queData) {
        let search = {
            $and: [{ isDeleted: false }]
        };
        if (queData.status) {
            search.$and.push({
                isActivated: JSON.parse(queData.status)
            });
        }
        if (queData.queId) {
            search.$and.push({
                _id: new mongoose_1.default.Types.ObjectId(queData.queId)
            });
        }
        if (queData.assignedSchool) {
            search.$and.push({
                $or: [
                    { assignedSchool: { $in: [new mongoose_1.default.Types.ObjectId(queData.assignedSchool)] } },
                    { isAssignAllSchool: true }
                ]
            });
        }
        const getQueData = await this.studentDeashbordQue.aggregate([
            { $match: search },
            {
                $lookup: {
                    from: 'schools',
                    localField: 'assignedSchool',
                    foreignField: '_id',
                    as: "school"
                }
            },
            {
                $unset: ['__v', 'school.__v', 'school.createdAt', 'school.updatedAt', 'school.role', 'school.createdBy', 'school.updatedBy',
                    'createdAt', 'createdBy', 'updatedAt', 'updatedBy'
                ]
            }
        ]).facet({
            "data": [],
            "count": [
                { $count: "count" }
            ]
        });
        return getQueData;
    }
    async checkDefaultQue() {
        const findQue = await this.studentDeashbordQue.findOne({ default: true, isDeleted: false });
        let message;
        if (!findQue) {
            message = false;
        }
        else {
            message = true;
        }
        return message;
    }
}
exports.default = StudentDashbordQueService;
//# sourceMappingURL=studentdashbordque.service.js.map