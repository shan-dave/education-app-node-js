"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const validation_middleware_1 = tslib_1.__importDefault(require("../middlewares/validation.middleware"));
const auth_middleware_1 = tslib_1.__importDefault(require("../middlewares/auth.middleware"));
const teachers_controller_1 = tslib_1.__importDefault(require("../controllers/teachers.controller"));
const teachers_dto_1 = require("../dtos/teachers.dto");
class SubjectsRoute {
    constructor() {
        this.path = '/teachers';
        this.router = express_1.Router();
        this.teachersController = new teachers_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, validation_middleware_1.default(teachers_dto_1.CreateTeacherDto, 'body'), auth_middleware_1.default('create-teacher'), this.teachersController.createTeacher);
        this.router.put(`${this.path}/update/:teacherId`, validation_middleware_1.default(teachers_dto_1.updateTeacherDto, 'body'), auth_middleware_1.default('update-teacher'), this.teachersController.updateTeacher);
        this.router.put(`${this.path}/delete/:teacherId`, auth_middleware_1.default('delete-teacher'), this.teachersController.deleteTeacher);
        this.router.put(`${this.path}/change_status/:teacherId`, auth_middleware_1.default('activate-teacher'), this.teachersController.activateTeacher);
        this.router.post(`${this.path}/get`, auth_middleware_1.default('get-teacher'), this.teachersController.getTeacher);
    }
}
exports.default = SubjectsRoute;
//# sourceMappingURL=teachers.route.js.map