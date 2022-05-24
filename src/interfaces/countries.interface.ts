export interface Country {
    _id?: string;
    name?: string;
    countryCode?: string;
    isDeleted?: boolean;
    createdAt?: Date;
    createdBy?: string;
    updatdAt?: Date;
    updatedBy?: string;
    deletedBy?: string;
    deletedAt?: Date;
}