"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const reports_service_1 = tslib_1.__importDefault(require("../services/reports.service"));
class ReportsController {
    constructor() {
        this.reportService = new reports_service_1.default();
        this.createReport = async (req, res, next) => {
            try {
                const createReport = await this.reportService.createReport(req.body, req.user);
                res.status(201).json({ data: createReport, message: `Report ${createReport.name} created successfully` });
            }
            catch (error) {
                next(error);
            }
        };
        this.updateReport = async (req, res, next) => {
            try {
                const updateReportData = await this.reportService.updateReport(req.params.reportId, req.body, req.user);
                res.status(200).json({ data: updateReportData, message: `Report "${updateReportData.name}" updated successfully` });
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteReport = async (req, res, next) => {
            try {
                const deleteReportData = await this.reportService.deleteReport(req.params.reportId, req.user);
                res.status(200).json({ data: deleteReportData, message: `Report "${deleteReportData.name}" deleted successfully` });
            }
            catch (error) {
                next(error);
            }
        };
        this.activateReport = async (req, res, next) => {
            try {
                const { reportData, statusMode } = await this.reportService.changeReportStatus(req.params.reportId, req.user);
                res.status(200).json({ data: reportData, message: `Report "${reportData.name}" ${statusMode} successfully` });
            }
            catch (error) {
                next(error);
            }
        };
        this.getReport = async (req, res, next) => {
            var _a, _b;
            try {
                const getReport = await this.reportService.getReport(req.query, req.user);
                const reportRecords = getReport ? getReport[0]['data'] : [];
                const reportCount = getReport ? getReport[0]['count'][0] ? (_b = (_a = getReport[0]) === null || _a === void 0 ? void 0 : _a['count'][0]) === null || _b === void 0 ? void 0 : _b.count : 0 : 0;
                res.status(200).json({ data: reportRecords, count: reportCount, message: 'Reprots fetch successfully' });
            }
            catch (err) {
                next(err);
            }
        };
    }
}
exports.default = ReportsController;
//# sourceMappingURL=reports.controller.js.map