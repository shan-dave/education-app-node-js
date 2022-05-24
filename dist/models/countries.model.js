"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const countrySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    countryCode: {
        type: String,
        required: true
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
const countryModel = mongoose_1.default.model('countries', countrySchema);
exports.default = countryModel;
//# sourceMappingURL=countries.model.js.map