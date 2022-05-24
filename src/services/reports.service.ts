import { isEmpty } from '../utils/util';
import HttpException from '../exceptions/HttpException';
import { Report } from '../interfaces/reports.interface';
import reportModel from '../models/reports.model';
import moment from 'moment';
import _ from 'loadsh';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

class ReportService {
  public reports = reportModel;

  public async createReport(body, user): Promise<Report> {
    if (user.role.name == "School-Admin" || user.role.name == "School-Sub-Admin") {
      body.schoolId= user.schoolId
    } else if (user.role.name == "Teacher") {
      body.schoolId= user.schoolId
      body.teacherId= user._id
    }
    const createStudent: Report = await this.reports.create({
      ...body,
      userId: user._id,
      createdBy: user._id
    })

    return createStudent;
  }

  public async updateReport(reportId, body, user): Promise<Report> {
    const findReport: Report = await this.reports.findOne({ _id: reportId, isDeleted: false })
    if (!findReport) throw new HttpException(409, `Report not found`);
    else if (findReport.isActivated == true) throw new HttpException(409, `Report is deactivated`);
    else if (findReport.userId.toString() != user._id.toString()) throw new HttpException(409, `This report is not yours`);
    if (user.role.name == "School-Admin" || user.role.name == "School-Sub-Admin") {
      body.schoolId= user.schoolId
    } else if (user.role.name == "Teacher") {
      body.schoolId= user.schoolId
      body.teacherId= user._id
    }
    
    const updateReport: Report = await this.reports.findByIdAndUpdate(reportId, {
      ...body,
      updatedBy: user._id
    },{
      new: true
    })

    return updateReport;
  }

  public async deleteReport(reportId, user): Promise<Report> {
    const findReport: Report = await this.reports.findOne({ _id: reportId, isDeleted: false })
    if (!findReport) throw new HttpException(409, `Report not found`);
    else if (findReport.userId.toString() != user._id.toString()) throw new HttpException(409, `This report is not yours`);

    const deleteReport: Report = await this.reports.findByIdAndUpdate(reportId, {
      isDeleted: true,
      deletedBy: user._id,
      deletedAt: moment().utc().toDate()
    },{
      new: true
    })

    return deleteReport;
  }

  public async changeReportStatus(reportId, user): Promise<{ reportData: Report; statusMode: String; }> {
    const findReport: Report = await this.reports.findOne({ _id: reportId, isDeleted: false })
    if (!findReport) throw new HttpException(409, `Report not found`);
    else if (findReport.userId.toString() != user._id.toString()) throw new HttpException(409, `This report is not yours`);

    let status: Boolean;
    let statusMode: String;
    if (findReport.isActivated === false) {
      status = true
      statusMode = 'Deactivated'
    } else {
      status = false
      statusMode = 'Activated'
    }
    const reportData: Report = await this.reports.findByIdAndUpdate(reportId, {
      isActivated: status,
      updatedBy: user._id
    }, { new: true })

    return { reportData, statusMode };
  }

  public async getReport(reportData, user): Promise<Report[]> {
    const pageNumber = reportData?.pageNumber || 1;
    const pageSize = reportData?.pageSize || 100;
    const limit = Number(pageSize);
    const skip = (Number(pageNumber) - 1) * limit;
    let search = {
      $and: [
        { isDeleted: false },
        { userId: new mongoose.Types.ObjectId(user._id) }
      ] as any
    };
    if (reportData.status) {
      search.$and.push({
        isActivated: JSON.parse(reportData.status)
      })
    }

    if (reportData.search) {
      const searchRegex = new RegExp(reportData.search, 'i')
      search.$and.push({
        $or: [{ name: { $regex: searchRegex } }]
      })
    }

    const getReportData: Report[] = await this.reports.aggregate([
      { $match: search },
      {
        $lookup: {
          from: 'schools',
          localField: 'schoolId',
          foreignField: '_id',
          as: "school"
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'teacherId',
          foreignField: '_id',
          as: "teacher"
        }
      },
      {
        $lookup: {
          from: 'studentdashbordques',
          localField: 'questionId',
          foreignField: '_id',
          as: "question"
        }
      },
      { $unwind: 
        {
          path: '$school',
          preserveNullAndEmptyArrays: true
        } 
      },
      { $unwind: 
        {
          path: '$teacher',
          preserveNullAndEmptyArrays: true
        } 
      },
      { $unwind: 
        {
          path: '$question',
          preserveNullAndEmptyArrays: true
        } 
      },
      {
        $project: {
          name: 1,
          userId: 1,
          startDate: 1,
          endDate: 1,
          districtId: 1,
          schoolId: 1,
          teacherId: 1,
          studentId: 1,
          questionI: 1,
          answer: 1,
          questionTitle: "$question.question",
          schoolName: "$school.schoolName",
          teacherName: { $concat: ["$teacher.firstName", " ", "$teacher.lastName"] },
          isActivated: 1
        }
      }
    ]).facet(
      {
        "data": [
          { $skip: skip },
          { $limit: limit }
        ],
        "count": [
          { $count: "count" }
        ]
      }
    );
    return getReportData;
  }
}

export default ReportService;
