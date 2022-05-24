import HttpException from '../exceptions/HttpException';
import { Role } from '../interfaces/roles.interface';
import roleModel from '../models/roles.model';

class CommonService {
  public roles = roleModel;
  
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
  
  public async getRole(): Promise<Role[]> {
    const findRole: Role[] = await this.roles.find();
    if (!findRole) throw new HttpException(409, `Role record not found`);
  
    return findRole;
  }
}

export default CommonService;
