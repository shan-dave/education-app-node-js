"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const auth_route_1 = tslib_1.__importDefault(require("../routes/auth.route"));
const index_route_1 = tslib_1.__importDefault(require("../routes/index.route"));
const users_route_1 = tslib_1.__importDefault(require("../routes/users.route"));
const schools_route_1 = tslib_1.__importDefault(require("../routes/schools.route"));
const csv_routes_1 = tslib_1.__importDefault(require("../routes/csv.routes"));
const common_route_1 = tslib_1.__importDefault(require("../routes/common.route"));
const roles_route_1 = tslib_1.__importDefault(require("../routes/roles.route"));
const endorsements_route_1 = tslib_1.__importDefault(require("../routes/endorsements.route"));
const teachers_route_1 = tslib_1.__importDefault(require("../routes/teachers.route"));
const studentdashbordque_route_1 = tslib_1.__importDefault(require("../routes/studentdashbordque.route"));
const students_route_1 = tslib_1.__importDefault(require("../routes/students.route"));
const queansstudentdashbord_route_1 = tslib_1.__importDefault(require("../routes/queansstudentdashbord.route"));
const reports_route_1 = tslib_1.__importDefault(require("../routes/reports.route"));
const grades_route_1 = tslib_1.__importDefault(require("../routes/grades.route"));
class IndexController {
    constructor() {
        this.index = (req, res, next) => {
            try {
                res.sendStatus(200);
            }
            catch (error) {
                next(error);
            }
        };
    }
    /**
     * initializeAllRoutes
     */
    initializeAllRoutes() {
        return [new index_route_1.default(), new users_route_1.default(), new auth_route_1.default(), new schools_route_1.default(), new csv_routes_1.default(), new common_route_1.default(), new roles_route_1.default(), new endorsements_route_1.default(), new teachers_route_1.default(), new studentdashbordque_route_1.default(), new queansstudentdashbord_route_1.default(), new students_route_1.default(), new reports_route_1.default(), new grades_route_1.default()];
    }
}
exports.default = IndexController;
//# sourceMappingURL=index.controller.js.map