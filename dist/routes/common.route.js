"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const auth_middleware_1 = tslib_1.__importDefault(require("../middlewares/auth.middleware"));
const express_1 = require("express");
const common_controller_1 = tslib_1.__importDefault(require("../controllers/common.controller"));
const validation_middleware_1 = tslib_1.__importDefault(require("../middlewares/validation.middleware"));
const common_dto_1 = require("../dtos/common.dto");
class CommonsRoute {
    constructor() {
        this.path = '/';
        this.router = express_1.Router();
        this.commonController = new common_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        // this.router.post(`${this.path}insert/country`, validationMiddleware(CreateCountryDto, 'body'), authMiddleware('insert-country'), this.commonController.insertContry);39020202
        this.router.post(`${this.path}insert/state`, validation_middleware_1.default(common_dto_1.CreateStateDto, 'body'), auth_middleware_1.default('insert-state'), this.commonController.insertState);
        this.router.post(`${this.path}insert/district`, validation_middleware_1.default(common_dto_1.CreateDistrictDto, 'body'), auth_middleware_1.default('insert-disctict'), this.commonController.insertDistrict);
        // this.router.put(`${this.path}delete/country/:countryId`, validationMiddleware(DeleteCountryDto, 'params'), authMiddleware('delete-country'), this.commonController.deleteContry);
        this.router.delete(`${this.path}state/:stateId`, validation_middleware_1.default(common_dto_1.DeleteStateDto, 'params'), auth_middleware_1.default('delete-state'), this.commonController.deleteState);
        this.router.put(`${this.path}state/change_status/:stateId`, validation_middleware_1.default(common_dto_1.ChangeStateStatusDto, 'params'), auth_middleware_1.default('change-state-status'), this.commonController.changeStateStatus);
        this.router.delete(`${this.path}district/:districtId`, validation_middleware_1.default(common_dto_1.DeleteDistrictDto, 'params'), auth_middleware_1.default('delete-district'), this.commonController.deleteDistrict);
        this.router.put(`${this.path}district/change_status/:districtId`, validation_middleware_1.default(common_dto_1.ChangeDistrictStatusDto, 'params'), auth_middleware_1.default('change-district-status'), this.commonController.changeDistrictStatus);
        // this.router.get(`${this.path}get/country`, authMiddleware('country-list'), this.commonController.getCountry);
        this.router.get(`${this.path}get/state`, auth_middleware_1.default('state-list'), this.commonController.getState);
        this.router.get(`${this.path}get/district`, auth_middleware_1.default('district-list'), this.commonController.getDistrict);
        this.router.get(`${this.path}dashbord/school`, auth_middleware_1.default('dashbord'), this.commonController.getSchoolDashbord);
        // this.router.get(`${this.path}dashbord/country`, validationMiddleware(DashbordDto, 'query'), authMiddleware('dashbord'), this.commonController.getCountryDashbord);
        this.router.get(`${this.path}dashbord/state`, auth_middleware_1.default('dashbord'), this.commonController.getStateDashbord);
        this.router.get(`${this.path}dashbord/district`, auth_middleware_1.default('dashbord'), this.commonController.getDistrictDashbord);
        this.router.get(`${this.path}dashbord/student`, auth_middleware_1.default('dashbord'), this.commonController.getStudentDashbord);
        this.router.get(`${this.path}dashbord/teacher`, auth_middleware_1.default('dashbord'), this.commonController.getTeacherDashbord);
    }
}
exports.default = CommonsRoute;
//# sourceMappingURL=common.route.js.map