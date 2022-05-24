import { NextFunction, Request, Response } from 'express';
import { Report } from '../interfaces/reports.interface';
import reportService from '../services/reports.service';
import { IGetUserAuthInfo } from '../interfaces/request.interface'
import emailService from '../services/email.service';
class ReportsController {
  public reportService = new reportService()

  public createReport = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
      const createReport = await this.reportService.createReport(req.body, req.user);
      res.status(201).json({ data: createReport, message: `Report ${createReport.name} created successfully` });
    } catch (error) {
      next(error);
    }
  };

  public updateReport = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
      const updateReportData = await this.reportService.updateReport(req.params.reportId, req.body, req.user);
      res.status(200).json({ data: updateReportData, message: `Report "${updateReportData.name}" updated successfully` });
    } catch (error) {
      next(error);
    }
  };

  public deleteReport = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
      const deleteReportData = await this.reportService.deleteReport(req.params.reportId, req.user);
      res.status(200).json({ data: deleteReportData, message: `Report "${deleteReportData.name}" deleted successfully` });
    } catch (error) {
      next(error);
    }
  };

  public activateReport = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
      const { reportData, statusMode } = await this.reportService.changeReportStatus(req.params.reportId, req.user);
      res.status(200).json({ data: reportData, message: `Report "${reportData.name}" ${statusMode} successfully` });
    } catch (error) {
      next(error);
    }
  };

  public getReport = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
      const getReport = await this.reportService.getReport(req.query, req.user);
      const reportRecords = getReport ? getReport[0]['data'] : [];
      const reportCount = getReport ? getReport[0]['count'][0] ? getReport[0]?.['count'][0]?.count : 0 : 0;
      res.status(200).json({ data: reportRecords, count: reportCount, message: 'Reprots fetch successfully' });
    } catch (err) {
      next(err)
    }
  }
}

export default ReportsController