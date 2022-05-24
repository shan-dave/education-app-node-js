import { IsArray, IsBoolean, IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateReportDto {
  
  @IsString()
  public name: string;

  @IsString()
  public startDate: string;

  @IsString()
  public endDate: string;

  @IsString()
  @IsOptional()
  public schoolId: string;

  @IsString()
  @IsOptional()
  public districtId: string;

  @IsString()
  @IsOptional()
  public teacherId: string;
  
  @IsString()
  @IsOptional()
  public studentId: string;
  
  @IsString()
  @IsOptional()
  public questionId: string;
  
  @IsString()
  @IsOptional()
  public answer: string;
}

