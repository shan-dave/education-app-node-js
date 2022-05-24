"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const roles_service_1 = tslib_1.__importDefault(require("../services/roles.service"));
class RolesController {
    constructor() {
        this.roleService = new roles_service_1.default();
        this.getRole = async (req, res, next) => {
            try {
                const createRole = await this.roleService.getRole();
                res.status(200).json({ data: createRole, message: 'Roles record fetch successfully' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = RolesController;
//# sourceMappingURL=roles.controller.js.map