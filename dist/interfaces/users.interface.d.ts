export interface User {
    _id?: string;
    firstName?: string;
    lastName?: string;
    countryCode?: string;
    phoneNumber?: string;
    schoolId?: string;
    districtId?: string;
    email?: string;
    password?: string;
    role?: string;
    isDeleted?: Boolean;
    isActivated?: Boolean;
    createdAt?: Date;
    createdBy?: string;
    updatdAt?: Date;
    updatedBy?: string;
    deletedBy?: string;
    deletedAt?: Date;
}
