import { Request } from 'express';
import { User } from './users.interface';
export interface File {
    path?: string;
}
export interface IGetUserAuthInfo extends Request {
    user?: User;
    file?: File;
}
