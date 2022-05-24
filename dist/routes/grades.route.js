"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const auth_middleware_1 = tslib_1.__importDefault(require("../middlewares/auth.middleware"));
const express_1 = require("express");
const grades_controller_1 = tslib_1.__importDefault(require("../controllers/grades.controller"));
const validation_middleware_1 = tslib_1.__importDefault(require("../middlewares/validation.middleware"));
const grades_dto_1 = require("../dtos/grades.dto");
class GradesRoute {
    constructor() {
        this.path = '/grades';
        this.router = express_1.Router();
        this.gradeController = new grades_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, auth_middleware_1.default('grade-list'), this.gradeController.getGrade);
        this.router.post(`${this.path}`, auth_middleware_1.default('create-grade'), validation_middleware_1.default(grades_dto_1.CreateGradeDto, 'body'), this.gradeController.createGrade);
        this.router.put(`${this.path}/change_status/:gradeId`, auth_middleware_1.default('change-grade-status'), this.gradeController.changeGradeStatus);
        this.router.delete(`${this.path}/:gradeId`, auth_middleware_1.default('delete-grade'), this.gradeController.deleteGrade);
    }
}
exports.default = GradesRoute;
//# sourceMappingURL=grades.route.js.map