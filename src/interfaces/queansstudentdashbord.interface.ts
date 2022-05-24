export interface QueAns {
    questionId?: string;
    answer?: any;
    otherAns?: string;
}

export interface QueAnsStudentDashbord {
    _id?: string;
    studentId?: string;
    teacherId?: string;
    schoolId?: string;
    districtId?: string;
    queAns?: Array<QueAns>;
    isDeleted?: Boolean;
    isActivated?: Boolean;
    createdAt?: Date;
    createdBy?: string; 
    updatdAt?: Date; 
    updatedBy?: string; 
    deletedBy?: string;
    deletedAt?: Date;
  }
