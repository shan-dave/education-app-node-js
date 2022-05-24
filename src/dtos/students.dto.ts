import { IsArray, IsBoolean, IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsNumber()
  public sasId: number;

  @IsEmail()
  email: string;

  @IsNumber()
  public assessementId: number;

  @IsString()
  public schoolId: string;

  @IsString()
  public studentName: string;
  
  @IsString()
  public gradeId: string;

  // @IsBoolean()
  // @IsOptional()
  // public missingAnrolmentNo: boolean;

  @IsString()
  public primaryLanguage: string;

  @IsBoolean()
  @IsOptional()
  public lastYearImprovedFlag: boolean;

  @IsString()
  @IsOptional()
  public serviceMinutes: string;

  @IsString()
  @IsOptional()
  public programType: string;

  @IsNumber()
  @IsOptional()
  public yearsOfForeignEducation: number;

  @IsString()
  @IsOptional()
  public screeningType: string;

  @IsString()
  @IsOptional()
  public screeningScore: string;

  @IsString()
  @IsOptional()
  public comment: string;
}

export class UpdateStudentDto {
  @IsString()
  public studentName: string;

  // @IsBoolean()
  // @IsOptional()
  // public missingAnrolmentNo: boolean;

  @IsEmail()
  public email: string;

  @IsString()
  public gradeId: string;

  @IsString()
  public primaryLanguage: string;

  @IsBoolean()
  @IsOptional()
  public lastYearImprovedFlag: boolean;

  @IsString()
  @IsOptional()
  public serviceMinutes: string;

  @IsString()
  public programType: string;

  @IsNumber()
  @IsOptional()
  public yearsOfForeignEducation: number;

  @IsString()
  @IsOptional()
  public screeningType: string;

  @IsString()
  @IsOptional()
  public screeningScore: string;

  @IsString()
  @IsOptional()
  public comment: string;
}