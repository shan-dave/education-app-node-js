"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const validation_middleware_1 = tslib_1.__importDefault(require("../middlewares/validation.middleware"));
const auth_middleware_1 = tslib_1.__importDefault(require("../middlewares/auth.middleware"));
const students_controller_1 = tslib_1.__importDefault(require("../controllers/students.controller"));
const students_dto_1 = require("../dtos/students.dto");
class StudentsRoute {
    constructor() {
        this.path = '/students';
        this.router = express_1.Router();
        this.studentsController = new students_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, validation_middleware_1.default(students_dto_1.CreateStudentDto, 'body'), auth_middleware_1.default('create-student'), this.studentsController.createStudent);
        this.router.put(`${this.path}/:studentId`, validation_middleware_1.default(students_dto_1.UpdateStudentDto, 'body'), auth_middleware_1.default('update-student'), this.studentsController.updateStudent);
        this.router.delete(`${this.path}/:studentId`, auth_middleware_1.default('delete-student'), this.studentsController.deleteStudent);
        this.router.put(`${this.path}/change_status/:studentId`, auth_middleware_1.default('activate-student'), this.studentsController.activateStudent);
        this.router.get(`${this.path}`, auth_middleware_1.default('get-student'), this.studentsController.getStudent);
        // this.router.post(`${this.path}/assign_teacher`, authMiddleware('assign-teacher'), this.studentsController.assignTeacher);
    }
}
exports.default = StudentsRoute;
//# sourceMappingURL=students.route.js.map