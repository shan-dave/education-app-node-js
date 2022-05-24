"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const HttpException_1 = tslib_1.__importDefault(require("../exceptions/HttpException"));
const endorsements_model_1 = tslib_1.__importDefault(require("../models/endorsements.model"));
const moment_1 = tslib_1.__importDefault(require("moment"));
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
class EndorsementService {
    constructor() {
        this.endorsements = endorsements_model_1.default;
        //   public async getSubject(subjectData): Promise<Subject[]> {
        //     let search = {
        //       $and: [{ createdAt: { $ne: "" } }] as any
        //     };
        //     if (subjectData.isDeleted) {
        //       search.$and.push({
        //         isDeleted: JSON.parse(subjectData.isDeleted)
        //       })
        //     }
        //     if (subjectData.subjectId) {
        //       search.$and.push({
        //         _id: mongoose.Types.ObjectId(subjectData.subjectId)
        //       })
        //     }
        //     if (subjectData.subjectName) {
        //       search.$and.push({
        //         name: subjectData.subjectName
        //       })
        //     }
        //     if (subjectData.name) {
        //       const searchRegex = new RegExp(subjectData.name, 'i') 
        //       search.$and.push({
        //         name: { $regex: searchRegex }
        //       })
        //     }
        //     if (subjectData.std) {
        //       search.$and.push({
        //         std: subjectData.std
        //       })
        //     }
        //     // const createSchoolData: School[] = await this.schools.find(search)
        //     // if(isEmpty(createSchoolData)) throw new HttpException(409, `School record not found`);
        //     const getSubjectData: Subject[] = await this.subjects.aggregate([
        //       { $match: search },
        //     ]).facet(
        //       {
        //         "data": [
        //           { $sort: { std: 1 } },
        //         ],
        //         "count": [
        //           { $count: "count" }
        //         ]
        //       }
        //     );
        //     // if (isEmpty(getSubjectData[0]['data'])) throw new HttpException(409, `Subjects record not found`);
        //     return getSubjectData;
        //   }
    }
    async createEndorsement(body, user) {
        const findEndorsement = await this.endorsements.findOne({ name: body.name, number: body.number, isDeleted: false });
        if (findEndorsement)
            throw new HttpException_1.default(409, `Endorsement "${findEndorsement.name}" is already exist with Endorsement Number "${findEndorsement.number}"`);
        const findEndorsementNumber = await this.endorsements.findOne({ number: body.number, isDeleted: false });
        if (findEndorsementNumber)
            throw new HttpException_1.default(409, `Endorsement Number "${findEndorsementNumber.number}" must be unique`);
        const createEndorsementData = await this.endorsements.create(Object.assign(Object.assign({}, body), { createdBy: user._id }));
        return createEndorsementData;
    }
    async updateEndorsement(endorsementId, endorsementData, userData) {
        const findEndorsement = await this.endorsements.findOne({ _id: endorsementId });
        if (!findEndorsement) {
            throw new HttpException_1.default(409, `Endorsement not found`);
        }
        else if ((findEndorsement === null || findEndorsement === void 0 ? void 0 : findEndorsement.isDeleted) == true) {
            throw new HttpException_1.default(409, `Endorsement ${findEndorsement.name} is deleted`);
        }
        else if ((findEndorsement === null || findEndorsement === void 0 ? void 0 : findEndorsement.isActivated) == true) {
            throw new HttpException_1.default(409, `Endorsement ${findEndorsement.name} is deavtivated`);
        }
        const updateEndorsementData = await this.endorsements.findByIdAndUpdate(endorsementId, Object.assign(Object.assign({}, endorsementData), { updatedBy: userData._id }), { new: true });
        return updateEndorsementData;
    }
    async deleteEndorsement(endorsementId, userData) {
        const findEndorsement = await this.endorsements.findOne({ _id: endorsementId });
        if (!findEndorsement) {
            throw new HttpException_1.default(409, `Endorsement not found`);
        }
        else if ((findEndorsement === null || findEndorsement === void 0 ? void 0 : findEndorsement.isDeleted) == true) {
            throw new HttpException_1.default(409, `Endorsement "${findEndorsement.name}" is already deleted`);
        }
        const deleteEndorsement = await this.endorsements.findByIdAndUpdate(endorsementId, {
            isDeleted: true,
            deletedBy: userData._id,
            deletedAt: moment_1.default().utc().toDate()
        }, { new: true });
        return deleteEndorsement;
    }
    async changeEndorsementStatus(endorsementData, userData) {
        const findEndorsement = await this.endorsements.findOne({ _id: endorsementData.endorsementId });
        let status;
        let statusMode;
        if (findEndorsement.isActivated === false) {
            status = true;
            statusMode = 'Deactivated';
        }
        else {
            status = false;
            statusMode = 'Activated';
        }
        const changeEndorsementStatusData = await this.endorsements.findByIdAndUpdate(endorsementData.endorsementId, {
            isActivated: status,
            updatedBy: userData._id
        }, { new: true });
        return { changeEndorsementStatusData, statusMode };
    }
    async getEndorsement(endorsementData, userData) {
        const pageNumber = (endorsementData === null || endorsementData === void 0 ? void 0 : endorsementData.pageNumber) || 1;
        const pageSize = (endorsementData === null || endorsementData === void 0 ? void 0 : endorsementData.pageSize) || 100;
        const limit = Number(pageSize);
        const skip = (Number(pageNumber) - 1) * limit;
        let search = {
            $and: [
                { isDeleted: false }
            ]
        };
        if (endorsementData.status) {
            search.$and.push({ isActivated: JSON.parse(endorsementData.status) });
        }
        if (endorsementData.endorsementId) {
            search.$and.push({
                _id: new mongoose_1.default.Types.ObjectId(endorsementData.endorsementId)
            });
        }
        if (endorsementData.name) {
            search.$and.push({
                name: endorsementData.name
            });
        }
        if (endorsementData.number) {
            search.$and.push({
                number: endorsementData.number
            });
        }
        if (endorsementData.search) {
            const searchRegex = new RegExp(endorsementData.search, 'i');
            search.$and.push({
                $or: [{ name: { $regex: searchRegex } }, { number: { $regex: searchRegex } }]
            });
        }
        if (endorsementData.pageNumber && endorsementData.pageSize) {
            const getEndorsementData = await this.endorsements.aggregate([
                { $match: search },
            ]).facet({
                "data": [
                    // { $sort: sortBy },.
                    { $skip: skip },
                    { $limit: limit }
                ],
                "count": [
                    { $count: "count" }
                ]
            });
            return getEndorsementData;
        }
        else {
            const getEndorsementData = await this.endorsements.aggregate([
                { $match: search },
            ]).facet({
                "data": [],
                "count": [
                    { $count: "count" }
                ]
            });
            return getEndorsementData;
        }
    }
}
exports.default = EndorsementService;
//# sourceMappingURL=endorsements.service.js.map