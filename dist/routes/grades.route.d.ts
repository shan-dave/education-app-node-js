import GradesController from '../controllers/grades.controller';
import Route from '../interfaces/routes.interface';
declare class GradesRoute implements Route {
    path: string;
    router: import("express-serve-static-core").Router;
    gradeController: GradesController;
    constructor();
    private initializeRoutes;
}
export default GradesRoute;
