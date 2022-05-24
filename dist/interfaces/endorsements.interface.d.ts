export interface Endorsement {
    _id?: string;
    name?: string;
    number?: string;
    isDeleted?: Boolean;
    isActivated?: Boolean;
    createdAt?: Date;
    createdBy?: string;
    updatdAt?: Date;
    updatedBy?: string;
    deletedBy?: string;
    deletedAt?: Date;
}
