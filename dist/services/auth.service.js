"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const config_1 = tslib_1.__importDefault(require("config"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const HttpException_1 = tslib_1.__importDefault(require("../exceptions/HttpException"));
const users_model_1 = tslib_1.__importDefault(require("../models/users.model"));
const util_1 = require("../utils/util");
const moment_1 = tslib_1.__importDefault(require("moment"));
class AuthService {
    constructor() {
        this.users = users_model_1.default;
        // public createToken(user: User): TokenData {
        //   const dataStoredInToken: DataStoredInToken = { _id: user._id };
        //   const secret: string = config.get('secretKey');
        //   const expiresIn: number = 60 * 60;
        //   return { expiresIn, token: jwt.sign(dataStoredInToken, secret, { expiresIn }) };
        // }
        // public createCookie(tokenData: TokenData): string {
        //   return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
        // }
    }
    async signup(userData) {
        if (util_1.isEmpty(userData))
            throw new HttpException_1.default(400, "You're not userData");
        const findUser = await this.users.findOne({ email: userData.email });
        if (findUser)
            throw new HttpException_1.default(409, `You're email ${userData.email} already exists`);
        const hashedPassword = await bcrypt_1.default.hash(userData.password, 10);
        const createUserData = await this.users.create(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
        return createUserData;
    }
    async login(userData) {
        if (util_1.isEmpty(userData))
            throw new HttpException_1.default(400, "You're not userData");
        const findUser = await this.users.findOne({ email: userData.email, isDeleted: false }).populate('role', 'name');
        if (!findUser) {
            throw new HttpException_1.default(409, `You're email ${userData.email} not found`);
        }
        else if (findUser.isActivated == true) {
            throw new HttpException_1.default(409, `User ${userData.email} is deactivated`);
        }
        const isPasswordMatching = await bcrypt_1.default.compare(userData.password, findUser.password);
        if (!isPasswordMatching)
            throw new HttpException_1.default(409, "You're password not matching");
        const tokenData = this.createToken(findUser);
        const accessToken = tokenData.token;
        return { accessToken, findUser };
    }
    // public async login(userData: CreateUserDto): Promise<{ cookie: string; findUser: User }> {
    //   if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
    //   const findUser: User = await this.users.findOne({ email: userData.email }).populate('role', 'name');
    //   if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);
    //   const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
    //   if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");
    //   const tokenData = this.createToken(findUser);
    //   const cookie = this.createCookie(tokenData);
    //   return { cookie, findUser };
    // }
    async logout(userData) {
        if (util_1.isEmpty(userData))
            throw new HttpException_1.default(400, "You're not userData");
        const findUser = await this.users.findOne({ email: userData.email, password: userData.password });
        if (!findUser)
            throw new HttpException_1.default(409, `You're email ${userData.email} not found`);
        return findUser;
    }
    async resetPasswordForMail(userId, userData) {
        const findUser = await this.users.findOne({ _id: userId, isDeleted: false }).populate('role', 'name').select('-password');
        if (!findUser)
            throw new HttpException_1.default(409, `User not found`);
        // if(userData.role['name'] == 'School-Admin' && (findUser.role['name'] == 'Teacher' || findUser.role['name'] == 'School-Sub-Admin') && userData.schoolId.toString() != findUser.schoolId.toString()){
        if (userData.role['name'] == 'School-Admin') {
            if (findUser.role['name'] == 'School-Sub-Admin' && userData.schoolId.toString() == findUser.schoolId.toString()) {
                const tokenData = this.createTokenForResetPassword(findUser, userData);
                const accessToken = tokenData.token;
                return { accessToken, findUser };
            }
            else if (findUser.role['name'] == 'Teacher' && userData.schoolId.toString() == findUser.schoolId.toString()) {
                const tokenData = this.createTokenForResetPassword(findUser, userData);
                const accessToken = tokenData.token;
                return { accessToken, findUser };
            }
            else if (findUser.role['name'] == 'School-Admin' && userData._id.toString() == userId.toString()) {
                const tokenData = this.createTokenForResetPassword(findUser, userData);
                const accessToken = tokenData.token;
                return { accessToken, findUser };
            }
            else {
                throw new HttpException_1.default(409, `Permission Denied`);
            }
        }
        else if (userData.role['name'] == 'School-Sub-Admin') {
            if (findUser.role['name'] == 'Teacher' && userData.schoolId.toString() == findUser.schoolId.toString()) {
                const tokenData = this.createTokenForResetPassword(findUser, userData);
                const accessToken = tokenData.token;
                return { accessToken, findUser };
            }
            else if (findUser.role['name'] == 'School-Sub-Admin' && userData._id.toString() == userId.toString()) {
                const tokenData = this.createTokenForResetPassword(findUser, userData);
                const accessToken = tokenData.token;
                return { accessToken, findUser };
            }
            else {
                throw new HttpException_1.default(409, `Permission Denied`);
            }
        }
        else if (userData.role['name'] == 'Teacher') {
            if (findUser.role['name'] == 'Teacher' && userData._id.toString() == userId.toString()) {
                const tokenData = this.createTokenForResetPassword(findUser, userData);
                const accessToken = tokenData.token;
                return { accessToken, findUser };
            }
            else {
                throw new HttpException_1.default(409, `Permission Denied`);
            }
        }
        else if (userData.role['name'] == 'Super-Admin') {
            const tokenData = this.createTokenForResetPassword(findUser, userData);
            const accessToken = tokenData.token;
            return { accessToken, findUser };
        }
        else {
            throw new HttpException_1.default(409, `Permission Denied`);
        }
    }
    async resetPasswordByUserForMail(email) {
        const findUser = await this.users.findOne({ email: email, isDeleted: false }).populate('role', 'name').select('-password');
        if (!findUser)
            throw new HttpException_1.default(409, `User not found`);
        const tokenData = this.createTokenByUserForResetPassword(findUser);
        const accessToken = tokenData.token;
        return { accessToken, findUser };
    }
    async resetPassword(token, password) {
        const secret = config_1.default.get('secretKey');
        var decoded = jsonwebtoken_1.default.verify(token, secret);
        const findUser = await this.users.findOne({ _id: decoded['_id'], isDeleted: false }).select('-password');
        if (!findUser)
            throw new HttpException_1.default(409, `User not found`);
        const queryData = {
            password: await bcrypt_1.default.hash(password, 10)
        };
        if (decoded['authUserData']) {
            queryData['updatedBy'] = decoded['authUserData'];
        }
        else {
            queryData['updatedBy'] = decoded['_id'];
        }
        const updatePassword = await this.users.findByIdAndUpdate(findUser._id, queryData, { new: true });
        return updatePassword;
    }
    async changePassword(body, user) {
        const findUser = await this.users.findOne({ _id: body.userId, isDeleted: false });
        if (!findUser)
            throw new HttpException_1.default(409, `User not found`);
        if (findUser._id.toString() != user._id.toString())
            throw new HttpException_1.default(500, `forbidden`);
        const isPasswordMatching = await bcrypt_1.default.compare(body.oldPassword, findUser.password);
        if (!isPasswordMatching)
            throw new HttpException_1.default(409, "You're password not matching");
        const updatePassword = await this.users.findByIdAndUpdate(findUser._id, {
            password: await bcrypt_1.default.hash(body.newPassword, 10),
            updatedBy: findUser._id
        }, { new: true });
        return updatePassword;
    }
    createToken(user) {
        const dataStoredInToken = {
            _id: user._id,
            exp: moment_1.default().add(60, 'minutes').unix(),
            ist: moment_1.default().unix()
        };
        const secret = config_1.default.get('secretKey');
        return { token: jsonwebtoken_1.default.sign(dataStoredInToken, secret) };
    }
    createTokenForResetPassword(user, userData) {
        const dataStoredInToken = {
            _id: user._id,
            authUserData: userData._id,
            exp: moment_1.default().add(1, 'days').unix(),
            ist: moment_1.default().unix()
        };
        const secret = config_1.default.get('secretKey');
        return { token: jsonwebtoken_1.default.sign(dataStoredInToken, secret) };
    }
    createTokenByUserForResetPassword(user) {
        const dataStoredInToken = {
            _id: user._id,
            exp: moment_1.default().add(1, 'days').unix(),
            ist: moment_1.default().unix()
        };
        const secret = config_1.default.get('secretKey');
        return { token: jsonwebtoken_1.default.sign(dataStoredInToken, secret) };
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map