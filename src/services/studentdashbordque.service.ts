import { isEmpty } from '../utils/util';
import HttpException from '../exceptions/HttpException';
import { StudentDashbordQue } from '../interfaces/studentdashbordque.interface';
import studentDeashbordQueModel from '../models/studentdeashbordque.model';
import moment from 'moment';
import _ from 'loadsh';
import mongoose from 'mongoose';

class StudentDashbordQueService {
  public studentDeashbordQue = studentDeashbordQueModel;

  public async createStudentDashbordQue(queData, userData): Promise<StudentDashbordQue> {
    const findQue: StudentDashbordQue = await this.studentDeashbordQue.findOne({ question: queData.question, isDeleted: false });
    if (findQue) throw new HttpException(409, `Question '${findQue.question}' is already exist`)
    const createStudentDashbordQueData: StudentDashbordQue = await this.studentDeashbordQue.create({
      ...queData,
      createdBy: userData._id
    })
    return createStudentDashbordQueData;
  }

  public async updateStudentDashbordQue(queId, queData, userData): Promise<StudentDashbordQue> {
    const findQue: StudentDashbordQue = await this.studentDeashbordQue.findOne({ _id: queId, isDeleted: false });
    if (!findQue) {
      throw new HttpException(409, `Subject not found`);
    }
    else if (findQue?.isActivated == true) {
      throw new HttpException(409, `Question '${findQue.question}' is deactivated`)
    }
    const updateQueData: StudentDashbordQue = await this.studentDeashbordQue.findByIdAndUpdate(queId, {
      ...queData,
      updatedBy: userData._id
    }, { new: true })

    return updateQueData;
  }

  public async deleteStudentDashbordQue(queId, userData): Promise<StudentDashbordQue> {
    const findQue: StudentDashbordQue = await this.studentDeashbordQue.findOne({ _id: queId, isDeleted: false });
    if (!findQue) {
      throw new HttpException(409, `Question not found`);
    }
    const deleteStudentDashbordQueData: StudentDashbordQue = await this.studentDeashbordQue.findByIdAndUpdate(queId, {
      isDeleted: true,
      deletedBy: userData._id,
      deletedAt: moment().utc().toDate()
    }, { new: true })

    return deleteStudentDashbordQueData;
  }

  public async aciveStudentDashbordQue(queId, userData): Promise<{ activeStudentDashbordQueData: StudentDashbordQue; statusMode: String; }> {
    const findQue: StudentDashbordQue = await this.studentDeashbordQue.findOne({ _id: queId, isDeleted: false });
    if (!findQue) {
      throw new HttpException(409, `Question not found`);
    }

    let status: Boolean;
    let statusMode: String;
    if (findQue.isActivated === false) {
      status = true
      statusMode = 'Deactivated'
    } else {
      status = false
      statusMode = 'Activated'
    }

    const activeStudentDashbordQueData: StudentDashbordQue = await this.studentDeashbordQue.findByIdAndUpdate(queId, {
      isActivated: status,
      updatedBy: userData._id
    }, { new: true })

    return { activeStudentDashbordQueData, statusMode }
  }

  public async getStudentDashbordQue(queData): Promise<StudentDashbordQue[]> {
    let search = {
      $and: [{ isDeleted: false }] as any
    };
    if (queData.status) {
      search.$and.push({
        isActivated: JSON.parse(queData.status)
      })
    }

    if (queData.queId) {
      search.$and.push({
        _id: new mongoose.Types.ObjectId(queData.queId)
      })
    }

    if (queData.assignedSchool) {
      search.$and.push({
        $or: [
          { assignedSchool: { $in: [new mongoose.Types.ObjectId(queData.assignedSchool)] } },
          { isAssignAllSchool: true }
        ]
      })
    }
    const getQueData: StudentDashbordQue[] = await this.studentDeashbordQue.aggregate([
      { $match: search },
      {
        $lookup: {
          from: 'schools',
          localField: 'assignedSchool',
          foreignField: '_id',
          as: "school"
        }
      },
      {
        $unset: ['__v', 'school.__v', 'school.createdAt', 'school.updatedAt', 'school.role', 'school.createdBy', 'school.updatedBy',
          'createdAt', 'createdBy', 'updatedAt', 'updatedBy'
        ]
      }
    ]).facet(
      {
        "data": [],
        "count": [
          { $count: "count" }
        ]
      }
    );
    return getQueData;
  }

  public async checkDefaultQue(): Promise<Boolean> {
    const findQue: StudentDashbordQue = await this.studentDeashbordQue.findOne({ default: true, isDeleted: false });
    let message: Boolean
    if (!findQue) {
      message = false
    } else {
      message = true
    }
    return message;
  }
}

export default StudentDashbordQueService;
