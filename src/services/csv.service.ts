import HttpException from '../exceptions/HttpException';
import { Country } from '../interfaces/countries.interface';
import { State } from '../interfaces/states.interface';
//import { City } from '../interfaces/districts.interface';
import countryModel from '../models/countries.model';
import stateModel from '../models/states.model';
import cityModel from '../models/districts.model';

class CSVService {
  public countries = countryModel;
  public states = stateModel;
  public cities = cityModel;
  
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

export default CSVService;
