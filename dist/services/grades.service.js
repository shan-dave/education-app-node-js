"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const HttpException_1 = tslib_1.__importDefault(require("../exceptions/HttpException"));
const grades_model_1 = tslib_1.__importDefault(require("../models/grades.model"));
const moment_1 = tslib_1.__importDefault(require("moment"));
class GreadeService {
    constructor() {
        this.grades = grades_model_1.default;
    }
    async creatGradee(body, user) {
        const findGrade = await this.grades.findOne({ name: body.name, isDeleted: false });
        if (findGrade)
            throw new HttpException_1.default(409, `Grade ${body.name} is already exist`);
        const createdGradeData = await this.grades.create(Object.assign(Object.assign({}, body), { createdBy: user._id }));
        return createdGradeData;
    }
    async getGrade(query, user) {
        let search = {
            $and: [
                { isDeleted: false },
            ]
        };
        if (query.status) {
            search.$and.push({
                isActivated: JSON.parse(query.status)
            });
        }
        if (query.search) {
            const searchRegex = new RegExp(query.search, 'i');
            search.$and.push({
                $or: [{ name: { $regex: searchRegex } }]
            });
        }
        const findGrade = await this.grades.find(search);
        return findGrade;
    }
    async deleteGrade(gradeId, user) {
        const findGrade = await this.grades.findOne({ _id: gradeId, isDeleted: false });
        if (!findGrade)
            throw new HttpException_1.default(409, `Grade not found`);
        const deleteGrade = await this.grades.findByIdAndUpdate(gradeId, {
            isDeleted: true,
            deletedBy: user._id,
            deletedAt: moment_1.default().utc().toDate()
        }, {
            new: true
        });
        return deleteGrade;
    }
    async changeGradeStatus(gradeId, user) {
        const findGrade = await this.grades.findOne({ _id: gradeId, isDeleted: false });
        if (!findGrade)
            throw new HttpException_1.default(409, `Grade not found`);
        let status;
        let statusMode;
        if (findGrade.isActivated === false) {
            status = true;
            statusMode = 'Deactivated';
        }
        else {
            status = false;
            statusMode = 'Activated';
        }
        const gradeData = await this.grades.findByIdAndUpdate(gradeId, {
            isActivated: status,
            updatedBy: user._id
        }, { new: true });
        return { gradeData, statusMode };
    }
}
exports.default = GreadeService;
//# sourceMappingURL=grades.service.js.map