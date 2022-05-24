import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSchoolDto {
    @IsString()
    public schoolName: string;

    @IsString()
    public countryCode: string;

    @IsString()
    public zipCode: string;

    @IsString()
    public schoolPhoneNumber: string;

    @IsString()
    public addressLine1: string;

    @IsString()
    @IsOptional()
    public addressLine2: string;

    @IsString()
    public districtId: string;

    @IsString()
    public stateId: string;

    @IsString()
    public country: string;
  }

  export class SchoolAssignToUserDto{
    @IsString()
    public schoolId: string;

    @IsString()
    public userId: string;
  }

  export class CreateSchoolSubAdminDto{
    @IsString()
    public schoolId: string;

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

  export class UpdateSchoolSubAdminDto{
    @IsString()
    public firstName: string;

    @IsString()
    public lastName: string;

    @IsString()
    public countryCode: string;

    @IsString()
    public phoneNumber: string;
  }