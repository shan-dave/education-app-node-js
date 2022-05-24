export declare class CreateSchoolDto {
    schoolName: string;
    countryCode: string;
    zipCode: string;
    schoolPhoneNumber: string;
    addressLine1: string;
    addressLine2: string;
    districtId: string;
    stateId: string;
    country: string;
}
export declare class SchoolAssignToUserDto {
    schoolId: string;
    userId: string;
}
export declare class CreateSchoolSubAdminDto {
    schoolId: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    countryCode: string;
    phoneNumber: string;
}
export declare class UpdateSchoolSubAdminDto {
    firstName: string;
    lastName: string;
    countryCode: string;
    phoneNumber: string;
}
