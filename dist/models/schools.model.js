"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schoolSchema = new mongoose_1.Schema({
    schoolName: {
        type: String,
        require: true
    },
    schoolPhoneNumber: {
        type: String,
        require: true
    },
    countryCode: {
        type: String,
        require: true
    },
    addressLine1: {
        type: String,
        require: true
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
    zipCode: {
        type: String,
        require: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isActivated: {
        type: Boolean,
        default: false
    },
    isAssigned: {
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
const schoolModel = mongoose_1.model('schools', schoolSchema);
exports.default = schoolModel;
//# sourceMappingURL=schools.model.js.map