import Route from '../interfaces/routes.interface';
import ReportsController from "../controllers/reports.controller";
declare class ReportsRoute implements Route {
    path: string;
    router: import("express-serve-static-core").Router;
    reportsController: ReportsController;
    constructor();
    private initializeRoutes;
}
export default ReportsRoute;
