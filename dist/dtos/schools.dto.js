"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSchoolSubAdminDto = exports.CreateSchoolSubAdminDto = exports.SchoolAssignToUserDto = exports.CreateSchoolDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreateSchoolDto {
}
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateSchoolDto.prototype, "schoolName", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateSchoolDto.prototype, "countryCode", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateSchoolDto.prototype, "zipCode", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateSchoolDto.prototype, "schoolPhoneNumber", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateSchoolDto.prototype, "addressLine1", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], CreateSchoolDto.prototype, "addressLine2", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateSchoolDto.prototype, "districtId", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateSchoolDto.prototype, "stateId", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateSchoolDto.prototype, "country", void 0);
exports.CreateSchoolDto = CreateSchoolDto;
class SchoolAssignToUserDto {
}
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], SchoolAssignToUserDto.prototype, "schoolId", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], SchoolAssignToUserDto.prototype, "userId", void 0);
exports.SchoolAssignToUserDto = SchoolAssignToUserDto;
class CreateSchoolSubAdminDto {
}
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateSchoolSubAdminDto.prototype, "schoolId", void 0);
tslib_1.__decorate([
    class_validator_1.IsEmail(),
    tslib_1.__metadata("design:type", String)
], CreateSchoolSubAdminDto.prototype, "email", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateSchoolSubAdminDto.prototype, "password", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateSchoolSubAdminDto.prototype, "firstName", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateSchoolSubAdminDto.prototype, "lastName", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateSchoolSubAdminDto.prototype, "countryCode", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateSchoolSubAdminDto.prototype, "phoneNumber", void 0);
exports.CreateSchoolSubAdminDto = CreateSchoolSubAdminDto;
class UpdateSchoolSubAdminDto {
}
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UpdateSchoolSubAdminDto.prototype, "firstName", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UpdateSchoolSubAdminDto.prototype, "lastName", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UpdateSchoolSubAdminDto.prototype, "countryCode", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], UpdateSchoolSubAdminDto.prototype, "phoneNumber", void 0);
exports.UpdateSchoolSubAdminDto = UpdateSchoolSubAdminDto;
//# sourceMappingURL=schools.dto.js.map