"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const HttpException_1 = tslib_1.__importDefault(require("../exceptions/HttpException"));
const reports_model_1 = tslib_1.__importDefault(require("../models/reports.model"));
const moment_1 = tslib_1.__importDefault(require("moment"));
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
class ReportService {
    constructor() {
        this.reports = reports_model_1.default;
    }
    async createReport(body, user) {
        if (user.role.name == "School-Admin" || user.role.name == "School-Sub-Admin") {
            body.schoolId = user.schoolId;
        }
        else if (user.role.name == "Teacher") {
            body.schoolId = user.schoolId;
            body.teacherId = user._id;
        }
        const createStudent = await this.reports.create(Object.assign(Object.assign({}, body), { userId: user._id, createdBy: user._id }));
        return createStudent;
    }
    async updateReport(reportId, body, user) {
        const findReport = await this.reports.findOne({ _id: reportId, isDeleted: false });
        if (!findReport)
            throw new HttpException_1.default(409, `Report not found`);
        else if (findReport.isActivated == true)
            throw new HttpException_1.default(409, `Report is deactivated`);
        else if (findReport.userId.toString() != user._id.toString())
            throw new HttpException_1.default(409, `This report is not yours`);
        if (user.role.name == "School-Admin" || user.role.name == "School-Sub-Admin") {
            body.schoolId = user.schoolId;
        }
        else if (user.role.name == "Teacher") {
            body.schoolId = user.schoolId;
            body.teacherId = user._id;
        }
        const updateReport = await this.reports.findByIdAndUpdate(reportId, Object.assign(Object.assign({}, body), { updatedBy: user._id }), {
            new: true
        });
        return updateReport;
    }
    async deleteReport(reportId, user) {
        const findReport = await this.reports.findOne({ _id: reportId, isDeleted: false });
        if (!findReport)
            throw new HttpException_1.default(409, `Report not found`);
        else if (findReport.userId.toString() != user._id.toString())
            throw new HttpException_1.default(409, `This report is not yours`);
        const deleteReport = await this.reports.findByIdAndUpdate(reportId, {
            isDeleted: true,
            deletedBy: user._id,
            deletedAt: moment_1.default().utc().toDate()
        }, {
            new: true
        });
        return deleteReport;
    }
    async changeReportStatus(reportId, user) {
        const findReport = await this.reports.findOne({ _id: reportId, isDeleted: false });
        if (!findReport)
            throw new HttpException_1.default(409, `Report not found`);
        else if (findReport.userId.toString() != user._id.toString())
            throw new HttpException_1.default(409, `This report is not yours`);
        let status;
        let statusMode;
        if (findReport.isActivated === false) {
            status = true;
            statusMode = 'Deactivated';
        }
        else {
            status = false;
            statusMode = 'Activated';
        }
        const reportData = await this.reports.findByIdAndUpdate(reportId, {
            isActivated: status,
            updatedBy: user._id
        }, { new: true });
        return { reportData, statusMode };
    }
    async getReport(reportData, user) {
        const pageNumber = (reportData === null || reportData === void 0 ? void 0 : reportData.pageNumber) || 1;
        const pageSize = (reportData === null || reportData === void 0 ? void 0 : reportData.pageSize) || 100;
        const limit = Number(pageSize);
        const skip = (Number(pageNumber) - 1) * limit;
        let search = {
            $and: [
                { isDeleted: false },
                { userId: new mongoose_1.default.Types.ObjectId(user._id) }
            ]
        };
        if (reportData.status) {
            search.$and.push({
                isActivated: JSON.parse(reportData.status)
            });
        }
        if (reportData.search) {
            const searchRegex = new RegExp(reportData.search, 'i');
            search.$and.push({
                $or: [{ name: { $regex: searchRegex } }]
            });
        }
        const getReportData = await this.reports.aggregate([
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
                    from: 'users',
                    localField: 'teacherId',
                    foreignField: '_id',
                    as: "teacher"
                }
            },
            {
                $lookup: {
                    from: 'studentdashbordques',
                    localField: 'questionId',
                    foreignField: '_id',
                    as: "question"
                }
            },
            { $unwind: {
                    path: '$school',
                    preserveNullAndEmptyArrays: true
                }
            },
            { $unwind: {
                    path: '$teacher',
                    preserveNullAndEmptyArrays: true
                }
            },
            { $unwind: {
                    path: '$question',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    name: 1,
                    userId: 1,
                    startDate: 1,
                    endDate: 1,
                    districtId: 1,
                    schoolId: 1,
                    teacherId: 1,
                    studentId: 1,
                    questionI: 1,
                    answer: 1,
                    questionTitle: "$question.question",
                    schoolName: "$school.schoolName",
                    teacherName: { $concat: ["$teacher.firstName", " ", "$teacher.lastName"] },
                    isActivated: 1
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
        return getReportData;
    }
}
exports.default = ReportService;
//# sourceMappingURL=reports.service.js.map