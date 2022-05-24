import { Router } from "express";
import Route from '../interfaces/routes.interface';
import validationMiddleware from "../middlewares/validation.middleware";
import authMiddleware from "../middlewares/auth.middleware";
import EndorsementsController from "../controllers/endorsements.controller";
import {CreateEndorsementDto} from '../dtos/endorsements.dto'
class EndorsementsRoute implements Route {
    public path = '/endorsements';
    public router = Router();
    public endorsementController = new EndorsementsController()

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, validationMiddleware(CreateEndorsementDto, 'body'), authMiddleware('create-endorsement'), this.endorsementController.createEndorsement)
        this.router.put(`${this.path}/update/:endorsementId`, validationMiddleware(CreateEndorsementDto, 'body'), authMiddleware('update-endorsement'), this.endorsementController.updateEndorsement);
        this.router.delete(`${this.path}/:endorsementId`, authMiddleware('delete-endorsement'), this.endorsementController.deleteEndorsement);
        this.router.get(`${this.path}`, authMiddleware('get-endorsement'), this.endorsementController.getEndorsement);
        this.router.put(`${this.path}/change_status/:endorsementId`, authMiddleware('change-endorsement-status'), this.endorsementController.changeEndorsementStatus);
    }
}

export default EndorsementsRoute;