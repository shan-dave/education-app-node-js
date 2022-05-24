"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const validation_middleware_1 = tslib_1.__importDefault(require("../middlewares/validation.middleware"));
const auth_middleware_1 = tslib_1.__importDefault(require("../middlewares/auth.middleware"));
const studentdashbordque_controller_1 = tslib_1.__importDefault(require("../controllers/studentdashbordque.controller"));
const studentdashbordque_dto_1 = require("../dtos/studentdashbordque.dto");
class StudentDashbordQueRoute {
    constructor() {
        this.path = '/stu_dashbord_que';
        this.router = express_1.Router();
        this.studentDashbordQueController = new studentdashbordque_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, auth_middleware_1.default('create-student-dashbord-que'), validation_middleware_1.default(studentdashbordque_dto_1.CreateStudentDashbordQue, 'body'), this.studentDashbordQueController.createStudentDashbordQue);
        this.router.put(`${this.path}/:queId`, auth_middleware_1.default('update-student-dashbord-que'), validation_middleware_1.default(studentdashbordque_dto_1.CreateStudentDashbordQue, 'body'), this.studentDashbordQueController.updateStudentDashbordQue);
        this.router.delete(`${this.path}/:queId`, auth_middleware_1.default('delete-student-dashbord-que'), this.studentDashbordQueController.deleteStudentDashbordQue);
        this.router.get(`${this.path}`, auth_middleware_1.default('get-student-dashbord-que'), this.studentDashbordQueController.getStudentDashbordQue);
        this.router.put(`${this.path}/change_status/:queId`, auth_middleware_1.default('active-student-dashbord-que'), this.studentDashbordQueController.activeStudentDashbordQue);
        this.router.post(`${this.path}/check_default`, auth_middleware_1.default('check_default-que'), this.studentDashbordQueController.checkDefaultQue);
    }
}
exports.default = StudentDashbordQueRoute;
//# sourceMappingURL=studentdashbordque.route.js.map