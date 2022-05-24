import emailService from '../services/email.service';
import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '../dtos/users.dto';
import { User } from '../interfaces/users.interface';
import userService from '../services/users.service';
import {IGetUserAuthInfo} from '../interfaces/request.interface'

class UsersController {
  public userService = new userService();

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

  public createSchoolUser = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
      const schoolAdminData = req.body;
      const createSchoolAdminData: User = await this.userService.createSchoolUser(schoolAdminData, req.user);
      await emailService.sendEmail(createSchoolAdminData.email, 'Verify your credentials', {username: createSchoolAdminData.email, password: req.body.password})
      res.status(201).json({message: `School-Admin created successfully and send credentials mail on school admin "${createSchoolAdminData.email}" email-id` });
    } catch (error) {
      next(error);
    }
  };

  public getUserProfile = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
      const createSchoolAdminData: User = await this.userService.getUserProfile(req.user);
      res.status(201).json({data: createSchoolAdminData,message: `User Profile fetch successfully` });
    } catch (error) {
      next(error);
    }
  };

  public updateSchoolUser = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
      const schoolAdminData = req.body;
      const schoolAdminId = req.params.schoolAdminId
      const userData = req.user
      const updateSchoolAdminData: User = await this.userService.updateSchoolUser(schoolAdminId,schoolAdminData,userData);
      res.status(201).json({ data: updateSchoolAdminData, message: 'School-Admin record successfully updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteSchoolUser = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
        const schoolAdminData = await this.userService.deleteSchoolAdmin(req.params, req.user)  
        res.status(200).json({ data: schoolAdminData, message: "School-Admin deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
  
  public activateSchoolUser = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
        const {activateSchoolAdminData, statusMode} = await this.userService.activateSchoolAdmin(req.params, req.user);  
        res.status(200).json({ data: activateSchoolAdminData, message: `State "${activateSchoolAdminData.firstName} ${activateSchoolAdminData.lastName}" ${statusMode} successfully` });
    } catch (error) {
      next(error);
    }
  };

  public getSchoolAdmin = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try{
      const getSchoolAdminData = await this.userService.getSchoolAdmin(req.query);
      const schoolAdminRecord = getSchoolAdminData ? getSchoolAdminData[0]['data'] : [];
      const schoolAdminCount = getSchoolAdminData ? getSchoolAdminData[0]['count'][0] ? getSchoolAdminData[0]?.['count'][0]?.count : 0 : 0;

      res.status(200).json({ data: schoolAdminRecord, count: schoolAdminCount, message: 'School Admin records fetch successfully'});
    } catch (err){
      next(err)
    }
  }

  public updateAdminUser = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try {
      const adminData = req.body;
      const adminId = req.params.adminId
      const userData = req.user
      const updateAdminData: User = await this.userService.updateAdminUser(adminId,adminData,userData);
      res.status(201).json({ data: updateAdminData, message: 'Super-Admin record successfully updated' });
    } catch (error) {
      next(error);
    }
  };

  public getAdminUser = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    try{
      const userData = req.user
      const getAdminData = await this.userService.getAdminUser(req.params.adminId, userData);
      
      res.status(200).json({ data: getAdminData, message: 'Super Admin fetch successfully'});
    } catch (err){
      next(err)
    }
  }
  
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

export default UsersController;
