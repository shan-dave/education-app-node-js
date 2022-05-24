"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const queAnsStudentDashbordSchema = new mongoose_1.Schema({
    studentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'students',
        required: true
    },
    teacherId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    schoolId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'schools',
        required: true
    },
    districtId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'districts',
        required: true
    },
    queAns: [{
            questionId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'studentdashbordques',
                require: true
            },
            answer: {
                type: mongoose_1.Schema.Types.Mixed,
                require: true
            },
            otherAns: { type: String },
        }],
    isDeleted: {
        type: Boolean,
        default: false
    },
    isActivated: {
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
const queAnsStudentDashbordModel = mongoose_1.default.model('queansstudentdashbord', queAnsStudentDashbordSchema);
exports.default = queAnsStudentDashbordModel;
//# sourceMappingURL=queansstudentdashbord.model.js.map