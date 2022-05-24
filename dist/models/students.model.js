"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const studentSchema = new mongoose_1.Schema({
    sasId: {
        type: Number,
        require: true
    },
    assessementId: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    // assignTeacherId: [{
    //   type: Schema.Types.ObjectId,
    //   ref: 'teachers',
    //   // require: true
    // }],
    schoolId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'schools',
        require: true
    },
    gradeId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'grades',
        require: true
    },
    studentName: {
        type: String,
        require: true
    },
    // missingAnrolmentNo: {
    //   type: Boolean
    // },
    primaryLanguage: {
        type: String,
        require: true
    },
    lastYearImprovedFlag: {
        type: Boolean
    },
    serviceMinutes: {
        type: String,
    },
    programType: {
        type: String
    },
    yearsOfForeignEducation: {
        type: Number
    },
    screeningType: {
        type: String
    },
    screeningScore: {
        type: String
    },
    comment: {
        type: String
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
const studentModel = mongoose_1.model('students', studentSchema);
exports.default = studentModel;
//# sourceMappingURL=students.model.js.map