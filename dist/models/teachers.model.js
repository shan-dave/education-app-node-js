"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const teacherSchema = new mongoose_1.Schema({
    endorsementId: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'endorsements',
            require: true
        }],
    firstName: {
        type: String,
        require: true
    },
    // teacherId: {
    //   type: String,
    //   require:true
    // },
    edId: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    schoolId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'schools',
        require: true
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
        require: true
    },
    gradeIds: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'grades',
            require: true
        }],
    addressLine1: {
        type: String
    },
    addressLine2: {
        type: String
    },
    districtId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'districts',
        require: true
    },
    stateId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'states',
        require: true
    },
    country: {
        type: String,
        require: true
    },
    dateOfBirth: {
        type: Date,
        require: true
    },
    deletedAt: {
        type: Date,
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
    }
}, { timestamps: true });
const teacherModel = mongoose_1.model('teachers', teacherSchema);
exports.default = teacherModel;
//# sourceMappingURL=teachers.model.js.map