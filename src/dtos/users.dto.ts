import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsString()
  public countryCode: string;

  @IsString()
  public phoneNumber: string;

}

export class UpdateUserDto {
  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsString()
  public countryCode: string;

  @IsString()
  public phoneNumber: string;
}

export class LoginUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export class ResetPasswordMailDto{
  @IsString()
  public userId: string;
}

export class ResetPasswordDto{
  @IsString()
  public token: string;

  @IsString()
  public password: string;
}

export class ResetPasswordByUserDto{
  @IsString()
  public email: string;
}

export class changePasswordByUserDto{
  @IsString()
  public oldPassword: string;

  @IsString()
  public newPassword: string;

  @IsString()
  public userId: string;
}
