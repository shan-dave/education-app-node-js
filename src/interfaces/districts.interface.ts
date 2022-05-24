export interface District {
    _id?: string;
    name?: string;
    sauCode?: string;
    stateId: string;
    isActivated: Boolean;
    isDeleted?: Boolean;
    createdAt?: Date;
    createdBy?: string;
    updatdAt?: Date;
    updatedBy?: string;
    deletedBy?: string;
    deletedAt?: Date;
}