import { IsArray, IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTeacherDto {
    @IsString()
    public firstName: string;
  
    @IsString()
    public lastName: string;

    @IsString()
    public countryCode: string;
  
    @IsString()
    public phoneNumber: string;

    @IsString()
    public email: string;
  
    @IsString()
    public password: string;
  
    @IsString()
    public schoolId: string;

    @IsArray()
    public endorsementId: Array<string>;

    @IsArray()
    public gradeIds: Array<string>;

    // @IsString()
    // public teacherId: string;

    @IsString()
    public edId: string;

    @IsString()
    @IsOptional()
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
  
    @IsString()
    public dateOfBirth: string;
  }

  export class updateTeacherDto {
    @IsString()
    public firstName: string;
  
    @IsString()
    public lastName: string;

    @IsString()
    public countryCode: string;
  
    @IsString()
    public phoneNumber: string;

    @IsArray()
    public gradeIds: Array<string>;

    @IsString()
    @IsOptional()
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
  
    @IsString()
    public dateOfBirth: string;
  }