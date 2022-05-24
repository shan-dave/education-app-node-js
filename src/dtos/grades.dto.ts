import { IsString } from 'class-validator';

export class CreateGradeDto {
  @IsString()
  public name: string;
}