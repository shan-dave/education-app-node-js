"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const endorsementSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isActivated: {
        type: Boolean,
        default: false
    },
    deletedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users'
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users'
    },
    updatedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users'
    },
    deletedAt: {
        type: Date
    }
}, { timestamps: true });
const endorsementModel = mongoose_1.default.model('endorsements', endorsementSchema);
exports.default = endorsementModel;
//# sourceMappingURL=endorsements.model.js.map