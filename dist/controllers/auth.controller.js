"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const auth_service_1 = tslib_1.__importDefault(require("../services/auth.service"));
const email_service_1 = tslib_1.__importDefault(require("../services/email.service"));
class AuthController {
    constructor() {
        this.authService = new auth_service_1.default();
        this.signUp = async (req, res, next) => {
            try {
                const userData = req.body;
                const signUpUserData = await this.authService.signup(userData);
                res.status(201).json({ data: signUpUserData, message: 'signup' });
            }
            catch (error) {
                next(error);
            }
        };
        this.logIn = async (req, res, next) => {
            try {
                const userData = req.body;
                const { accessToken, findUser } = await this.authService.login(userData);
                res.status(200).json({ data: { accessToken, role: findUser.role['name'] }, message: 'Successfully login' });
            }
            catch (error) {
                next(error);
            }
        };
        this.logOut = async (req, res, next) => {
            try {
                const userData = req.user;
                const logOutUserData = await this.authService.logout(userData);
                res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
                res.status(200).json({ message: 'Successfully logout' });
            }
            catch (error) {
                next(error);
            }
        };
        this.resetPasswordSendMail = async (req, res, next) => {
            try {
                const userData = req.user;
                const userId = req.body.userId;
                const { accessToken, findUser } = await this.authService.resetPasswordForMail(userId, userData);
                await email_service_1.default.sendResetPasswordEmail(findUser.email, findUser, accessToken);
                res.status(200).json({ message: `Reset Password mail successfully sent on ${findUser.email}` });
            }
            catch (error) {
                next(error);
            }
        };
        this.resetPasswordSemdMailByUser = async (req, res, next) => {
            try {
                const email = req.body.email;
                const { accessToken, findUser } = await this.authService.resetPasswordByUserForMail(email);
                await email_service_1.default.sendResetPasswordEmail(findUser.email, findUser, accessToken);
                res.status(200).json({ message: `Reset Password mail successfully sent on ${findUser.email}` });
            }
            catch (error) {
                next(error);
            }
        };
        this.resetPassword = async (req, res, next) => {
            try {
                const token = req.body.token;
                const password = req.body.password;
                const findUser = await this.authService.resetPassword(token, password);
                res.status(200).json({ message: `Reset Password successfully` });
            }
            catch (error) {
                next(error);
            }
        };
        this.changePassword = async (req, res, next) => {
            try {
                const user = req.user;
                const body = req.body;
                const findUser = await this.authService.changePassword(body, user);
                res.status(200).json({ message: `Change Password successfully` });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map