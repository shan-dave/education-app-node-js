import config from 'config';
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import HttpException from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '../interfaces/auth.interface';
import userModel from '../models/users.model';
import { roleRights } from '../configs/role';
import roleModel from '../models/roles.model';
import moment from 'moment';
const roles = roleModel
const authMiddleware = (...requiredRights) =>  async (req: RequestWithUser, res: Response, next: NextFunction) => {
  
  try {
    const Authorization = req.cookies['Authorization'] || req.header('Authorization').split('Bearer ')[1] || null;

    if (Authorization) {
      const secretKey: string = config.get('secretKey');
      const verificationResponse = (await jwt.verify(Authorization, secretKey)) as DataStoredInToken;
      const userId = verificationResponse._id;
      const findUser = await userModel.findById(userId).populate('role', 'name')
      
      if (findUser) {
        req.user = findUser;
        if (requiredRights.length) {
          let userRole = findUser.role['name']
          let userRights = roleRights.get(userRole);
          const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
          if (!hasRequiredRights && req.params.userId !== findUser._id) {
            next(new HttpException(403, 'Forbidden'));
          }
        } 
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
