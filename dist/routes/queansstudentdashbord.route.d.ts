import Route from '../interfaces/routes.interface';
import QueAnsStudentDashbordController from "../controllers/queansstudentdashbord.controller";
declare class QueAnsStudentDashbordRoute implements Route {
    path: string;
    router: import("express-serve-static-core").Router;
    queAnsStudentDashbordController: QueAnsStudentDashbordController;
    constructor();
    private initializeRoutes;
}
export default QueAnsStudentDashbordRoute;
