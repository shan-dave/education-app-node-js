"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const commons_service_1 = tslib_1.__importDefault(require("../services/commons.service"));
class CommonController {
    constructor() {
        this.commonService = new commons_service_1.default();
        this.insertState = async (req, res, next) => {
            try {
                const stateData = await this.commonService.insertStateData(req.body, req.user);
                res.status(201).json({ data: stateData, message: "State name created successfully" });
            }
            catch (error) {
                next(error);
            }
        };
        this.insertDistrict = async (req, res, next) => {
            try {
                const districtData = await this.commonService.insertDistrictData(req.body, req.user);
                res.status(201).json({ data: districtData, message: `State ${districtData.name} created successfully` });
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteState = async (req, res, next) => {
            try {
                const stateData = await this.commonService.deleteState(req.params, req.user);
                res.status(200).json({ data: stateData, message: `State "${stateData.name}" deleted successfully` });
            }
            catch (error) {
                next(error);
            }
        };
        this.changeStateStatus = async (req, res, next) => {
            try {
                const { changeStateStatusData, statusMode } = await this.commonService.changeStateStatus(req.params, req.user);
                res.status(200).json({ data: changeStateStatusData, message: `State "${changeStateStatusData.name}" ${statusMode} successfully` });
            }
            catch (error) {
                next(error);
            }
        };
        this.changeDistrictStatus = async (req, res, next) => {
            try {
                const { changeDistrictStatusData, statusMode } = await this.commonService.changeDistrictStatus(req.params, req.user);
                res.status(200).json({ data: changeDistrictStatusData, message: `District "${changeDistrictStatusData.name}" ${statusMode} successfully` });
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteDistrict = async (req, res, next) => {
            try {
                const districtData = await this.commonService.deleteDistrict(req.params, req.user);
                res.status(200).json({ data: districtData, message: `District "${districtData.name}" deleted successfully` });
            }
            catch (error) {
                next(error);
            }
        };
        this.getState = async (req, res, next) => {
            var _a, _b;
            try {
                const stateData = await this.commonService.getState(req.query, req.user);
                const stateRecord = stateData ? stateData[0]['data'] : [];
                const stateCount = stateData ? stateData[0]['count'][0] ? (_b = (_a = stateData[0]) === null || _a === void 0 ? void 0 : _a['count'][0]) === null || _b === void 0 ? void 0 : _b.count : 0 : 0;
                res.status(200).json({ data: stateRecord, count: stateCount, message: "States record fetch successfully" });
            }
            catch (error) {
                next(error);
            }
        };
        this.getDistrict = async (req, res, next) => {
            var _a, _b;
            try {
                const districtData = await this.commonService.getDistrict(req.query, req.user);
                const districtRecord = districtData ? districtData[0]['data'] : [];
                const districtCount = districtData ? districtData[0]['count'][0] ? (_b = (_a = districtData[0]) === null || _a === void 0 ? void 0 : _a['count'][0]) === null || _b === void 0 ? void 0 : _b.count : 0 : 0;
                res.status(200).json({ data: districtRecord, count: districtCount, message: "Districts record fetch successfully" });
            }
            catch (error) {
                next(error);
            }
        };
        this.getSchoolDashbord = async (req, res, next) => {
            try {
                const schoolDashbord = await this.commonService.getSchoolDashbord(req.query);
                res.status(200).json({ data: schoolDashbord, message: "School dashbord record fetch successfully" });
            }
            catch (error) {
                next(error);
            }
        };
        this.getStateDashbord = async (req, res, next) => {
            try {
                const stateDashbord = await this.commonService.getStateDashbord(req.query);
                res.status(200).json({ data: stateDashbord, message: "State dashbord record fetch successfully" });
            }
            catch (error) {
                next(error);
            }
        };
        this.getDistrictDashbord = async (req, res, next) => {
            try {
                const districtDashbord = await this.commonService.getDistrictDashbord(req.query);
                res.status(200).json({ data: districtDashbord, message: "District dashbord record fetch successfully" });
            }
            catch (error) {
                next(error);
            }
        };
        this.getTeacherDashbord = async (req, res, next) => {
            try {
                const teacherDashbord = await this.commonService.getTeacherDashbord(req.query);
                res.status(200).json({ data: teacherDashbord, message: "Teachers dashbord record fetch successfully" });
            }
            catch (error) {
                next(error);
            }
        };
        this.getStudentDashbord = async (req, res, next) => {
            try {
                const studentDashbord = await this.commonService.getStudentDashbord(req.query);
                res.status(200).json({ data: studentDashbord, message: "Student dashbord record fetch successfully" });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = CommonController;
//# sourceMappingURL=common.controller.js.map