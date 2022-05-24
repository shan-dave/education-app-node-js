export interface StudentDashbordQue {
    _id?: string;
    questionType?: string;
    answerType?: string;
    isAssignAllSchool?: Boolean;
    question?: string;
    option?: string;
    assignedSchool?: Array<string>;
    default?: Boolean;
    isRequired?: Boolean;
    isSelectMultiple?: Boolean;
    otherAnsRequired?: Boolean;
    otherAnsRequiredValue?: string;
    isDeleted?: Boolean;
    isActivated?: Boolean;
    createdAt?: Date;
    createdBy?: string;
    updatdAt?: Date;
    updatedBy?: string;
    deletedBy?: string;
    deletedAt?: Date;
}
