export interface Grade {
    _id?: string;
    name?: string;
    isDeleted?: Boolean;
    isActivated?: Boolean;
    createdAt?: Date;
    createdBy?: string;
    updatdAt?: Date;
    updatedBy?: string;
    deletedBy?: string;
    deletedAt?: Date;
}
