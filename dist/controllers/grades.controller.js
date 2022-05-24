"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const grades_service_1 = tslib_1.__importDefault(require("../services/grades.service"));
class GradesController {
    constructor() {
        this.gradeService = new grades_service_1.default();
        this.createGrade = async (req, res, next) => {
            try {
                const createGrade = await this.gradeService.creatGradee(req.body, req.user);
                res.status(201).json({ data: createGrade, message: `Grade "${createGrade.name}" created successfully` });
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteGrade = async (req, res, next) => {
            try {
                const deleteGradeData = await this.gradeService.deleteGrade(req.params.gradeId, req.user);
                res.status(200).json({ data: deleteGradeData, message: `Grade "${deleteGradeData.name}" deleted successfully` });
            }
            catch (error) {
                next(error);
            }
        };
        this.changeGradeStatus = async (req, res, next) => {
            try {
                const { gradeData, statusMode } = await this.gradeService.changeGradeStatus(req.params.gradeId, req.user);
                res.status(200).json({ data: gradeData, message: `Grade "${gradeData.name}" ${statusMode} successfully` });
            }
            catch (error) {
                next(error);
            }
        };
        this.getGrade = async (req, res, next) => {
            try {
                const getGrade = await this.gradeService.getGrade(req.query, req.user);
                res.status(200).json({ data: getGrade, count: getGrade.length, message: 'Grade records fetch successfully' });
            }
            catch (err) {
                next(err);
            }
        };
    }
}
exports.default = GradesController;
//# sourceMappingURL=grades.controller.js.map