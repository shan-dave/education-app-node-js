import { isEmpty } from '../utils/util';
import HttpException from '../exceptions/HttpException';
import { Endorsement } from '../interfaces/endorsements.interface';
import endorsementsModel from '../models/endorsements.model';
import moment from 'moment';
import _ from 'loadsh';
import mongoose from 'mongoose';
import { visitFunctionBody } from 'typescript';

class EndorsementService {
  public endorsements = endorsementsModel;

  public async createEndorsement(body, user): Promise<Endorsement> {
    const findEndorsement: Endorsement = await this.endorsements.findOne({ name: body.name, number: body.number, isDeleted: false });
    if (findEndorsement) throw new HttpException(409, `Endorsement "${findEndorsement.name}" is already exist with Endorsement Number "${findEndorsement.number}"`)
    const findEndorsementNumber: Endorsement = await this.endorsements.findOne({ number: body.number, isDeleted: false });
    if (findEndorsementNumber) throw new HttpException(409, `Endorsement Number "${findEndorsementNumber.number}" must be unique`)
    const createEndorsementData: Endorsement = await this.endorsements.create({
      ...body,
      createdBy: user._id
    })

    return createEndorsementData;
  }

  public async updateEndorsement(endorsementId, endorsementData, userData): Promise<Endorsement> {
    const findEndorsement: Endorsement = await this.endorsements.findOne({ _id: endorsementId });
    if (!findEndorsement) {
      throw new HttpException(409, `Endorsement not found`);
    }
    else if (findEndorsement?.isDeleted == true) {
      throw new HttpException(409, `Endorsement ${findEndorsement.name} is deleted`)
    }
    else if (findEndorsement?.isActivated == true) {
      throw new HttpException(409, `Endorsement ${findEndorsement.name} is deavtivated`)
    }

    const updateEndorsementData: Endorsement = await this.endorsements.findByIdAndUpdate(endorsementId, {
      ...endorsementData,
      updatedBy: userData._id
    }, { new: true })

    return updateEndorsementData;
  }

  public async deleteEndorsement(endorsementId, userData): Promise<Endorsement> {
    const findEndorsement: Endorsement = await this.endorsements.findOne({ _id: endorsementId });
    if (!findEndorsement) {
      throw new HttpException(409, `Endorsement not found`);
    }
    else if (findEndorsement?.isDeleted == true) {
      throw new HttpException(409, `Endorsement "${findEndorsement.name}" is already deleted`)
    }

    const deleteEndorsement: Endorsement = await this.endorsements.findByIdAndUpdate(endorsementId, {
      isDeleted: true,
      deletedBy: userData._id,
      deletedAt: moment().utc().toDate()
    }, { new: true })

    return deleteEndorsement;
  }

  public async changeEndorsementStatus(endorsementData, userData): Promise<{changeEndorsementStatusData:Endorsement; statusMode: String;}> {
    const findEndorsement: Endorsement = await this.endorsements.findOne({ _id: endorsementData.endorsementId });
    let status: Boolean;
    let statusMode: String;
    if(findEndorsement.isActivated === false){
      status = true
      statusMode = 'Deactivated'
    }else{
      status = false
      statusMode = 'Activated'
    }
    const changeEndorsementStatusData: Endorsement = await this.endorsements.findByIdAndUpdate(endorsementData.endorsementId,{
        isActivated: status,
        updatedBy: userData._id
    }, {new: true})
    
    return {changeEndorsementStatusData, statusMode};
  }

  public async getEndorsement(endorsementData, userData): Promise<Endorsement[]> {
    const pageNumber = endorsementData?.pageNumber || 1;
    const pageSize = endorsementData?.pageSize || 100;
    const limit = Number(pageSize);
    const skip = (Number(pageNumber) - 1) * limit;
    let search = {
      $and: [
        { isDeleted: false }
      ] as any
    };

    if (endorsementData.status) {
      search.$and.push({ isActivated:  JSON.parse(endorsementData.status) })
    }

    if (endorsementData.endorsementId) {
      search.$and.push({
        _id: new mongoose.Types.ObjectId(endorsementData.endorsementId)
      })
    }

    if (endorsementData.name) {
      search.$and.push({
        name: endorsementData.name
      })
    }

    if (endorsementData.number) {
      search.$and.push({
        number: endorsementData.number
      })
    }
    if (endorsementData.search) {
      const searchRegex = new RegExp(endorsementData.search, 'i') 
      search.$and.push({
        $or: [{name: { $regex: searchRegex } },{number: { $regex: searchRegex }}]
      })
    }

    if(endorsementData.pageNumber && endorsementData.pageSize){
      const getEndorsementData: Endorsement[] = await this.endorsements.aggregate([
        { $match: search },
      ]).facet(
        {
          "data": [
            // { $sort: sortBy },.
            { $skip: skip },
            { $limit: limit }
          ],
          "count": [
            { $count: "count" }
          ]
        }
      ); 
      return getEndorsementData;
    }else{
      const getEndorsementData: Endorsement[] = await this.endorsements.aggregate([
        { $match: search },
      ]).facet(
        {
          "data": [
          ],
          "count": [
            { $count: "count" }
          ]
        }
      );
      return getEndorsementData;
    }
  }

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

export default EndorsementService;
