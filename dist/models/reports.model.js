"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const reportSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    startDate: {
        type: String,
        require: true
    },
    endDate: {
        type: String,
        require: true
    },
    districtId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'districts',
    },
    schoolId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'schools',
    },
    teacherId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
    },
    studentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'students',
    },
    questionId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'studentdashbordques',
    },
    answer: {
        type: String,
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
const reportModel = mongoose_1.default.model('reports', reportSchema);
exports.default = reportModel;
//# sourceMappingURL=reports.model.js.map