import { Router } from "express";
import Route from '../interfaces/routes.interface';
import validationMiddleware from "../middlewares/validation.middleware";
import authMiddleware from "../middlewares/auth.middleware";
import QueAnsStudentDashbordController from "../controllers/queansstudentdashbord.controller";
import { CreateQueAnsStudentDashbordDto } from '../dtos/queansstudentdashbord.dto'
class QueAnsStudentDashbordRoute implements Route {
    public path = '/queans_student_dashbord';
    public router = Router();
    public queAnsStudentDashbordController = new QueAnsStudentDashbordController()
    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.post(`${this.path}`, authMiddleware('create-student-dashbord-queans'), validationMiddleware(CreateQueAnsStudentDashbordDto, 'body'), this.queAnsStudentDashbordController.createQueAnsStudentDashbord)
        this.router.get(`${this.path}/chart1`,authMiddleware('get-student-dashbord-queans-list') , this.queAnsStudentDashbordController.getQueAnsStudentDashbordListChart1)
        this.router.get(`${this.path}/attendance_chart`,authMiddleware('get-student-dashbord-queans-list') , this.queAnsStudentDashbordController.getQueAnsStudentDashbordListAttendanceChart)
        this.router.get(`${this.path}/chart2`,authMiddleware('get-student-dashbord-queans-list') , this.queAnsStudentDashbordController.getQueAnsStudentDashbordListChart2)
        this.router.get(`${this.path}/chart3`,authMiddleware('get-student-dashbord-queans-list') , this.queAnsStudentDashbordController.getQueAnsStudentDashbordListChart3)
        this.router.get(`${this.path}/chart4`,authMiddleware('get-student-dashbord-queans-list') , this.queAnsStudentDashbordController.getQueAnsStudentDashbordListChart4)
        this.router.get(`${this.path}/chart5`,authMiddleware('get-student-dashbord-queans-list') , this.queAnsStudentDashbordController.getQueAnsStudentDashbordListChart5)
        this.router.get(`${this.path}/chart6`,authMiddleware('get-student-dashbord-queans-list') , this.queAnsStudentDashbordController.getQueAnsStudentDashbordListChart6)
    }
}

export default QueAnsStudentDashbordRoute;