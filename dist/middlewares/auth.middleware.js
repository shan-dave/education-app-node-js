"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const config_1 = tslib_1.__importDefault(require("config"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const HttpException_1 = tslib_1.__importDefault(require("../exceptions/HttpException"));
const users_model_1 = tslib_1.__importDefault(require("../models/users.model"));
const role_1 = require("../configs/role");
const roles_model_1 = tslib_1.__importDefault(require("../models/roles.model"));
const roles = roles_model_1.default;
const authMiddleware = (...requiredRights) => async (req, res, next) => {
    try {
        const Authorization = req.cookies['Authorization'] || req.header('Authorization').split('Bearer ')[1] || null;
        if (Authorization) {
            const secretKey = config_1.default.get('secretKey');
            const verificationResponse = (await jsonwebtoken_1.default.verify(Authorization, secretKey));
            const userId = verificationResponse._id;
            const findUser = await users_model_1.default.findById(userId).populate('role', 'name');
            if (findUser) {
                req.user = findUser;
                if (requiredRights.length) {
                    let userRole = findUser.role['name'];
                    let userRights = role_1.roleRights.get(userRole);
                    const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
                    if (!hasRequiredRights && req.params.userId !== findUser._id) {
                        next(new HttpException_1.default(403, 'Forbidden'));
                    }
                }
                next();
            }
            else {
                next(new HttpException_1.default(401, 'Wrong authentication token'));
            }
        }
        else {
            next(new HttpException_1.default(404, 'Authentication token missing'));
        }
    }
    catch (error) {
        next(new HttpException_1.default(401, 'Wrong authentication token'));
    }
};
exports.default = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map