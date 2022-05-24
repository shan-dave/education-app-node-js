import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

// export class CreateCountryDto {
//     @IsString()
//     public countryName: string;

//     @IsString()
//     public countryCode: string;
// }

export class ChangeStateStatusDto {
    @IsString()
    public stateId: string;
}

export class ChangeDistrictStatusDto {
    @IsString()
    public districtId: string;
}

export class DeleteStateDto {
    @IsString()
    public stateId: string;
}

export class DeleteDistrictDto {
    @IsString()
    public districtId: string;
}
export class GetStateDto {
    @IsString()
    @IsOptional()
    public status: string;

    @IsString()
    @IsOptional()
    public stateId: string;

    @IsString()
    @IsOptional()
    public search: string;
}


export class CreateStateDto {
    @IsString()
    public name: string;

    @IsString()
    public country: string;
}

export class CreateDistrictDto {
    @IsString()
    public name: string;

    @IsString()
    public sauCode : string;

    @IsString()
    public stateId: string;
}

export class DashbordDto {
    @IsString()
    public startDate: string;

    @IsString()
    public endDate: string;
}