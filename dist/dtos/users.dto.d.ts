export declare class CreateUserDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    countryCode: string;
    phoneNumber: string;
}
export declare class UpdateUserDto {
    firstName: string;
    lastName: string;
    countryCode: string;
    phoneNumber: string;
}
export declare class LoginUserDto {
    email: string;
    password: string;
}
export declare class ResetPasswordMailDto {
    userId: string;
}
export declare class ResetPasswordDto {
    token: string;
    password: string;
}
export declare class ResetPasswordByUserDto {
    email: string;
}
export declare class changePasswordByUserDto {
    oldPassword: string;
    newPassword: string;
    userId: string;
}
