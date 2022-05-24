import { NextFunction, Request, Response } from 'express';
import { Student } from '../interfaces/students.interface';
import studentService from '../services/students.service';
import { IGetUserAuthInfo } from '../interfaces/request.interface'
import emailService from '../services/email.service';
class StudentsController {
  public studentService = new studentService()

  public createStudent = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
      const createStudent = await this.studentService.createStudent(req.body, req.user);
      //   await emailService.sendEmail(createUserData.email, 'Verify your credentials', {username: createUserData.email, password: req.body.password})
      res.status(201).json({ data: createStudent, message: `Student "${createStudent.studentName}" created successfully` });
    } catch (error) {
      next(error);
    }
  };

  public updateStudent = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
      const studentData = req.body;
      const studentId = req.params.studentId
      const userData = req.user
      const updateStudentData = await this.studentService.updateStudent(studentId, studentData, userData);
      res.status(200).json({ data: updateStudentData, message: `Student "${updateStudentData.studentName}" updated successfully` });
    } catch (error) {
      next(error);
    }
  };

  public deleteStudent = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
      const studentId = req.params.studentId
      const userData = req.user
      const deleteStudentData = await this.studentService.deleteStudent(studentId, userData);
      res.status(200).json({ data: deleteStudentData, message: `Student "${deleteStudentData.studentName}" deleted successfully` });
    } catch (error) {
      next(error);
    }
  };

  public activateStudent = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
      const studentId = req.params.studentId
      const userData = req.user
      const { activateStudentData, statusMode } = await this.studentService.acivateStudent(studentId, userData);
      res.status(200).json({ data: activateStudentData, message: `Student "${activateStudentData.studentName}" ${statusMode} successfully` });
    } catch (error) {
      next(error);
    }
  };

  public getStudent = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
      const getStudent = await this.studentService.getStudent(req.query);
      const studentRecords = getStudent ? getStudent[0]['data'] : [];
      const studentCount = getStudent ? getStudent[0]['count'][0] ? getStudent[0]?.['count'][0]?.count : 0 : 0;

      res.status(200).json({ data: studentRecords, count: studentCount, message: 'Student record fetch successfully' });
    } catch (err) {
      next(err)
    }
  }

  // public assignTeacher = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
  //   try{
  //     const assignTeacherData = await this.studentService.assignTeacher(req.body, req.user);
  //     // res.status(200).json({message: `School "${schoolIsVerify.schoolName}" is successfully assign to "${assignUserData.email}" email` });
  //   } catch (err){
  //     next(err)
  //   }
  // }

  // public unassignSchool = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
  //   try{
  //     const { assignUserData, schoolIsVerify } = await this.schoolService.unassignSchoolToUser(req.body, req.user);
  //     res.status(200).json({message: `School "${schoolIsVerify.schoolName}" is successfully unassign to "${assignUserData.email}" email` });
  //   } catch (err){
  //     next(err)
  //   }
  // }
}

export default StudentsController