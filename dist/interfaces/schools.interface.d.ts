export interface School {
    _id?: string;
    schoolName?: string;
    countryCode?: string;
    schoolPhoneNumber?: string;
    addressLine1?: string;
    addressLine2?: string;
    districtId?: string;
    stateId?: string;
    country?: string;
    zipCode?: string;
    isDeleted?: Boolean;
    isActivated?: Boolean;
    createdAt?: Date;
    createdBy?: string;
    updatdAt?: Date;
    updatedBy?: string;
    deletedBy?: string;
    deletedAt?: Date;
}
