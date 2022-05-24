import Route from '../interfaces/routes.interface';
import StudentsController from "../controllers/students.controller";
declare class StudentsRoute implements Route {
    path: string;
    router: import("express-serve-static-core").Router;
    studentsController: StudentsController;
    constructor();
    private initializeRoutes;
}
export default StudentsRoute;
