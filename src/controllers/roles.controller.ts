import { NextFunction, Request, Response } from 'express';
// import { CreateUserDto } from '../dtos/users.dto';
import { Role } from '../interfaces/roles.interface';
import roleService from '../services/roles.service';

class RolesController {
  public roleService = new roleService();

  public getRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createRole = await this.roleService.getRole();
      res.status(200).json({data: createRole, message: 'Roles record fetch successfully' });
    } catch (error) {
      next(error);
    }
  };
}

export default RolesController;