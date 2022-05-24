import { Request } from 'express';
import { User } from '../interfaces/users.interface';

export interface DataStoredInToken {
  _id: string;
  ist: number;
  exp: number;
}

export interface TokenData {
  token: string;
  // expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}

export interface DataStoredInTokenForResetPassword {
  _id: string;
  authUserData: string;
  ist: number;
  exp: number;
}