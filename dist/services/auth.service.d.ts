/// <reference types="mongoose" />
import { CreateUserDto } from '../dtos/users.dto';
import { TokenData } from '../interfaces/auth.interface';
import { User } from '../interfaces/users.interface';
declare class AuthService {
    users: import("mongoose").Model<User & import("mongoose").Document<any, any, any>, {}, {}>;
    signup(userData: any): Promise<User>;
    login(userData: CreateUserDto): Promise<{
        accessToken: string;
        findUser: User;
    }>;
    logout(userData: User): Promise<User>;
    resetPasswordForMail(userId: User, userData: User): Promise<{
        accessToken: string;
        findUser: User;
    }>;
    resetPasswordByUserForMail(email: any): Promise<{
        accessToken: string;
        findUser: User;
    }>;
    resetPassword(token: any, password: any): Promise<User>;
    changePassword(body: any, user: any): Promise<User>;
    createToken(user: User): TokenData;
    createTokenForResetPassword(user: User, userData: User): TokenData;
    createTokenByUserForResetPassword(user: User): TokenData;
}
export default AuthService;
