import { NextFunction, Request, Response } from 'express';
import { Teacher } from '../interfaces/teachers.interface';
import teacherService from '../services/teachers.service';
import {IGetUserAuthInfo} from '../interfaces/request.interface'
import emailService from '../services/email.service';
class TeachersController {
    public teacherService = new teacherService()

    public createTeacher = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
        try {
          const { createTeacherData, createUserData } = await this.teacherService.createTeacher(req.body, req.user);
          await emailService.sendEmail(createUserData.email, 'Verify your credentials', {username: createUserData.email, password: req.body.password})
          res.status(201).json({ message: 'Teacher created successfully' });
        } catch (error) {
          next(error);
        }
    };

    public updateTeacher = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
        try {
            const teacherData = req.body;
            const teacherId = req.params.teacherId
            const userData = req.user 
            const updateTeacherData = await this.teacherService.updateTeacher(teacherId, teacherData, userData);
            res.status(200).json({data: updateTeacherData, message: 'Teacher updated successfully' });
        } catch (error) {
          next(error);
        }
    };

    public deleteTeacher = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
        try {
            const teacherId = req.params.teacherId
            const userData = req.user 
            const deleteSubjectData = await this.teacherService.deleteTeacher(teacherId, userData);
            res.status(200).json({data: deleteSubjectData, message: 'Teacher deleted successfully' });
        } catch (error) {
          next(error);
        }
    };

    public activateTeacher = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
      try {
          const teacherId = req.params.teacherId
          const userData = req.user 
          const {activateTeacherData, activateTeacherUserData, statusMode} = await this.teacherService.acivateTeacher(teacherId, userData);
          res.status(200).json({data: activateTeacherData, message: `Teacher "${activateTeacherData.firstName} ${activateTeacherData.lastName}" ${statusMode} successfully` });
      } catch (error) {
        next(error);
      }
  };

    public getTeacher = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
        try{
          const getTeacher = await this.teacherService.getTeacher(req.body);
          const teacherRecords = getTeacher ? getTeacher[0]['data'] : [];
          const teacherCount = getTeacher ? getTeacher[0]['count'][0] ? getTeacher[0]?.['count'][0]?.count : 0 : 0;
    
          res.status(200).json({ data: teacherRecords, count: teacherCount, message: 'Teacher record fetch successfully'});
        } catch (err){
          next(err)
        }
      }
}

export default TeachersController