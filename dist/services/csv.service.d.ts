/// <reference types="mongoose" />
import { Country } from '../interfaces/countries.interface';
import { State } from '../interfaces/states.interface';
declare class CSVService {
    countries: import("mongoose").Model<Country & import("mongoose").Document<any, any, any>, {}, {}>;
    states: import("mongoose").Model<State & import("mongoose").Document<any, any, any>, {}, {}>;
    cities: import("mongoose").Model<import("../interfaces/districts.interface").District & import("mongoose").Document<any, any, any>, {}, {}>;
}
export default CSVService;
