import Route from '../interfaces/routes.interface';
import StudentDashbordQueController from "../controllers/studentdashbordque.controller";
declare class StudentDashbordQueRoute implements Route {
    path: string;
    router: import("express-serve-static-core").Router;
    studentDashbordQueController: StudentDashbordQueController;
    constructor();
    private initializeRoutes;
}
export default StudentDashbordQueRoute;
