import { NextFunction, Request, Response } from 'express';
import { StudentDashbordQue } from '../interfaces/studentdashbordque.interface';
import queAnsStudentDashbordService from '../services/queansstudentdashbord.service';
import { IGetUserAuthInfo } from '../interfaces/request.interface'
class QueAnsStudentDashbordController {
    public queAnsStudentDashbordService = new queAnsStudentDashbordService()

    public createQueAnsStudentDashbord = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
        try {
            const createStudentDashbordQueData = await this.queAnsStudentDashbordService.createQueAnsStudentDashbord(req.body, req.user);
            res.status(201).json({ data: createStudentDashbordQueData, message: 'Answer submitted successfully' });
        } catch (error) {
            next(error);
        }
    };
    
    public getQueAnsStudentDashbordListChart1 = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
        try {
            const getQueAnsData = await this.queAnsStudentDashbordService.getQueAnsStudentDashbordListChart1(req.query, req.user);
            // const queAnsRecords = getQueAnsData ? getQueAnsData[0]['data'] : [];
            // const queAnsCount = getQueAnsData ? getQueAnsData[0]['count'][0] ? getQueAnsData[0]?.['count'][0]?.count : 0 : 0;
            // res.status(200).json({ data: queAnsRecords, count: queAnsCount, message: 'Reprots fetch successfully' });
            res.status(200).json({ data: getQueAnsData, message: 'Reprots fetch successfully' });
        } catch (error) {
            next(error);
        }
    };

    public getQueAnsStudentDashbordListAttendanceChart = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
        try {
            const getQueAnsData = await this.queAnsStudentDashbordService.getQueAnsStudentDashbordListAttendanceChart(req.query, req.user);
            // const queAnsRecords = getQueAnsData ? getQueAnsData[0]['data'] : [];
            // const queAnsCount = getQueAnsData ? getQueAnsData[0]['count'][0] ? getQueAnsData[0]?.['count'][0]?.count : 0 : 0;
            // res.status(200).json({ data: queAnsRecords, count: queAnsCount, message: 'Reprots fetch successfully' });
            res.status(200).json({ data: getQueAnsData, message: 'Reprots fetch successfully' });
        } catch (error) {
            next(error);
        }
    };

    public getQueAnsStudentDashbordListChart2 = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
        try {
            const getQueAnsData = await this.queAnsStudentDashbordService.getQueAnsStudentDashbordListChart2(req.query, req.user);
            // const queAnsRecords = getQueAnsData ? getQueAnsData[0]['data'] : [];
            // const queAnsCount = getQueAnsData ? getQueAnsData[0]['count'][0] ? getQueAnsData[0]?.['count'][0]?.count : 0 : 0;
            // res.status(200).json({ data: queAnsRecords, count: queAnsCount, message: 'Reprots fetch successfully' });
            res.status(200).json({ data: getQueAnsData, message: 'Reprots fetch successfully' });
        } catch (error) {
            next(error);
        }
    };

    public getQueAnsStudentDashbordListChart3 = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
        try {
            const getQueAnsData = await this.queAnsStudentDashbordService.getQueAnsStudentDashbordListChart3(req.query, req.user);
            // const queAnsRecords = getQueAnsData ? getQueAnsData[0]['data'] : [];
            // const queAnsCount = getQueAnsData ? getQueAnsData[0]['count'][0] ? getQueAnsData[0]?.['count'][0]?.count : 0 : 0;
            // res.status(200).json({ data: queAnsRecords, count: queAnsCount, message: 'Reprots fetch successfully' });
            res.status(200).json({ data: getQueAnsData, message: 'Reprots fetch successfully' });
        } catch (error) {
            next(error);
        }
    };

    public getQueAnsStudentDashbordListChart4 = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
        try {
            const getQueAnsData = await this.queAnsStudentDashbordService.getQueAnsStudentDashbordListChart4(req.query, req.user);
            // const queAnsRecords = getQueAnsData ? getQueAnsData[0]['data'] : [];
            // const queAnsCount = getQueAnsData ? getQueAnsData[0]['count'][0] ? getQueAnsData[0]?.['count'][0]?.count : 0 : 0;
            // res.status(200).json({ data: queAnsRecords, count: queAnsCount, message: 'Reprots fetch successfully' });
            res.status(200).json({ data: getQueAnsData, message: 'Reprots fetch successfully' });
        } catch (error) {
            next(error);
        }
    };
    public getQueAnsStudentDashbordListChart5 = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
        try {
            const getQueAnsData = await this.queAnsStudentDashbordService.getQueAnsStudentDashbordListChart5(req.query, req.user);
            // const queAnsRecords = getQueAnsData ? getQueAnsData[0]['data'] : [];
            // const queAnsCount = getQueAnsData ? getQueAnsData[0]['count'][0] ? getQueAnsData[0]?.['count'][0]?.count : 0 : 0;
            // res.status(200).json({ data: queAnsRecords, count: queAnsCount, message: 'Reprots fetch successfully' });
            res.status(200).json({ data: getQueAnsData, message: 'Reprots fetch successfully' });
        } catch (error) {
            next(error);
        }
    };
    public getQueAnsStudentDashbordListChart6 = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
        try {
            const getQueAnsData = await this.queAnsStudentDashbordService.getQueAnsStudentDashbordListChart6(req.query, req.user);
            // const queAnsRecords = getQueAnsData ? getQueAnsData[0]['data'] : [];
            // const queAnsCount = getQueAnsData ? getQueAnsData[0]['count'][0] ? getQueAnsData[0]?.['count'][0]?.count : 0 : 0;
            // res.status(200).json({ data: queAnsRecords, count: queAnsCount, message: 'Reprots fetch successfully' });
            res.status(200).json({ data: getQueAnsData, message: 'Reprots fetch successfully' });
        } catch (error) {
            next(error);
        }
    };
}

export default QueAnsStudentDashbordController