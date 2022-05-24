"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const auth_middleware_1 = tslib_1.__importDefault(require("../middlewares/auth.middleware"));
const express_1 = require("express");
const roles_controller_1 = tslib_1.__importDefault(require("../controllers/roles.controller"));
// import { CreateCityDto, CreateCountryDto, CreateStateDto, DeleteCountryDto, DeleteStateDto, DeleteCityDto} from '../dtos/common.dto'
class CommonsRoute {
    constructor() {
        this.path = '/role';
        this.router = express_1.Router();
        this.roleController = new roles_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, auth_middleware_1.default('role-list'), this.roleController.getRole);
        // this.router.get(`/get/city`, authMiddleware('city-list'), this.commonController.getCity);
    }
}
exports.default = CommonsRoute;
//# sourceMappingURL=roles.route.js.map