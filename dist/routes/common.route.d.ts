import CommonController from '../controllers/common.controller';
import Route from '../interfaces/routes.interface';
declare class CommonsRoute implements Route {
    path: string;
    router: import("express-serve-static-core").Router;
    commonController: CommonController;
    constructor();
    private initializeRoutes;
}
export default CommonsRoute;
