"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const studentDashbordQueSchema = new mongoose_1.Schema({
    questionType: {
        type: String,
        required: true
    },
    answerType: {
        type: String,
        required: true
    },
    isAssignAllSchool: {
        type: Boolean,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    default: {
        type: Boolean,
        required: true
    },
    otherAnsRequired: {
        type: Boolean,
        required: true
    },
    isRequired: {
        type: Boolean,
        required: true
    },
    isSelectMultiple: {
        type: Boolean,
        required: true
    },
    otherAnsRequiredValue: {
        type: String
    },
    option: mongoose_1.Schema.Types.Mixed,
    assignedSchool: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'schools'
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
const studentDashbordQueModel = mongoose_1.default.model('studentdashbordques', studentDashbordQueSchema);
exports.default = studentDashbordQueModel;
//# sourceMappingURL=studentdeashbordque.model.js.map