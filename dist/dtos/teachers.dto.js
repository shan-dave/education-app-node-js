"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTeacherDto = exports.CreateTeacherDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreateTeacherDto {
}
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateTeacherDto.prototype, "firstName", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateTeacherDto.prototype, "lastName", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateTeacherDto.prototype, "countryCode", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateTeacherDto.prototype, "phoneNumber", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateTeacherDto.prototype, "email", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateTeacherDto.prototype, "password", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateTeacherDto.prototype, "schoolId", void 0);
tslib_1.__decorate([
    class_validator_1.IsArray(),
    tslib_1.__metadata("design:type", Array)
], CreateTeacherDto.prototype, "endorsementId", void 0);
tslib_1.__decorate([
    class_validator_1.IsArray(),
    tslib_1.__metadata("design:type", Array)
], CreateTeacherDto.prototype, "gradeIds", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateTeacherDto.prototype, "edId", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], CreateTeacherDto.prototype, "addressLine1", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], CreateTeacherDto.prototype, "addressLine2", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateTeacherDto.prototype, "districtId", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateTeacherDto.prototype, "stateId", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateTeacherDto.prototype, "country", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateTeacherDto.prototype, "dateOfBirth", void 0);
exports.CreateTeacherDto = CreateTeacherDto;
class updateTeacherDto {
}
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], updateTeacherDto.prototype, "firstName", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], updateTeacherDto.prototype, "lastName", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], updateTeacherDto.prototype, "countryCode", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], updateTeacherDto.prototype, "phoneNumber", void 0);
tslib_1.__decorate([
    class_validator_1.IsArray(),
    tslib_1.__metadata("design:type", Array)
], updateTeacherDto.prototype, "gradeIds", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], updateTeacherDto.prototype, "addressLine1", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], updateTeacherDto.prototype, "addressLine2", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], updateTeacherDto.prototype, "districtId", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], updateTeacherDto.prototype, "stateId", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], updateTeacherDto.prototype, "country", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], updateTeacherDto.prototype, "dateOfBirth", void 0);
exports.updateTeacherDto = updateTeacherDto;
//# sourceMappingURL=teachers.dto.js.map