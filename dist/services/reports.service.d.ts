import { Report } from '../interfaces/reports.interface';
import mongoose from 'mongoose';
declare class ReportService {
    reports: mongoose.Model<Report & mongoose.Document<any, any, any>, {}, {}>;
    createReport(body: any, user: any): Promise<Report>;
    updateReport(reportId: any, body: any, user: any): Promise<Report>;
    deleteReport(reportId: any, user: any): Promise<Report>;
    changeReportStatus(reportId: any, user: any): Promise<{
        reportData: Report;
        statusMode: String;
    }>;
    getReport(reportData: any, user: any): Promise<Report[]>;
}
export default ReportService;
