export declare class CreateStudentDto {
    sasId: number;
    email: string;
    assessementId: number;
    schoolId: string;
    studentName: string;
    gradeId: string;
    primaryLanguage: string;
    lastYearImprovedFlag: boolean;
    serviceMinutes: string;
    programType: string;
    yearsOfForeignEducation: number;
    screeningType: string;
    screeningScore: string;
    comment: string;
}
export declare class UpdateStudentDto {
    studentName: string;
    email: string;
    gradeId: string;
    primaryLanguage: string;
    lastYearImprovedFlag: boolean;
    serviceMinutes: string;
    programType: string;
    yearsOfForeignEducation: number;
    screeningType: string;
    screeningScore: string;
    comment: string;
}
