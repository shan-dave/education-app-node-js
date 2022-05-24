"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const validation_middleware_1 = tslib_1.__importDefault(require("../middlewares/validation.middleware"));
const auth_middleware_1 = tslib_1.__importDefault(require("../middlewares/auth.middleware"));
const queansstudentdashbord_controller_1 = tslib_1.__importDefault(require("../controllers/queansstudentdashbord.controller"));
const queansstudentdashbord_dto_1 = require("../dtos/queansstudentdashbord.dto");
class QueAnsStudentDashbordRoute {
    constructor() {
        this.path = '/queans_student_dashbord';
        this.router = express_1.Router();
        this.queAnsStudentDashbordController = new queansstudentdashbord_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, auth_middleware_1.default('create-student-dashbord-queans'), validation_middleware_1.default(queansstudentdashbord_dto_1.CreateQueAnsStudentDashbordDto, 'body'), this.queAnsStudentDashbordController.createQueAnsStudentDashbord);
        this.router.get(`${this.path}/chart1`, auth_middleware_1.default('get-student-dashbord-queans-list'), this.queAnsStudentDashbordController.getQueAnsStudentDashbordListChart1);
        this.router.get(`${this.path}/attendance_chart`, auth_middleware_1.default('get-student-dashbord-queans-list'), this.queAnsStudentDashbordController.getQueAnsStudentDashbordListAttendanceChart);
        this.router.get(`${this.path}/chart2`, auth_middleware_1.default('get-student-dashbord-queans-list'), this.queAnsStudentDashbordController.getQueAnsStudentDashbordListChart2);
        this.router.get(`${this.path}/chart3`, auth_middleware_1.default('get-student-dashbord-queans-list'), this.queAnsStudentDashbordController.getQueAnsStudentDashbordListChart3);
        this.router.get(`${this.path}/chart4`, auth_middleware_1.default('get-student-dashbord-queans-list'), this.queAnsStudentDashbordController.getQueAnsStudentDashbordListChart4);
        this.router.get(`${this.path}/chart5`, auth_middleware_1.default('get-student-dashbord-queans-list'), this.queAnsStudentDashbordController.getQueAnsStudentDashbordListChart5);
        this.router.get(`${this.path}/chart6`, auth_middleware_1.default('get-student-dashbord-queans-list'), this.queAnsStudentDashbordController.getQueAnsStudentDashbordListChart6);
    }
}
exports.default = QueAnsStudentDashbordRoute;
//# sourceMappingURL=queansstudentdashbord.route.js.map