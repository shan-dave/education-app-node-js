"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const schools_service_1 = tslib_1.__importDefault(require("../services/schools.service"));
const email_service_1 = tslib_1.__importDefault(require("../services/email.service"));
class SchoolsController {
    constructor() {
        this.schoolService = new schools_service_1.default();
        this.createSchool = async (req, res, next) => {
            try {
                const createSchoolData = await this.schoolService.createSchool(req.body, req.user);
                res.status(201).json({ data: createSchoolData, message: 'School created successfully' });
            }
            catch (error) {
                next(error);
            }
        };
        this.assignSchool = async (req, res, next) => {
            try {
                const { assignUserData, schoolIsVerify } = await this.schoolService.assignSchoolToUser(req.body, req.user);
                res.status(200).json({ message: `School "${schoolIsVerify.schoolName}" is successfully assign to "${assignUserData.email}" email` });
            }
            catch (err) {
                next(err);
            }
        };
        this.unassignSchool = async (req, res, next) => {
            try {
                const { assignUserData, schoolIsVerify } = await this.schoolService.unassignSchoolToUser(req.body, req.user);
                res.status(200).json({ message: `School "${schoolIsVerify.schoolName}" is successfully unassign to "${assignUserData.email}" email` });
            }
            catch (err) {
                next(err);
            }
        };
        this.getSchool = async (req, res, next) => {
            var _a, _b;
            try {
                const getSchoolData = await this.schoolService.getSchool(req.query);
                const schoolRecord = getSchoolData ? getSchoolData[0]['data'] : [];
                const schoolCount = getSchoolData ? getSchoolData[0]['schoolCount'][0] ? (_b = (_a = getSchoolData[0]) === null || _a === void 0 ? void 0 : _a['schoolCount'][0]) === null || _b === void 0 ? void 0 : _b.count : 0 : 0;
                res.status(200).json({ data: schoolRecord, count: schoolCount, message: 'School records fetch successfully' });
            }
            catch (err) {
                next(err);
            }
        };
        this.deleteSchool = async (req, res, next) => {
            try {
                const schoolData = await this.schoolService.deleteSchool(req.params, req.user);
                res.status(200).json({ data: schoolData, message: "School deleted successfully" });
            }
            catch (error) {
                next(error);
            }
        };
        this.activateSchool = async (req, res, next) => {
            try {
                const schoolData = await this.schoolService.activateSchool(req.params, req.user);
                res.status(200).json({ data: schoolData, message: "School activated successfully" });
            }
            catch (error) {
                next(error);
            }
        };
        this.updateSchool = async (req, res, next) => {
            try {
                const schoolId = req.params.schoolId;
                const createSchoolData = await this.schoolService.updateSchool(schoolId, req.body, req.user);
                res.status(200).json({ data: createSchoolData, message: 'School record updated successfully' });
            }
            catch (error) {
                next(error);
            }
        };
        this.createSchoolSubAdmin = async (req, res, next) => {
            try {
                const createSchoolSubAdminData = await this.schoolService.createSchoolSubAdmin(req.body, req.user);
                await email_service_1.default.sendEmail(createSchoolSubAdminData.email, 'Verify your credentials', { username: createSchoolSubAdminData.email, password: req.body.password });
                res.status(201).json({ message: `School-Sub-Admin created successfully and send credentials mail on school admin "${createSchoolSubAdminData.email}" email-id` });
            }
            catch (error) {
                next(error);
            }
        };
        this.updateSchoolSubAdmin = async (req, res, next) => {
            try {
                const schoolSubAdminData = req.body;
                const schoolSubAdminId = req.params.schoolSubAdminId;
                const userData = req.user;
                const updateSchoolSubAdminData = await this.schoolService.updateSchoolSubAdmin(schoolSubAdminId, schoolSubAdminData, userData);
                res.status(201).json({ data: updateSchoolSubAdminData, message: 'School-Sub-Admin record successfully updated' });
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteSchoolSubAdmin = async (req, res, next) => {
            try {
                const schoolAdminData = await this.schoolService.deleteSchoolSubAdmin(req.params, req.user);
                res.status(200).json({ data: schoolAdminData, message: "School-Sub-Admin deleted successfully" });
            }
            catch (error) {
                next(error);
            }
        };
        this.activateSchoolSubAdmin = async (req, res, next) => {
            try {
                const { activateSchoolAdminData, statusMode } = await this.schoolService.activateSchoolSubAdmin(req.params, req.user);
                res.status(200).json({ data: activateSchoolAdminData, message: `School-Sub-Admin "${activateSchoolAdminData.firstName} ${activateSchoolAdminData.lastName}" ${statusMode} successfully` });
            }
            catch (error) {
                next(error);
            }
        };
        this.getSchoolSubAdmin = async (req, res, next) => {
            var _a, _b;
            try {
                const getSchoolAdminData = await this.schoolService.getSchoolSubAdmin(req.query);
                const schoolAdminRecord = getSchoolAdminData ? getSchoolAdminData[0]['data'] : [];
                const schoolAdminCount = getSchoolAdminData ? getSchoolAdminData[0]['count'][0] ? (_b = (_a = getSchoolAdminData[0]) === null || _a === void 0 ? void 0 : _a['count'][0]) === null || _b === void 0 ? void 0 : _b.count : 0 : 0;
                res.status(200).json({ data: schoolAdminRecord, count: schoolAdminCount, message: 'School Admin records fetch successfully' });
            }
            catch (err) {
                next(err);
            }
        };
    }
}
exports.default = SchoolsController;
//# sourceMappingURL=schools.controller.js.map