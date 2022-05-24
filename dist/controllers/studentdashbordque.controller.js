"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const studentdashbordque_service_1 = tslib_1.__importDefault(require("../services/studentdashbordque.service"));
class StudentDashbordQueController {
    constructor() {
        this.studentDashbordQueService = new studentdashbordque_service_1.default();
        this.createStudentDashbordQue = async (req, res, next) => {
            try {
                const createStudentDashbordQueData = await this.studentDashbordQueService.createStudentDashbordQue(req.body, req.user);
                res.status(201).json({ data: createStudentDashbordQueData, message: 'Question created successfully' });
            }
            catch (error) {
                next(error);
            }
        };
        this.updateStudentDashbordQue = async (req, res, next) => {
            try {
                const queData = req.body;
                const queId = req.params.queId;
                const userData = req.user;
                const updateStudentDashbordQueData = await this.studentDashbordQueService.updateStudentDashbordQue(queId, queData, userData);
                res.status(200).json({ data: updateStudentDashbordQueData, message: 'Question updated successfully' });
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteStudentDashbordQue = async (req, res, next) => {
            try {
                const queId = req.params.queId;
                const userData = req.user;
                const deleteStudentDashbordQueData = await this.studentDashbordQueService.deleteStudentDashbordQue(queId, userData);
                res.status(200).json({ data: deleteStudentDashbordQueData, message: 'Question deleted successfully' });
            }
            catch (error) {
                next(error);
            }
        };
        this.activeStudentDashbordQue = async (req, res, next) => {
            try {
                const queId = req.params.queId;
                const userData = req.user;
                const { activeStudentDashbordQueData, statusMode } = await this.studentDashbordQueService.aciveStudentDashbordQue(queId, userData);
                res.status(200).json({ data: activeStudentDashbordQueData, message: `Question "${activeStudentDashbordQueData.question}" ${statusMode} successfully` });
            }
            catch (error) {
                next(error);
            }
        };
        this.getStudentDashbordQue = async (req, res, next) => {
            var _a, _b;
            try {
                const getStudentDashbordQue = await this.studentDashbordQueService.getStudentDashbordQue(req.query);
                const studentDashbordQueRecords = getStudentDashbordQue ? getStudentDashbordQue[0]['data'] : [];
                const studentDashbordQueCount = getStudentDashbordQue ? getStudentDashbordQue[0]['count'][0] ? (_b = (_a = getStudentDashbordQue[0]) === null || _a === void 0 ? void 0 : _a['count'][0]) === null || _b === void 0 ? void 0 : _b.count : 0 : 0;
                res.status(200).json({ data: studentDashbordQueRecords, count: studentDashbordQueCount, message: 'Questions record fetch successfully' });
            }
            catch (err) {
                next(err);
            }
        };
        this.checkDefaultQue = async (req, res, next) => {
            try {
                const message = await this.studentDashbordQueService.checkDefaultQue();
                res.status(201).json({ message });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = StudentDashbordQueController;
//# sourceMappingURL=studentdashbordque.controller.js.map