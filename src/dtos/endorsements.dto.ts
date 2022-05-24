import { IsEmail, IsString } from 'class-validator';

export class CreateEndorsementDto {
    @IsString()
    public name: string;
  
    @IsString()
    public number: string;
  }
  