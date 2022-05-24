"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReportDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreateReportDto {
}
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateReportDto.prototype, "name", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateReportDto.prototype, "startDate", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateReportDto.prototype, "endDate", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], CreateReportDto.prototype, "schoolId", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], CreateReportDto.prototype, "districtId", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], CreateReportDto.prototype, "teacherId", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], CreateReportDto.prototype, "studentId", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], CreateReportDto.prototype, "questionId", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], CreateReportDto.prototype, "answer", void 0);
exports.CreateReportDto = CreateReportDto;
//# sourceMappingURL=reports.dto.js.map