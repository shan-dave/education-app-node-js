"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const auth_controller_1 = tslib_1.__importDefault(require("../controllers/auth.controller"));
const users_dto_1 = require("../dtos/users.dto");
const auth_middleware_1 = tslib_1.__importDefault(require("../middlewares/auth.middleware"));
const validation_middleware_1 = tslib_1.__importDefault(require("../middlewares/validation.middleware"));
class AuthRoute {
    constructor() {
        this.path = '/';
        this.router = express_1.Router();
        this.authController = new auth_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}signup`, this.authController.signUp);
        this.router.post(`${this.path}login`, validation_middleware_1.default(users_dto_1.LoginUserDto, 'body'), this.authController.logIn);
        this.router.post(`${this.path}logout`, auth_middleware_1.default('logout'), this.authController.logOut);
        this.router.post(`${this.path}send_mail/reset_password`, validation_middleware_1.default(users_dto_1.ResetPasswordMailDto, 'body'), auth_middleware_1.default('send-mail-reset-password'), this.authController.resetPasswordSendMail);
        this.router.post(`${this.path}reset_password_by_auth`, validation_middleware_1.default(users_dto_1.ResetPasswordDto, 'body'), this.authController.resetPassword);
        this.router.post(`${this.path}change_password`, validation_middleware_1.default(users_dto_1.changePasswordByUserDto, 'body'), auth_middleware_1.default('change-password'), this.authController.changePassword);
        this.router.post(`${this.path}send_mail/reset_password_by_user`, validation_middleware_1.default(users_dto_1.ResetPasswordByUserDto, 'body'), this.authController.resetPasswordSemdMailByUser);
    }
}
exports.default = AuthRoute;
//# sourceMappingURL=auth.route.js.map