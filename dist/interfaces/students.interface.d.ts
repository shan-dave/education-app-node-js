export interface Student {
    _id?: string;
    sasId?: number;
    email?: string;
    assessementId?: number;
    schoolId?: string;
    studentName?: string;
    primaryLanguage?: string;
    lastYearImprovedFlag?: Boolean;
    serviceMinutes?: string;
    programType?: string;
    yearsOfForeignEducation?: number;
    screeningType?: string;
    screeningScore?: string;
    comment?: string;
    gradeId?: string;
    isActivated: Boolean;
    isDeleted?: Boolean;
    createdAt?: Date;
    createdBy?: string;
    updatdAt?: Date;
    updatedBy?: string;
    deletedBy?: string;
    deletedAt?: Date;
}
