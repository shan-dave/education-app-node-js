"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const districtSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    sauCode: {
        type: String,
        required: true
    },
    stateId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'states',
        required: true
    },
    isActivated: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users'
    },
    updatedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users'
    },
    deletedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users'
    },
    deletedAt: {
        type: Date
    }
}, { timestamps: true });
const districtModel = mongoose_1.default.model('districts', districtSchema);
exports.default = districtModel;
//# sourceMappingURL=districts.model.js.map