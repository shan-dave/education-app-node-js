import bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken';
import { CreateUserDto } from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';
import { DataStoredInToken, TokenData, DataStoredInTokenForResetPassword } from '../interfaces/auth.interface';
import { User } from '../interfaces/users.interface';
import userModel from '../models/users.model';
import { isEmpty } from '../utils/util';
import moment from 'moment'

class AuthService {
  public users = userModel;

  public async signup(userData): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async login(userData: CreateUserDto): Promise<{ accessToken: string; findUser: User; }> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({ email: userData.email, isDeleted: false }).populate('role', 'name');
    if (!findUser) {
      throw new HttpException(409, `You're email ${userData.email} not found`)
    }
     else if(findUser.isActivated == true){
      throw new HttpException(409, `User ${userData.email} is deactivated`)
    }

    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

    const tokenData = this.createToken(findUser);
    const accessToken = tokenData.token
    
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

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

    return findUser;
  }

  public async resetPasswordForMail(userId: User,userData: User): Promise<{ accessToken: string; findUser: User; }> {
    const findUser: User = await this.users.findOne({ _id: userId, isDeleted: false }).populate('role', 'name').select('-password');
    if (!findUser) throw new HttpException(409, `User not found`);
    // if(userData.role['name'] == 'School-Admin' && (findUser.role['name'] == 'Teacher' || findUser.role['name'] == 'School-Sub-Admin') && userData.schoolId.toString() != findUser.schoolId.toString()){
    if(userData.role['name'] == 'School-Admin'){
      if(findUser.role['name'] == 'School-Sub-Admin' &&  userData.schoolId.toString() == findUser.schoolId.toString()){
        const tokenData = this.createTokenForResetPassword(findUser,userData);
        const accessToken = tokenData.token
        return { accessToken, findUser };
      } else if(findUser.role['name'] == 'Teacher' &&  userData.schoolId.toString() == findUser.schoolId.toString()){
        const tokenData = this.createTokenForResetPassword(findUser,userData);
        const accessToken = tokenData.token
        return { accessToken, findUser };
      } else if(findUser.role['name'] == 'School-Admin' && userData._id.toString() == userId.toString()){
        const tokenData = this.createTokenForResetPassword(findUser,userData);
        const accessToken = tokenData.token
        return { accessToken, findUser };
      } else {
        throw new HttpException(409, `Permission Denied`);  
      }
    }else if(userData.role['name'] == 'School-Sub-Admin'){
      if(findUser.role['name'] == 'Teacher' &&  userData.schoolId.toString() == findUser.schoolId.toString()){
        const tokenData = this.createTokenForResetPassword(findUser,userData);
        const accessToken = tokenData.token
        return { accessToken, findUser };
      } else if(findUser.role['name'] == 'School-Sub-Admin' && userData._id.toString() == userId.toString()){
        const tokenData = this.createTokenForResetPassword(findUser,userData);
        const accessToken = tokenData.token
        return { accessToken, findUser };
      } else {
        throw new HttpException(409, `Permission Denied`);  
      }
    }else if(userData.role['name'] == 'Teacher'){
      if(findUser.role['name'] == 'Teacher' && userData._id.toString() == userId.toString()){
        const tokenData = this.createTokenForResetPassword(findUser,userData);
        const accessToken = tokenData.token
        return { accessToken, findUser };
      } else {
        throw new HttpException(409, `Permission Denied`);
      }  
    } else if(userData.role['name'] == 'Super-Admin'){
      const tokenData = this.createTokenForResetPassword(findUser,userData);
      const accessToken = tokenData.token
      return { accessToken, findUser };
    }else{
      throw new HttpException(409, `Permission Denied`);
    }
  }

  public async resetPasswordByUserForMail(email): Promise<{ accessToken: string; findUser: User; }> {
    const findUser: User = await this.users.findOne({ email: email, isDeleted: false }).populate('role', 'name').select('-password');
    if (!findUser) throw new HttpException(409, `User not found`);
    const tokenData = this.createTokenByUserForResetPassword(findUser);
    const accessToken = tokenData.token
    
    return {accessToken, findUser}
  }

  public async resetPassword(token, password): Promise<User> {
    const secret: string = config.get('secretKey');
    var decoded = jwt.verify(token, secret);
    const findUser: User = await this.users.findOne({ _id: decoded['_id'], isDeleted: false }).select('-password');
    if(!findUser)throw new HttpException(409, `User not found`);
    const queryData = {
      password: await bcrypt.hash(password, 10)
    }
    if(decoded['authUserData']){
      queryData['updatedBy'] = decoded['authUserData']
    }else{
      queryData['updatedBy'] = decoded['_id']
    }
    const updatePassword: User = await this.users.findByIdAndUpdate(findUser._id, queryData,{new: true})
    return updatePassword
  }

  public async changePassword(body, user): Promise<User> {  
    const findUser: User = await this.users.findOne({ _id: body.userId, isDeleted: false });
    if(!findUser) throw new HttpException(409, `User not found`);
    if(findUser._id.toString() != user._id.toString()) throw new HttpException(500, `forbidden`);
    
    const isPasswordMatching: boolean = await bcrypt.compare(body.oldPassword, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");
    
    const updatePassword: User = await this.users.findByIdAndUpdate(findUser._id, {
      password: await bcrypt.hash(body.newPassword, 10),
      updatedBy: findUser._id
    },{new: true})
    return updatePassword
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { 
      _id: user._id,
      exp: moment().add(60, 'minutes').unix(),
      ist: moment().unix()
    };
    const secret: string = config.get('secretKey');

    return { token: jwt.sign(dataStoredInToken, secret) };
  }

  public createTokenForResetPassword(user: User, userData: User): TokenData {
    const dataStoredInToken: DataStoredInTokenForResetPassword = { 
      _id: user._id,
      authUserData: userData._id,
      exp: moment().add(1, 'days').unix(),
      ist: moment().unix()
    };
    const secret: string = config.get('secretKey');

    return { token: jwt.sign(dataStoredInToken, secret) };
  }

  public createTokenByUserForResetPassword(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { 
      _id: user._id,
      exp: moment().add(1, 'days').unix(),
      ist: moment().unix()
    };
    const secret: string = config.get('secretKey');

    return { token: jwt.sign(dataStoredInToken, secret) };
  }
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

export default AuthService;
