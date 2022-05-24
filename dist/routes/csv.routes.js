"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const auth_middleware_1 = tslib_1.__importDefault(require("../middlewares/auth.middleware"));
const express_1 = require("express");
const csv_controller_1 = tslib_1.__importDefault(require("../controllers/csv.controller"));
const media_controller_1 = tslib_1.__importDefault(require("../controllers/media.controller"));
// import {CreateSchoolDto} from '../dtos/schools.dto'
class SchoolsRoute {
    constructor() {
        this.path = '/insert_csv';
        this.router = express_1.Router();
        this.csvController = new csv_controller_1.default();
        this.mediaController = new media_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/create`, auth_middleware_1.default('insert-csv'), this.mediaController.upload, this.csvController.insertCSV);
    }
}
exports.default = SchoolsRoute;
//# sourceMappingURL=csv.routes.js.map