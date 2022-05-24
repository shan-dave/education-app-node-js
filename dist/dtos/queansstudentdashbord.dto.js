"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueAns = exports.CreateQueAnsStudentDashbordDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateQueAnsStudentDashbordDto {
}
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateQueAnsStudentDashbordDto.prototype, "studentId", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateQueAnsStudentDashbordDto.prototype, "districtId", void 0);
tslib_1.__decorate([
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => QueAns),
    tslib_1.__metadata("design:type", Array)
], CreateQueAnsStudentDashbordDto.prototype, "queAns", void 0);
exports.CreateQueAnsStudentDashbordDto = CreateQueAnsStudentDashbordDto;
class QueAns {
}
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], QueAns.prototype, "questionId", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", String)
], QueAns.prototype, "answer", void 0);
tslib_1.__decorate([
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], QueAns.prototype, "otherAns", void 0);
exports.QueAns = QueAns;
//# sourceMappingURL=queansstudentdashbord.dto.js.map