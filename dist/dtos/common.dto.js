"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashbordDto = exports.CreateDistrictDto = exports.CreateStateDto = exports.GetStateDto = exports.DeleteDistrictDto = exports.DeleteStateDto = exports.ChangeDistrictStatusDto = exports.ChangeStateStatusDto = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
// export class CreateCountryDto {
//     @IsString()
//     public countryName: string;
//     @IsString()
//     public countryCode: string;
// }
class ChangeStateStatusDto {
}
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], ChangeStateStatusDto.prototype, "stateId", void 0);
exports.ChangeStateStatusDto = ChangeStateStatusDto;
class ChangeDistrictStatusDto {
}
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], ChangeDistrictStatusDto.prototype, "districtId", void 0);
exports.ChangeDistrictStatusDto = ChangeDistrictStatusDto;
class DeleteStateDto {
}
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], DeleteStateDto.prototype, "stateId", void 0);
exports.DeleteStateDto = DeleteStateDto;
class DeleteDistrictDto {
}
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], DeleteDistrictDto.prototype, "districtId", void 0);
exports.DeleteDistrictDto = DeleteDistrictDto;
class GetStateDto {
}
tslib_1.__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], GetStateDto.prototype, "status", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], GetStateDto.prototype, "stateId", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsOptional(),
    tslib_1.__metadata("design:type", String)
], GetStateDto.prototype, "search", void 0);
exports.GetStateDto = GetStateDto;
class CreateStateDto {
}
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateStateDto.prototype, "name", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateStateDto.prototype, "country", void 0);
exports.CreateStateDto = CreateStateDto;
class CreateDistrictDto {
}
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateDistrictDto.prototype, "name", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateDistrictDto.prototype, "sauCode", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], CreateDistrictDto.prototype, "stateId", void 0);
exports.CreateDistrictDto = CreateDistrictDto;
class DashbordDto {
}
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], DashbordDto.prototype, "startDate", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], DashbordDto.prototype, "endDate", void 0);
exports.DashbordDto = DashbordDto;
//# sourceMappingURL=common.dto.js.map