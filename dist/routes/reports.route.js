"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const validation_middleware_1 = tslib_1.__importDefault(require("../middlewares/validation.middleware"));
const auth_middleware_1 = tslib_1.__importDefault(require("../middlewares/auth.middleware"));
const reports_controller_1 = tslib_1.__importDefault(require("../controllers/reports.controller"));
const reports_dto_1 = require("../dtos/reports.dto");
class ReportsRoute {
    constructor() {
        this.path = '/reports';
        this.router = express_1.Router();
        this.reportsController = new reports_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, validation_middleware_1.default(reports_dto_1.CreateReportDto, 'body'), auth_middleware_1.default('create-report'), this.reportsController.createReport);
        this.router.put(`${this.path}/:reportId`, validation_middleware_1.default(reports_dto_1.CreateReportDto, 'body'), auth_middleware_1.default('update-report'), this.reportsController.updateReport);
        this.router.delete(`${this.path}/:reportId`, auth_middleware_1.default('delete-report'), this.reportsController.deleteReport);
        this.router.put(`${this.path}/change_status/:reportId`, auth_middleware_1.default('activate-report'), this.reportsController.activateReport);
        this.router.get(`${this.path}`, auth_middleware_1.default('get-student'), this.reportsController.getReport);
    }
}
exports.default = ReportsRoute;
//# sourceMappingURL=reports.route.js.map