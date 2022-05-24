/// <reference types="mongoose" />
import { Role } from '../interfaces/roles.interface';
declare class CommonService {
    roles: import("mongoose").Model<Role & import("mongoose").Document<any, any, any>, {}, {}>;
    getRole(): Promise<Role[]>;
}
export default CommonService;
