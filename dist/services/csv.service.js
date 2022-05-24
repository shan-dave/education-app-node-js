"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
//import { City } from '../interfaces/districts.interface';
const countries_model_1 = tslib_1.__importDefault(require("../models/countries.model"));
const states_model_1 = tslib_1.__importDefault(require("../models/states.model"));
const districts_model_1 = tslib_1.__importDefault(require("../models/districts.model"));
class CSVService {
    constructor() {
        this.countries = countries_model_1.default;
        this.states = states_model_1.default;
        this.cities = districts_model_1.default;
        //   public async insertCsvData(csvData, userData): Promise<Country> {
        //     const findCountry: Country = await this.countries.findOne({ name: csvData.country.toLowerCase(), isDeleted:false });
        //     const findState: State = await this.states.findOne({ name: csvData.state.toLowerCase(), isDeleted:false });
        //     //const findCity: City = await this.cities.findOne({ name: csvData.city.toLowerCase(), isDeleted:false });
        //     let countryData: Country
        //     let stateData: State
        //     //let cityData: City
        //     if(!findCountry){
        //         countryData = await this.countries.create({
        //             name: csvData.country.toLowerCase(),
        //             countryCode: csvData.country_code,
        //             createdBy: userData._id
        //         })
        //     }
        //     if(!findState){
        //         stateData = await this.states.create({ 
        //         name: csvData.state.toLowerCase(),
        //         countryId: findCountry? findCountry._id : countryData._id,
        //         createdBy: userData._id
        //         })
        //     }
        //     if(!findCity){
        //         cityData = await this.cities.create({ 
        //             name: csvData.city.toLowerCase(),
        //             countryId: findCountry? findCountry._id : countryData._id,
        //             stateId: findState? findState._id : stateData._id,
        //             createdBy: userData._id
        //         })
        //     }
        //     return countryData;
        //   }
    }
}
exports.default = CSVService;
//# sourceMappingURL=csv.service.js.map