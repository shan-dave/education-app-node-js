import { NextFunction, Request, Response } from 'express';
import { StudentDashbordQue } from '../interfaces/studentdashbordque.interface';
import studentDashbordQueService from '../services/studentdashbordque.service';
import { IGetUserAuthInfo } from '../interfaces/request.interface'
class StudentDashbordQueController {
    public studentDashbordQueService = new studentDashbordQueService()

    public createStudentDashbordQue = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
        try {
            const createStudentDashbordQueData = await this.studentDashbordQueService.createStudentDashbordQue(req.body, req.user);
            res.status(201).json({ data: createStudentDashbordQueData, message: 'Question created successfully' });
        } catch (error) {
            next(error);
        }
    };

    public updateStudentDashbordQue = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
        try {
            const queData = req.body;
            const queId = req.params.queId
            const userData = req.user
            const updateStudentDashbordQueData = await this.studentDashbordQueService.updateStudentDashbordQue(queId, queData, userData);
            res.status(200).json({ data: updateStudentDashbordQueData, message: 'Question updated successfully' });
        } catch (error) {
            next(error);
        }
    };

    public deleteStudentDashbordQue = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
        try {
            const queId = req.params.queId
            const userData = req.user
            const deleteStudentDashbordQueData = await this.studentDashbordQueService.deleteStudentDashbordQue(queId, userData);
            res.status(200).json({ data: deleteStudentDashbordQueData, message: 'Question deleted successfully' });
        } catch (error) {
            next(error);
        }
    };

    public activeStudentDashbordQue = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
        try {
            const queId = req.params.queId
            const userData = req.user
            const {activeStudentDashbordQueData, statusMode} = await this.studentDashbordQueService.aciveStudentDashbordQue(queId, userData);
            res.status(200).json({ data: activeStudentDashbordQueData, message: `Question "${activeStudentDashbordQueData.question}" ${statusMode} successfully` });
        } catch (error) {
            next(error);
        }
    };

    public getStudentDashbordQue = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
        try {
            const getStudentDashbordQue = await this.studentDashbordQueService.getStudentDashbordQue(req.query);
            const studentDashbordQueRecords = getStudentDashbordQue ? getStudentDashbordQue[0]['data'] : [];
            const studentDashbordQueCount = getStudentDashbordQue ? getStudentDashbordQue[0]['count'][0] ? getStudentDashbordQue[0]?.['count'][0]?.count : 0 : 0;

            res.status(200).json({ data: studentDashbordQueRecords, count: studentDashbordQueCount, message: 'Questions record fetch successfully' });
        } catch (err) {
            next(err)
        }
    }

    public checkDefaultQue = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
        try {
            const message = await this.studentDashbordQueService.checkDefaultQue();
            res.status(201).json({ message });
        } catch (error) {
            next(error);
        }
    };
}

export default StudentDashbordQueController