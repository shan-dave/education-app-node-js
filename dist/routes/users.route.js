"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const users_controller_1 = tslib_1.__importDefault(require("../controllers/users.controller"));
const users_dto_1 = require("../dtos/users.dto");
const validation_middleware_1 = tslib_1.__importDefault(require("../middlewares/validation.middleware"));
const auth_middleware_1 = tslib_1.__importDefault(require("../middlewares/auth.middleware"));
class UsersRoute {
    constructor() {
        this.path = '/users';
        this.router = express_1.Router();
        this.usersController = new users_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        // this.router.get(`${this.path}`, this.usersController.getUsers);
        // this.router.get(`${this.path}/:id`, this.usersController.getUserById);
        // this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);
        // this.router.put(`${this.path}/:id`, validationMiddleware(CreateUserDto, 'body', true), this.usersController.updateUser);
        // this.router.delete(`${this.path}/:id`, this.usersController.deleteUser);
        this.router.post(`${this.path}/school_admin`, validation_middleware_1.default(users_dto_1.CreateUserDto, 'body'), auth_middleware_1.default('create-school-admin'), this.usersController.createSchoolUser);
        this.router.put(`${this.path}/school_admin/:schoolAdminId`, validation_middleware_1.default(users_dto_1.UpdateUserDto, 'body'), auth_middleware_1.default('update-school-admin'), this.usersController.updateSchoolUser);
        this.router.delete(`${this.path}/school_admin/:schoolAdminId`, auth_middleware_1.default('delete-school-admin'), this.usersController.deleteSchoolUser);
        this.router.get(`${this.path}/school_admin`, auth_middleware_1.default('get-school-admin'), this.usersController.getSchoolAdmin);
        this.router.put(`${this.path}/school_admin/change_status/:schoolAdminId`, auth_middleware_1.default('activate-school-admin'), this.usersController.activateSchoolUser);
        this.router.get(`${this.path}/profile`, auth_middleware_1.default('get-user-profile'), this.usersController.getUserProfile);
        this.router.put(`${this.path}/admin/:adminId`, validation_middleware_1.default(users_dto_1.UpdateUserDto, 'body'), auth_middleware_1.default('update-admin-user'), this.usersController.updateAdminUser);
        this.router.get(`${this.path}/admin/:adminId`, auth_middleware_1.default('get-admin-user'), this.usersController.getAdminUser);
    }
}
exports.default = UsersRoute;
//# sourceMappingURL=users.route.js.map