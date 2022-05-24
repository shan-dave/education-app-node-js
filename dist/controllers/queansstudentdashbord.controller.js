"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const queansstudentdashbord_service_1 = tslib_1.__importDefault(require("../services/queansstudentdashbord.service"));
class QueAnsStudentDashbordController {
    constructor() {
        this.queAnsStudentDashbordService = new queansstudentdashbord_service_1.default();
        this.createQueAnsStudentDashbord = async (req, res, next) => {
            try {
                const createStudentDashbordQueData = await this.queAnsStudentDashbordService.createQueAnsStudentDashbord(req.body, req.user);
                res.status(201).json({ data: createStudentDashbordQueData, message: 'Answer submitted successfully' });
            }
            catch (error) {
                next(error);
            }
        };
        this.getQueAnsStudentDashbordListChart1 = async (req, res, next) => {
            try {
                const getQueAnsData = await this.queAnsStudentDashbordService.getQueAnsStudentDashbordListChart1(req.query, req.user);
                // const queAnsRecords = getQueAnsData ? getQueAnsData[0]['data'] : [];
                // const queAnsCount = getQueAnsData ? getQueAnsData[0]['count'][0] ? getQueAnsData[0]?.['count'][0]?.count : 0 : 0;
                // res.status(200).json({ data: queAnsRecords, count: queAnsCount, message: 'Reprots fetch successfully' });
                res.status(200).json({ data: getQueAnsData, message: 'Reprots fetch successfully' });
            }
            catch (error) {
                next(error);
            }
        };
        this.getQueAnsStudentDashbordListAttendanceChart = async (req, res, next) => {
            try {
                const getQueAnsData = await this.queAnsStudentDashbordService.getQueAnsStudentDashbordListAttendanceChart(req.query, req.user);
                // const queAnsRecords = getQueAnsData ? getQueAnsData[0]['data'] : [];
                // const queAnsCount = getQueAnsData ? getQueAnsData[0]['count'][0] ? getQueAnsData[0]?.['count'][0]?.count : 0 : 0;
                // res.status(200).json({ data: queAnsRecords, count: queAnsCount, message: 'Reprots fetch successfully' });
                res.status(200).json({ data: getQueAnsData, message: 'Reprots fetch successfully' });
            }
            catch (error) {
                next(error);
            }
        };
        this.getQueAnsStudentDashbordListChart2 = async (req, res, next) => {
            try {
                const getQueAnsData = await this.queAnsStudentDashbordService.getQueAnsStudentDashbordListChart2(req.query, req.user);
                // const queAnsRecords = getQueAnsData ? getQueAnsData[0]['data'] : [];
                // const queAnsCount = getQueAnsData ? getQueAnsData[0]['count'][0] ? getQueAnsData[0]?.['count'][0]?.count : 0 : 0;
                // res.status(200).json({ data: queAnsRecords, count: queAnsCount, message: 'Reprots fetch successfully' });
                res.status(200).json({ data: getQueAnsData, message: 'Reprots fetch successfully' });
            }
            catch (error) {
                next(error);
            }
        };
        this.getQueAnsStudentDashbordListChart3 = async (req, res, next) => {
            try {
                const getQueAnsData = await this.queAnsStudentDashbordService.getQueAnsStudentDashbordListChart3(req.query, req.user);
                // const queAnsRecords = getQueAnsData ? getQueAnsData[0]['data'] : [];
                // const queAnsCount = getQueAnsData ? getQueAnsData[0]['count'][0] ? getQueAnsData[0]?.['count'][0]?.count : 0 : 0;
                // res.status(200).json({ data: queAnsRecords, count: queAnsCount, message: 'Reprots fetch successfully' });
                res.status(200).json({ data: getQueAnsData, message: 'Reprots fetch successfully' });
            }
            catch (error) {
                next(error);
            }
        };
        this.getQueAnsStudentDashbordListChart4 = async (req, res, next) => {
            try {
                const getQueAnsData = await this.queAnsStudentDashbordService.getQueAnsStudentDashbordListChart4(req.query, req.user);
                // const queAnsRecords = getQueAnsData ? getQueAnsData[0]['data'] : [];
                // const queAnsCount = getQueAnsData ? getQueAnsData[0]['count'][0] ? getQueAnsData[0]?.['count'][0]?.count : 0 : 0;
                // res.status(200).json({ data: queAnsRecords, count: queAnsCount, message: 'Reprots fetch successfully' });
                res.status(200).json({ data: getQueAnsData, message: 'Reprots fetch successfully' });
            }
            catch (error) {
                next(error);
            }
        };
        this.getQueAnsStudentDashbordListChart5 = async (req, res, next) => {
            try {
                const getQueAnsData = await this.queAnsStudentDashbordService.getQueAnsStudentDashbordListChart5(req.query, req.user);
                // const queAnsRecords = getQueAnsData ? getQueAnsData[0]['data'] : [];
                // const queAnsCount = getQueAnsData ? getQueAnsData[0]['count'][0] ? getQueAnsData[0]?.['count'][0]?.count : 0 : 0;
                // res.status(200).json({ data: queAnsRecords, count: queAnsCount, message: 'Reprots fetch successfully' });
                res.status(200).json({ data: getQueAnsData, message: 'Reprots fetch successfully' });
            }
            catch (error) {
                next(error);
            }
        };
        this.getQueAnsStudentDashbordListChart6 = async (req, res, next) => {
            try {
                const getQueAnsData = await this.queAnsStudentDashbordService.getQueAnsStudentDashbordListChart6(req.query, req.user);
                // const queAnsRecords = getQueAnsData ? getQueAnsData[0]['data'] : [];
                // const queAnsCount = getQueAnsData ? getQueAnsData[0]['count'][0] ? getQueAnsData[0]?.['count'][0]?.count : 0 : 0;
                // res.status(200).json({ data: queAnsRecords, count: queAnsCount, message: 'Reprots fetch successfully' });
                res.status(200).json({ data: getQueAnsData, message: 'Reprots fetch successfully' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = QueAnsStudentDashbordController;
//# sourceMappingURL=queansstudentdashbord.controller.js.map