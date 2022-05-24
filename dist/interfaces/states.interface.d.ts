export interface State {
    _id?: string;
    name?: string;
    country?: string;
    isActivated: Boolean;
    isDeleted?: Boolean;
    createdAt?: Date;
    createdBy?: string;
    updatdAt?: Date;
    updatedBy?: string;
    deletedBy?: string;
    deletedAt?: Date;
}
