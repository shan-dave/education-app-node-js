import { Router } from "express";
import Route from '../interfaces/routes.interface';
import validationMiddleware from "../middlewares/validation.middleware";
import authMiddleware from "../middlewares/auth.middleware";
import StudentDashbordQueController from "../controllers/studentdashbordque.controller";
import {CreateStudentDashbordQue} from '../dtos/studentdashbordque.dto'
class StudentDashbordQueRoute implements Route {
    public path = '/stu_dashbord_que';
    public router = Router();
    public studentDashbordQueController = new StudentDashbordQueController()

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, authMiddleware('create-student-dashbord-que'), validationMiddleware(CreateStudentDashbordQue, 'body'), this.studentDashbordQueController.createStudentDashbordQue)
        this.router.put(`${this.path}/:queId`, authMiddleware('update-student-dashbord-que'), validationMiddleware(CreateStudentDashbordQue, 'body'), this.studentDashbordQueController.updateStudentDashbordQue);
        this.router.delete(`${this.path}/:queId`, authMiddleware('delete-student-dashbord-que'), this.studentDashbordQueController.deleteStudentDashbordQue);
        this.router.get(`${this.path}`, authMiddleware('get-student-dashbord-que'), this.studentDashbordQueController.getStudentDashbordQue);
        this.router.put(`${this.path}/change_status/:queId`, authMiddleware('active-student-dashbord-que'), this.studentDashbordQueController.activeStudentDashbordQue);
        this.router.post(`${this.path}/check_default`, authMiddleware('check_default-que'), this.studentDashbordQueController.checkDefaultQue);
    }
}

export default StudentDashbordQueRoute;