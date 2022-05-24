"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const email_service_1 = tslib_1.__importDefault(require("../services/email.service"));
const users_service_1 = tslib_1.__importDefault(require("../services/users.service"));
class UsersController {
    constructor() {
        this.userService = new users_service_1.default();
        // public getUsers = async (req: Request, res: Response, next: NextFunction) => {
        //   try {
        //     const findAllUsersData: User[] = await this.userService.findAllUser();
        //     res.status(200).json({ data: findAllUsersData, message: 'findAll' });
        //   } catch (error) {
        //     next(error);
        //   }
        // };
        // public getUserById = async (req: Request, res: Response, next: NextFunction) => {
        //   try {
        //     const userId: string = req.params.id;
        //     const findOneUserData: User = await this.userService.findUserById(userId);
        //     res.status(200).json({ data: findOneUserData, message: 'findOne' });
        //   } catch (error) {
        //     next(error);
        //   }
        // };
        // public createUser = async (req: Request, res: Response, next: NextFunction) => {
        //   try {
        //     const userData: CreateUserDto = req.body;
        //     const createUserData: User = await this.userService.createUser(userData);
        //     res.status(201).json({ data: createUserData, message: 'created' });
        //   } catch (error) {
        //     next(error);
        //   }
        // };
        this.createSchoolUser = async (req, res, next) => {
            try {
                const schoolAdminData = req.body;
                const createSchoolAdminData = await this.userService.createSchoolUser(schoolAdminData, req.user);
                await email_service_1.default.sendEmail(createSchoolAdminData.email, 'Verify your credentials', { username: createSchoolAdminData.email, password: req.body.password });
                res.status(201).json({ message: `School-Admin created successfully and send credentials mail on school admin "${createSchoolAdminData.email}" email-id` });
            }
            catch (error) {
                next(error);
            }
        };
        this.getUserProfile = async (req, res, next) => {
            try {
                const createSchoolAdminData = await this.userService.getUserProfile(req.user);
                res.status(201).json({ data: createSchoolAdminData, message: `User Profile fetch successfully` });
            }
            catch (error) {
                next(error);
            }
        };
        this.updateSchoolUser = async (req, res, next) => {
            try {
                const schoolAdminData = req.body;
                const schoolAdminId = req.params.schoolAdminId;
                const userData = req.user;
                const updateSchoolAdminData = await this.userService.updateSchoolUser(schoolAdminId, schoolAdminData, userData);
                res.status(201).json({ data: updateSchoolAdminData, message: 'School-Admin record successfully updated' });
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteSchoolUser = async (req, res, next) => {
            try {
                const schoolAdminData = await this.userService.deleteSchoolAdmin(req.params, req.user);
                res.status(200).json({ data: schoolAdminData, message: "School-Admin deleted successfully" });
            }
            catch (error) {
                next(error);
            }
        };
        this.activateSchoolUser = async (req, res, next) => {
            try {
                const { activateSchoolAdminData, statusMode } = await this.userService.activateSchoolAdmin(req.params, req.user);
                res.status(200).json({ data: activateSchoolAdminData, message: `State "${activateSchoolAdminData.firstName} ${activateSchoolAdminData.lastName}" ${statusMode} successfully` });
            }
            catch (error) {
                next(error);
            }
        };
        this.getSchoolAdmin = async (req, res, next) => {
            var _a, _b;
            try {
                const getSchoolAdminData = await this.userService.getSchoolAdmin(req.query);
                const schoolAdminRecord = getSchoolAdminData ? getSchoolAdminData[0]['data'] : [];
                const schoolAdminCount = getSchoolAdminData ? getSchoolAdminData[0]['count'][0] ? (_b = (_a = getSchoolAdminData[0]) === null || _a === void 0 ? void 0 : _a['count'][0]) === null || _b === void 0 ? void 0 : _b.count : 0 : 0;
                res.status(200).json({ data: schoolAdminRecord, count: schoolAdminCount, message: 'School Admin records fetch successfully' });
            }
            catch (err) {
                next(err);
            }
        };
        this.updateAdminUser = async (req, res, next) => {
            try {
                const adminData = req.body;
                const adminId = req.params.adminId;
                const userData = req.user;
                const updateAdminData = await this.userService.updateAdminUser(adminId, adminData, userData);
                res.status(201).json({ data: updateAdminData, message: 'Super-Admin record successfully updated' });
            }
            catch (error) {
                next(error);
            }
        };
        this.getAdminUser = async (req, res, next) => {
            try {
                const userData = req.user;
                const getAdminData = await this.userService.getAdminUser(req.params.adminId, userData);
                res.status(200).json({ data: getAdminData, message: 'Super Admin fetch successfully' });
            }
            catch (err) {
                next(err);
            }
        };
        // public createRole = async (req: Request, res: Response, next: NextFunction) => {
        //   try {
        //     const createUserData = await this.userService.createRole(req.body);
        //     res.status(201).json({ data: createUserData, message: 'created' });
        //   } catch (error) {
        //     next(error);
        //   }
        // };
        // public updateUser = async (req: Request, res: Response, next: NextFunction) => {
        //   try {
        //     const userId: string = req.params.id;
        //     const userData: CreateUserDto = req.body;
        //     const updateUserData: User = await this.userService.updateUser(userId, userData);
        //     res.status(200).json({ data: updateUserData, message: 'updated' });
        //   } catch (error) {
        //     next(error);
        //   }
        // };
        // public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        //   try {
        //     const userId: string = req.params.id;
        //     const deleteUserData: User = await this.userService.deleteUser(userId);
        //     res.status(200).json({ data: deleteUserData, message: 'deleted' });
        //   } catch (error) {
        //     next(error);
        //   }
        // };
    }
}
exports.default = UsersController;
//# sourceMappingURL=users.controller.js.map