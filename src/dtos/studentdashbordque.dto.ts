import { IsArray, IsBoolean, IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateStudentDashbordQue {
  @IsString()
  public questionType: string;

  @IsString()
  public answerType: string;

  @IsBoolean()
  public isAssignAllSchool: boolean;

  @IsBoolean()
  public default: boolean;

  @IsBoolean()
  public isRequired: boolean;

  @IsBoolean()
  public isSelectMultiple: boolean;

  @IsBoolean()
  public otherAnsRequired: boolean;

  @IsString()
  public question: string;

  @IsOptional()
  public option: any;

  @IsArray()
  public assignedSchool: Array<string>;

  @IsString()
  @IsOptional()
  public otherAnsRequiredValue: string;

}