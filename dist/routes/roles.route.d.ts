import RolesController from '../controllers/roles.controller';
import Route from '../interfaces/routes.interface';
declare class CommonsRoute implements Route {
    path: string;
    router: import("express-serve-static-core").Router;
    roleController: RolesController;
    constructor();
    private initializeRoutes;
}
export default CommonsRoute;
