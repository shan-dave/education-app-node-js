import Route from '../interfaces/routes.interface';
import TeachersController from "../controllers/teachers.controller";
declare class SubjectsRoute implements Route {
    path: string;
    router: import("express-serve-static-core").Router;
    teachersController: TeachersController;
    constructor();
    private initializeRoutes;
}
export default SubjectsRoute;
