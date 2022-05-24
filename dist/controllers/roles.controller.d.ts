import { NextFunction, Request, Response } from 'express';
import roleService from '../services/roles.service';
declare class RolesController {
    roleService: roleService;
    getRole: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export default RolesController;
