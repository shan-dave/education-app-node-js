"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const gradeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        require: true,
        default: false
    },
    isActivated: {
        type: Boolean,
        require: true,
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
const gradeModel = mongoose_1.default.model('grades', gradeSchema);
exports.default = gradeModel;
//# sourceMappingURL=grades.model.js.map