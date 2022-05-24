"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const validation_middleware_1 = tslib_1.__importDefault(require("../middlewares/validation.middleware"));
const auth_middleware_1 = tslib_1.__importDefault(require("../middlewares/auth.middleware"));
const endorsements_controller_1 = tslib_1.__importDefault(require("../controllers/endorsements.controller"));
const endorsements_dto_1 = require("../dtos/endorsements.dto");
class EndorsementsRoute {
    constructor() {
        this.path = '/endorsements';
        this.router = express_1.Router();
        this.endorsementController = new endorsements_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, validation_middleware_1.default(endorsements_dto_1.CreateEndorsementDto, 'body'), auth_middleware_1.default('create-endorsement'), this.endorsementController.createEndorsement);
        this.router.put(`${this.path}/update/:endorsementId`, validation_middleware_1.default(endorsements_dto_1.CreateEndorsementDto, 'body'), auth_middleware_1.default('update-endorsement'), this.endorsementController.updateEndorsement);
        this.router.delete(`${this.path}/:endorsementId`, auth_middleware_1.default('delete-endorsement'), this.endorsementController.deleteEndorsement);
        this.router.get(`${this.path}`, auth_middleware_1.default('get-endorsement'), this.endorsementController.getEndorsement);
        this.router.put(`${this.path}/change_status/:endorsementId`, auth_middleware_1.default('change-endorsement-status'), this.endorsementController.changeEndorsementStatus);
    }
}
exports.default = EndorsementsRoute;
//# sourceMappingURL=endorsements.route.js.map