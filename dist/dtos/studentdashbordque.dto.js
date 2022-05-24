"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStudentDashbordQue = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreateStudentDashbordQue {
}
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateStudentDashbordQue.prototype, "questionType", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateStudentDashbordQue.prototype, "answerType", void 0);
tslib_1.__decorate([
    class_validator_1.IsBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], CreateStudentDashbordQue.prototype, "isAssignAllSchool", void 0);
tslib_1.__decorate([
    class_validator_1.IsBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], CreateStudentDashbordQue.prototype, "default", void 0);
tslib_1.__decorate([
    class_validator_1.IsBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], CreateStudentDashbordQue.prototype, "isRequired", void 0);
tslib_1.__decorate([
    class_validator_1.IsBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], CreateStudentDashbordQue.prototype, "isSelectMultiple", void 0);
tslib_1.__decorate([
    class_validator_1.IsBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], CreateStudentDashbordQue.prototype, "otherAnsRequired", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateStudentDashbordQue.prototype, "question", void 0);
tslib_1.__decorate([
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", Object)
], CreateStudentDashbordQue.prototype, "option", void 0);
tslib_1.__decorate([
    class_validator_1.IsArray(),
    tslib_1.__metadata("design:type", Array)
], CreateStudentDashbordQue.prototype, "assignedSchool", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], CreateStudentDashbordQue.prototype, "otherAnsRequiredValue", void 0);
exports.CreateStudentDashbordQue = CreateStudentDashbordQue;
//# sourceMappingURL=studentdashbordque.dto.js.map