"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const HttpException_1 = tslib_1.__importDefault(require("../exceptions/HttpException"));
const roles_model_1 = tslib_1.__importDefault(require("../models/roles.model"));
class CommonService {
    constructor() {
        this.roles = roles_model_1.default;
    }
    //   public async insertRole(countryData, userData): Promise<Country> {
    //     const findCountry: Country = await this.countries.findOne({ name: countryData.countryName.toLowerCase(), isDeleted: false });
    //     if (findCountry) throw new HttpException(409, `Country ${countryData.countryName} is already exist`);
    //     const insertedCountryData: Country = await this.countries.create({
    //         name: countryData.countryName.toLowerCase(),
    //         countryCode: countryData.countryCode,
    //         createdBy: userData._id
    //     })
    //     return insertedCountryData;
    //   }
    async getRole() {
        const findRole = await this.roles.find();
        if (!findRole)
            throw new HttpException_1.default(409, `Role record not found`);
        return findRole;
    }
}
exports.default = CommonService;
//# sourceMappingURL=roles.service.js.map