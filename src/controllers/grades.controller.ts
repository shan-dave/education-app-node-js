import { NextFunction, Request, Response } from 'express';
import gradeService from '../services/grades.service';
import { IGetUserAuthInfo } from '../interfaces/request.interface'

class GradesController {
  public gradeService = new gradeService()

  public createGrade = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
      const createGrade = await this.gradeService.creatGradee(req.body, req.user);
      res.status(201).json({ data: createGrade, message: `Grade "${createGrade.name}" created successfully` });
    } catch (error) {
      next(error);
    }
  };
  
  public deleteGrade = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
      const deleteGradeData = await this.gradeService.deleteGrade(req.params.gradeId, req.user);
      res.status(200).json({ data: deleteGradeData, message: `Grade "${deleteGradeData.name}" deleted successfully` });
    } catch (error) {
      next(error);
    }
  };

  public changeGradeStatus = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
      const { gradeData, statusMode } = await this.gradeService.changeGradeStatus(req.params.gradeId, req.user);
      res.status(200).json({ data: gradeData, message: `Grade "${gradeData.name}" ${statusMode} successfully` });
    } catch (error) {
      next(error);
    }
  };

  public getGrade = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
      const getGrade = await this.gradeService.getGrade(req.query, req.user);
      res.status(200).json({ data: getGrade, count: getGrade.length, message: 'Grade records fetch successfully' });
    } catch (err) {
      next(err)
    }
  }
}

export default GradesController