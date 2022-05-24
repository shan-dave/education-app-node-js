import CSVController from '../controllers/csv.controller';
import MediaController from '../controllers/media.controller';
import Route from '../interfaces/routes.interface';
declare class SchoolsRoute implements Route {
    path: string;
    router: import("express-serve-static-core").Router;
    csvController: CSVController;
    mediaController: MediaController;
    constructor();
    private initializeRoutes;
}
export default SchoolsRoute;
