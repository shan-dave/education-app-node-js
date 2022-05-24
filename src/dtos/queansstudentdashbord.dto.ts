import { IsArray,IsString,IsOptional, ValidateNested, ArrayMinSize, ArrayMaxSize, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
 
export class CreateQueAnsStudentDashbordDto {
    @IsString()
    public studentId: string;
    @IsString()
    public districtId: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => QueAns)
    public queAns: QueAns[];
}

export class QueAns {
    @IsString()
    public questionId: string;

    @IsNotEmpty()
    public answer: string;
    
    @IsOptional()
    public otherAns: string
}