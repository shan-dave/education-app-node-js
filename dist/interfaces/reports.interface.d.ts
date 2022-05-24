export interface Report {
    _id?: string;
    name?: string;
    userId?: string;
    startDate?: string;
    endDate?: string;
    districtId?: string;
    schoolId?: string;
    teacherId?: string;
    studentId?: string;
    questionId?: string;
    answer?: string;
    isActivated: Boolean;
    isDeleted?: Boolean;
    createdAt?: Date;
    createdBy?: string;
    updatdAt?: Date;
    updatedBy?: string;
    deletedBy?: string;
    deletedAt?: Date;
}
