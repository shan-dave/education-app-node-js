import { Router } from "express";
import Route from '../interfaces/routes.interface';
import validationMiddleware from "../middlewares/validation.middleware";
import authMiddleware from "../middlewares/auth.middleware";
import StudentsController from "../controllers/students.controller";
import {CreateStudentDto, UpdateStudentDto } from '../dtos/students.dto'

class StudentsRoute implements Route {
    public path = '/students';
    public router = Router();
    public studentsController = new StudentsController()

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, validationMiddleware(CreateStudentDto, 'body'), authMiddleware('create-student'), this.studentsController.createStudent)
        this.router.put(`${this.path}/:studentId`, validationMiddleware(UpdateStudentDto, 'body'), authMiddleware('update-student'), this.studentsController.updateStudent);
        this.router.delete(`${this.path}/:studentId`, authMiddleware('delete-student'), this.studentsController.deleteStudent);
        this.router.put(`${this.path}/change_status/:studentId`, authMiddleware('activate-student'), this.studentsController.activateStudent);
        this.router.get(`${this.path}`, authMiddleware('get-student'), this.studentsController.getStudent);

        // this.router.post(`${this.path}/assign_teacher`, authMiddleware('assign-teacher'), this.studentsController.assignTeacher);
    }

}

export default StudentsRoute;