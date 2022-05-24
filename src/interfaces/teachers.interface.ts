export interface Teacher {
  _id?: string;
  endorsementId?: Array<string>;
  gradeIds?: Array<string>;
  firstName?: string;
  edId?: string;
  lastName?: string;
  schoolId?: string;
  userId?: string;
  addressLine1?: string;
  addressLine2?: string;
  districtId?: string;
  stateId?: string;
  country?: string;
  dateOfBirth?: Date;
  isDeleted?: Boolean;
  isActivated?: Boolean;
  createdAt?: Date;
  createdBy?: string;
  updatdAt?: Date;
  updatedBy?: string;
  deletedBy?: string;
  deletedAt?: Date;
}