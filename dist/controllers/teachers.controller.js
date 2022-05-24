"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const teachers_service_1 = tslib_1.__importDefault(require("../services/teachers.service"));
const email_service_1 = tslib_1.__importDefault(require("../services/email.service"));
class TeachersController {
    constructor() {
        this.teacherService = new teachers_service_1.default();
        this.createTeacher = async (req, res, next) => {
            try {
                const { createTeacherData, createUserData } = await this.teacherService.createTeacher(req.body, req.user);
                await email_service_1.default.sendEmail(createUserData.email, 'Verify your credentials', { username: createUserData.email, password: req.body.password });
                res.status(201).json({ message: 'Teacher created successfully' });
            }
            catch (error) {
                next(error);
            }
        };
        this.updateTeacher = async (req, res, next) => {
            try {
                const teacherData = req.body;
                const teacherId = req.params.teacherId;
                const userData = req.user;
                const updateTeacherData = await this.teacherService.updateTeacher(teacherId, teacherData, userData);
                res.status(200).json({ data: updateTeacherData, message: 'Teacher updated successfully' });
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteTeacher = async (req, res, next) => {
            try {
                const teacherId = req.params.teacherId;
                const userData = req.user;
                const deleteSubjectData = await this.teacherService.deleteTeacher(teacherId, userData);
                res.status(200).json({ data: deleteSubjectData, message: 'Teacher deleted successfully' });
            }
            catch (error) {
                next(error);
            }
        };
        this.activateTeacher = async (req, res, next) => {
            try {
                const teacherId = req.params.teacherId;
                const userData = req.user;
                const { activateTeacherData, activateTeacherUserData, statusMode } = await this.teacherService.acivateTeacher(teacherId, userData);
                res.status(200).json({ data: activateTeacherData, message: `Teacher "${activateTeacherData.firstName} ${activateTeacherData.lastName}" ${statusMode} successfully` });
            }
            catch (error) {
                next(error);
            }
        };
        this.getTeacher = async (req, res, next) => {
            var _a, _b;
            try {
                const getTeacher = await this.teacherService.getTeacher(req.body);
                const teacherRecords = getTeacher ? getTeacher[0]['data'] : [];
                const teacherCount = getTeacher ? getTeacher[0]['count'][0] ? (_b = (_a = getTeacher[0]) === null || _a === void 0 ? void 0 : _a['count'][0]) === null || _b === void 0 ? void 0 : _b.count : 0 : 0;
                res.status(200).json({ data: teacherRecords, count: teacherCount, message: 'Teacher record fetch successfully' });
            }
            catch (err) {
                next(err);
            }
        };
    }
}
exports.default = TeachersController;
//# sourceMappingURL=teachers.controller.js.map