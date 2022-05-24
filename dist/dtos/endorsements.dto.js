"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEndorsementDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
class CreateEndorsementDto {
}
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateEndorsementDto.prototype, "name", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateEndorsementDto.prototype, "number", void 0);
exports.CreateEndorsementDto = CreateEndorsementDto;
//# sourceMappingURL=endorsements.dto.js.map