import { Router } from "express";
import Route from '../interfaces/routes.interface';
import validationMiddleware from "../middlewares/validation.middleware";
import authMiddleware from "../middlewares/auth.middleware";
import TeachersController from "../controllers/teachers.controller";
import {CreateTeacherDto, updateTeacherDto } from '../dtos/teachers.dto'

class SubjectsRoute implements Route {
    public path = '/teachers';
    public router = Router();
    public teachersController = new TeachersController()

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, validationMiddleware(CreateTeacherDto, 'body'), authMiddleware('create-teacher'), this.teachersController.createTeacher)
        this.router.put(`${this.path}/update/:teacherId`, validationMiddleware(updateTeacherDto, 'body'), authMiddleware('update-teacher'), this.teachersController.updateTeacher);
        this.router.put(`${this.path}/delete/:teacherId`, authMiddleware('delete-teacher'), this.teachersController.deleteTeacher);
        this.router.put(`${this.path}/change_status/:teacherId`, authMiddleware('activate-teacher'), this.teachersController.activateTeacher);
        this.router.post(`${this.path}/get`, authMiddleware('get-teacher'), this.teachersController.getTeacher);
    }
}

export default SubjectsRoute;