"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const auth_middleware_1 = tslib_1.__importDefault(require("../middlewares/auth.middleware"));
const express_1 = require("express");
const schools_controller_1 = tslib_1.__importDefault(require("../controllers/schools.controller"));
const validation_middleware_1 = tslib_1.__importDefault(require("../middlewares/validation.middleware"));
const schools_dto_1 = require("../dtos/schools.dto");
class SchoolsRoute {
    constructor() {
        this.path = '/schools';
        this.router = express_1.Router();
        this.schoolsController = new schools_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/create`, validation_middleware_1.default(schools_dto_1.CreateSchoolDto, 'body'), auth_middleware_1.default('create-school'), this.schoolsController.createSchool);
        this.router.post(`${this.path}/assign_to_user`, validation_middleware_1.default(schools_dto_1.SchoolAssignToUserDto, 'body'), auth_middleware_1.default('assign-school'), this.schoolsController.assignSchool);
        this.router.put(`${this.path}/unassign_to_user`, validation_middleware_1.default(schools_dto_1.SchoolAssignToUserDto, 'body'), auth_middleware_1.default('unassign-school'), this.schoolsController.unassignSchool);
        this.router.get(`${this.path}`, auth_middleware_1.default('get-school'), this.schoolsController.getSchool);
        // this.router.put(`${this.path}/delete/:schoolId`, authMiddleware('delete-school'), this.schoolsController.deleteSchool);
        // this.router.put(`${this.path}/activate/:schoolId`, authMiddleware('activate-school'), this.schoolsController.activateSchool);
        this.router.put(`${this.path}/update/:schoolId`, validation_middleware_1.default(schools_dto_1.CreateSchoolDto, 'body'), auth_middleware_1.default('update-school'), this.schoolsController.updateSchool);
        this.router.post(`${this.path}/create/school_sub_admin`, validation_middleware_1.default(schools_dto_1.CreateSchoolSubAdminDto, 'body'), auth_middleware_1.default('create-school-sub-admin'), this.schoolsController.createSchoolSubAdmin);
        this.router.put(`${this.path}/school_sub_admin/:schoolSubAdminId`, validation_middleware_1.default(schools_dto_1.UpdateSchoolSubAdminDto, 'body'), auth_middleware_1.default('update-school-sub-admin'), this.schoolsController.updateSchoolSubAdmin);
        this.router.delete(`${this.path}/school_sub_admin/:schoolSubAdminId`, auth_middleware_1.default('delete-school-sub-admin'), this.schoolsController.deleteSchoolSubAdmin);
        this.router.put(`${this.path}/school_sub_admin/change_status/:schoolSubAdminId`, auth_middleware_1.default('activate-school-sub-admin'), this.schoolsController.activateSchoolSubAdmin);
        this.router.get(`${this.path}/get/school_sub_admin`, auth_middleware_1.default('get-school-sub-admin'), this.schoolsController.getSchoolSubAdmin);
    }
}
exports.default = SchoolsRoute;
//# sourceMappingURL=schools.route.js.map