import Route from '../interfaces/routes.interface';
import EndorsementsController from "../controllers/endorsements.controller";
declare class EndorsementsRoute implements Route {
    path: string;
    router: import("express-serve-static-core").Router;
    endorsementController: EndorsementsController;
    constructor();
    private initializeRoutes;
}
export default EndorsementsRoute;
