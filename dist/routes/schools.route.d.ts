import SchoolsController from '../controllers/schools.controller';
import Route from '../interfaces/routes.interface';
declare class SchoolsRoute implements Route {
    path: string;
    router: import("express-serve-static-core").Router;
    schoolsController: SchoolsController;
    constructor();
    private initializeRoutes;
}
export default SchoolsRoute;
