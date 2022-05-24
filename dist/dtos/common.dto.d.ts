export declare class ChangeStateStatusDto {
    stateId: string;
}
export declare class ChangeDistrictStatusDto {
    districtId: string;
}
export declare class DeleteStateDto {
    stateId: string;
}
export declare class DeleteDistrictDto {
    districtId: string;
}
export declare class GetStateDto {
    status: string;
    stateId: string;
    search: string;
}
export declare class CreateStateDto {
    name: string;
    country: string;
}
export declare class CreateDistrictDto {
    name: string;
    sauCode: string;
    stateId: string;
}
export declare class DashbordDto {
    startDate: string;
    endDate: string;
}
