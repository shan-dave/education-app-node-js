"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const endorsements_service_1 = tslib_1.__importDefault(require("../services/endorsements.service"));
class EndorsementsController {
    constructor() {
        this.endorsementService = new endorsements_service_1.default();
        this.createEndorsement = async (req, res, next) => {
            try {
                const createEndorsementData = await this.endorsementService.createEndorsement(req.body, req.user);
                res.status(201).json({ data: createEndorsementData, message: `Endorsement "${createEndorsementData.name}" created successfully` });
            }
            catch (error) {
                next(error);
            }
        };
        this.updateEndorsement = async (req, res, next) => {
            try {
                const endorsementData = req.body;
                const endorsementId = req.params.endorsementId;
                const userData = req.user;
                const updateendorsementData = await this.endorsementService.updateEndorsement(endorsementId, endorsementData, userData);
                res.status(200).json({ data: updateendorsementData, message: `Endorsement "${updateendorsementData.name}" updated successfully` });
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteEndorsement = async (req, res, next) => {
            try {
                const endorsementId = req.params.endorsementId;
                const userData = req.user;
                const deleteEndorsementData = await this.endorsementService.deleteEndorsement(endorsementId, userData);
                res.status(200).json({ data: deleteEndorsementData, message: `Endorsement "${deleteEndorsementData.name}" deleted successfully` });
            }
            catch (error) {
                next(error);
            }
        };
        this.changeEndorsementStatus = async (req, res, next) => {
            try {
                const { changeEndorsementStatusData, statusMode } = await this.endorsementService.changeEndorsementStatus(req.params, req.user);
                res.status(200).json({ data: changeEndorsementStatusData, message: `Endorsement "${changeEndorsementStatusData.name}" ${statusMode} successfully` });
            }
            catch (error) {
                next(error);
            }
        };
        this.getEndorsement = async (req, res, next) => {
            var _a, _b;
            try {
                const endorsementData = await this.endorsementService.getEndorsement(req.query, req.user);
                const endorsementRecord = endorsementData ? endorsementData[0]['data'] : [];
                const endorsementCount = endorsementData ? endorsementData[0]['count'][0] ? (_b = (_a = endorsementData[0]) === null || _a === void 0 ? void 0 : _a['count'][0]) === null || _b === void 0 ? void 0 : _b.count : 0 : 0;
                res.status(200).json({ data: endorsementRecord, count: endorsementCount, message: "Endorsement records fetch successfully" });
            }
            catch (error) {
                next(error);
            }
        };
        //   public getSubject = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
        //       try{
        //         const getSubject = await this.endorsementService.getSubject(req.query);
        //         const subjectRecords = getSubject ? getSubject[0]['data'] : [];
        //         const subjectCount = getSubject ? getSubject[0]['count'][0] ? getSubject[0]?.['count'][0]?.count : 0 : 0;
        //         res.status(200).json({ data: subjectRecords, count: subjectCount, message: 'Subjects record fetch successfully'});
        //       } catch (err){
        //         next(err)
        //       }
        //     }
    }
}
exports.default = EndorsementsController;
//# sourceMappingURL=endorsements.controller.js.map