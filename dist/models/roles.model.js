"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const roleSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    }
}, { timestamps: true });
const roleModel = mongoose_1.default.model('roles', roleSchema);
exports.default = roleModel;
//# sourceMappingURL=roles.model.js.map