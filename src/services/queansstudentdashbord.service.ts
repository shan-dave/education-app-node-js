import { isEmpty } from '../utils/util';
import HttpException from '../exceptions/HttpException';
import { QueAns, QueAnsStudentDashbord } from '../interfaces/queansstudentdashbord.interface';
import QueAnsStudentDeashbordModel from '../models/queansstudentdashbord.model';
import { Student } from '../interfaces/students.interface';
import studentModel from '../models/students.model';
import moment from 'moment';
import _ from 'loadsh';
import mongoose from 'mongoose';


class QueAnsStudentDeashbordService {
  public queAnsStudentDeashbord = QueAnsStudentDeashbordModel;
  public students = studentModel;

  public async createQueAnsStudentDashbord(queAnsData, userData): Promise<QueAnsStudentDashbord> {
    const todayDate = moment().utc().format("YYYY-MM-DD")
    const todayReportExist: QueAnsStudentDashbord = await this.queAnsStudentDeashbord.findOne({
      createdAt: { $gte: moment.utc(todayDate).set({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }).toDate() },
      studentId: queAnsData.studentId,
      teacherId: userData._id
    })

    let studentRecords: Student = await this.students.findOne({ _id: queAnsData.studentId, isDeleted: false })
    if (!studentRecords) throw new HttpException(409, `Student not found`);
    else if (studentRecords.isActivated == true) throw new HttpException(409, `Student is Deactivated`);
    else if (studentRecords.schoolId.toString() != userData.schoolId.toString()) throw new HttpException(409, `Student is not belongs to your school`);
    if (todayReportExist) throw new HttpException(409, `report already submit for this student`);
    
    const createQueAnsStudentDashbordData: QueAnsStudentDashbord = await this.queAnsStudentDeashbord.create({
      ...queAnsData,
      teacherId: userData._id,
      schoolId: userData.schoolId,
      districtId: queAnsData.districtId
    })
    return createQueAnsStudentDashbordData;
  }

  // public async getQueAnsStudentDashbordList(query, user): Promise<QueAnsStudentDashbord[]> {
  //   let search = {
  //     $and: [{ isDeleted: false }] as any
  //   };
  //   if (query.startDate && query.endDate) {
  //     search.$and.push({ createdAt: { $gte: moment.utc(query.startDate).set({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }).toDate() } })
  //     search.$and.push({ createdAt: { $lte: moment.utc(query.endDate).set({ hours: 23, minutes: 59, seconds: 59, milliseconds: 999 }).toDate() } })
  //   } else {
  //     throw new HttpException(409, `Please enter start and end date`);
  //   }

  //   if (user.role.name == "Super-Admin") {
  //     if (query.schoolId) {
  //       search.$and.push({
  //         schoolId: mongoose.Types.ObjectId(query.schoolId)
  //       })
  //     }
  //     if (query.teacherId) {
  //       search.$and.push({
  //         teacherId: mongoose.Types.ObjectId(query.teacherId)
  //       })
  //     }
  //     if (query.studentId) {
  //       search.$and.push({
  //         studentId: mongoose.Types.ObjectId(query.studentId)
  //       })
  //     }
  //   } else if (user.role.name == "School-Admin" || user.role.name == "School-Sub-Admin") {
  //     if (user.schoolId) {
  //       search.$and.push({
  //         schoolId: mongoose.Types.ObjectId(user.schoolId)
  //       })
  //     }
  //     if (query.teacherId) {
  //       search.$and.push({
  //         teacherId: mongoose.Types.ObjectId(query.teacherId)
  //       })
  //     }
  //     if (query.studentId) {
  //       search.$and.push({
  //         studentId: mongoose.Types.ObjectId(query.studentId)
  //       })
  //     }
  //   } else if (user.role.name == "Teacher") {
  //     if (user.schoolId) {
  //       search.$and.push({
  //         schoolId: mongoose.Types.ObjectId(user.schoolId)
  //       })
  //     }
  //     if (user._id) {
  //       search.$and.push({
  //         teacherId: mongoose.Types.ObjectId(user._id)
  //       })
  //     }
  //     if (query.studentId) {
  //       search.$and.push({
  //         studentId: mongoose.Types.ObjectId(query.studentId)
  //       })
  //     }
  //   }

  //   if (query.questionId) {
  //     search.$and.push({
  //       "queAns.questionId": mongoose.Types.ObjectId(query.questionId)
  //     })
  //   }
  //   if (query.answer) {
  //     search.$and.push({
  //       "queAns.answer": query.answer
  //     })
  //   }

  //   let sortBy: {
  //     [name: string]: number
  //   } = {};
  //   if (query.sortby && typeof query.sortby === "string") {
  //     const validSortBy = ['schoolName', '-schoolName', 'teacherName', '-teacherName', 'studentName', '-studentName', 'date', '-date']
  //     const sortByParam = query.sortby;
  //     if (validSortBy.includes(sortByParam)) {
  //       const sortType = sortByParam[0] === '-' ? -1 : 1;
  //       const sortName = sortByParam[0] === '-' ? sortByParam.substr(1) : sortByParam;
  //       sortBy[sortName] = sortType;
  //     }
  //   }
  //   if (_.isEmpty(sortBy)) {
  //     sortBy = { schoolName: 1 }
  //   }
  //   const getQueData: QueAnsStudentDashbord[] = await this.queAnsStudentDeashbord.find(search)
  //     .populate({
  //       path: "queAns",
  //       populate: {
  //         path: "questionId"
  //       }
  //     })

  //   return getQueData
  // }



  public async getQueAnsStudentDashbordListChart1(query, user): Promise<QueAnsStudentDashbord[]> {
    let search = {
      $and: [{ isDeleted: false }] as any
    };
    if (query.startDate && query.endDate) {
      search.$and.push({ createdAt: { $gte: moment.utc(query.startDate).set({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }).toDate() } })
      search.$and.push({ createdAt: { $lte: moment.utc(query.endDate).set({ hours: 23, minutes: 59, seconds: 59, milliseconds: 999 }).toDate() } })
    } else {
      throw new HttpException(409, `Please enter start and end date`);
    }

    if (user.role.name == "Super-Admin") {
      if (query.districtId) {
        search.$and.push({
          districtId: new mongoose.Types.ObjectId(query.districtId)
        })
      }
      if (query.schoolId) {
        search.$and.push({
          schoolId: new mongoose.Types.ObjectId(query.schoolId)
        })
      }
      if (query.teacherId) {
        search.$and.push({
          teacherId: new mongoose.Types.ObjectId(query.teacherId)
        })
      }
      if (query.studentId) {
        search.$and.push({
          studentId: new mongoose.Types.ObjectId(query.studentId)
        })
      }
    } else if (user.role.name == "School-Admin" || user.role.name == "School-Sub-Admin") {
      if (query.districtId) {
        search.$and.push({
          districtId: new mongoose.Types.ObjectId(query.districtId)
        })
      }
      if (user.schoolId) {
        search.$and.push({
          schoolId: new mongoose.Types.ObjectId(user.schoolId)
        })
      }
      if (query.teacherId) {
        search.$and.push({
          teacherId: new mongoose.Types.ObjectId(query.teacherId)
        })
      }
      if (query.studentId) {
        search.$and.push({
          studentId: new mongoose.Types.ObjectId(query.studentId)
        })
      }
    } else if (user.role.name == "Teacher") {
      if (query.districtId) {
        search.$and.push({
          districtId: new mongoose.Types.ObjectId(query.districtId)
        })
      }
      if (user.schoolId) {
        search.$and.push({
          schoolId: new mongoose.Types.ObjectId(user.schoolId)
        })
      }
      if (user._id) {
        search.$and.push({
          teacherId: new mongoose.Types.ObjectId(user._id)
        })
      }
      if (query.studentId) {
        search.$and.push({
          studentId: new mongoose.Types.ObjectId(query.studentId)
        })
      }
    }

    if (query.questionId) {
      search.$and.push({
        "queAns.questionId": new mongoose.Types.ObjectId(query.questionId)
      })
    }
    search.$and.push({
      "queAns.questionId": new mongoose.Types.ObjectId('61604ae6e24b797dc90908e3')
    })
    if (query.answer) {
      search.$and.push({
        "queAns.answer": query.answer
      })
    }

    let sortBy: {
      [name: string]: number
    } = {};
    if (query.sortby && typeof query.sortby === "string") {
      const validSortBy = ['schoolName', '-schoolName', 'teacherName', '-teacherName', 'studentName', '-studentName', 'date', '-date']
      const sortByParam = query.sortby;
      if (validSortBy.includes(sortByParam)) {
        const sortType = sortByParam[0] === '-' ? -1 : 1;
        const sortName = sortByParam[0] === '-' ? sortByParam.substr(1) : sortByParam;
        sortBy[sortName] = sortType;
      }
    }
    if (_.isEmpty(sortBy)) {
      sortBy = { schoolName: 1 }
    }
    const getQueData: QueAnsStudentDashbord[] = await this.queAnsStudentDeashbord.aggregate([
      {
        $unwind:
        {
          path: '$queAns',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind:
        {
          path: '$queAns.answer',
          preserveNullAndEmptyArrays: true
        }
      },
      { $match: search },
      {
        $lookup: {
          from: 'studentdashbordques',
          localField: 'queAns.questionId',
          foreignField: '_id',
          as: "question"
        }
      },
      {
        $unwind: {
          path: '$question',
          preserveNullAndEmptyArrays: true
        }
      },
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
          from: 'students',
          localField: 'studentId',
          foreignField: '_id',
          as: "student"
        }
      },
      {
        $unwind:
        {
          path: '$school',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind:
        {
          path: '$teacher',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind:
        {
          path: '$student',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'grades',
          localField: 'student.gradeId',
          foreignField: '_id',
          as: "grade"
        }
      },
      {
        $unwind:
        {
          path: '$grade',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          schoolId: "$schoolId",
          teacherId: "$teacherId",
          studentId: "$studentId",
          schoolName: "$school.schoolName",
          teacherName: { $concat: ["$teacher.firstName", " ", "$teacher.lastName"] },
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          // school: "$school",
          // teacher: "$teacher",
          studentName: "$student.studentName",
          gradeId: "$student.gradeId",
          gradeName: "$grade.name",
          sasId: "$student.sasId",
          question: "$question.question",
          questionId: "$question._id",
          answerType: "$question.answerType",
          assessementId: "$student.assessementId",
          queAns: "$queAns",
          _id: 0
        }
      },
      {
        $group: {
          "_id": { questionId: '$questionId', question: '$question', studentId: "$studentId", studentName : "$studentName" },
          "total_hours_student": { "$sum": "$queAns.answer" },
          "count": { "$sum": 1 },
        },
      },
      {
        $group : {
          _id : null,
          student_details:{$push: "$$ROOT"},
          total_duration : {$sum : "$total_hours_student"}
        }
      },
      {
        $unwind:
        {
          path: '$student_details',
          preserveNullAndEmptyArrays: true
        }
      },
      // {
      //   $group: {
      //     "_id": { studentId: "$student_details._id.studentId", questionId:'$_id.questionId' }
      //   }
      // },
      { "$project": {
        //"studentId": "$student_details._id.studentId",
        "studentName": "$student_details._id.studentName",
        "studentAttendanceAvg": { "$multiply": [ { "$divide": ["$student_details.total_hours_student","$total_duration"] }, 100 ] },
        _id: 0
      } },
    ])
    // .facet(
    //   {
    //     studentId: [{ groupBy: '$studentId' }]
    //   }
    // );

    return getQueData;
  }

  public async getQueAnsStudentDashbordListAttendanceChart(query, user): Promise<QueAnsStudentDashbord[]> {
    let search = {
      $and: [{ isDeleted: false }] as any
    };
    if (query.startDate && query.endDate) {
      search.$and.push({ createdAt: { $gte: moment.utc(query.startDate).set({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }).toDate() } })
      search.$and.push({ createdAt: { $lte: moment.utc(query.endDate).set({ hours: 23, minutes: 59, seconds: 59, milliseconds: 999 }).toDate() } })
    } else {
      throw new HttpException(409, `Please enter start and end date`);
    }

    if (user.role.name == "Super-Admin") {
      if (query.districtId) {
        search.$and.push({
          districtId: new mongoose.Types.ObjectId(query.districtId)
        })
      }
      if (query.schoolId) {
        search.$and.push({
          schoolId: new mongoose.Types.ObjectId(query.schoolId)
        })
      }
      if (query.teacherId) {
        search.$and.push({
          teacherId: new mongoose.Types.ObjectId(query.teacherId)
        })
      }
      if (query.studentId) {
        search.$and.push({
          studentId: new mongoose.Types.ObjectId(query.studentId)
        })
      }
    } else if (user.role.name == "School-Admin" || user.role.name == "School-Sub-Admin") {
      if (query.districtId) {
        search.$and.push({
          districtId: new mongoose.Types.ObjectId(query.districtId)
        })
      }
      if (user.schoolId) {
        search.$and.push({
          schoolId: new mongoose.Types.ObjectId(user.schoolId)
        })
      }
      if (query.teacherId) {
        search.$and.push({
          teacherId: new mongoose.Types.ObjectId(query.teacherId)
        })
      }
      if (query.studentId) {
        search.$and.push({
          studentId: new mongoose.Types.ObjectId(query.studentId)
        })
      }
    } else if (user.role.name == "Teacher") {
      if (query.districtId) {
        search.$and.push({
          districtId: new mongoose.Types.ObjectId(query.districtId)
        })
      }
      if (user.schoolId) {
        search.$and.push({
          schoolId: new mongoose.Types.ObjectId(user.schoolId)
        })
      }
      if (user._id) {
        search.$and.push({
          teacherId: new mongoose.Types.ObjectId(user._id)
        })
      }
      if (query.studentId) {
        search.$and.push({
          studentId: new mongoose.Types.ObjectId(query.studentId)
        })
      }
    }

    if (query.questionId) {
      search.$and.push({
        "queAns.questionId": new mongoose.Types.ObjectId(query.questionId)
      })
    }
    search.$and.push({
      "queAns.questionId": new mongoose.Types.ObjectId('616049dbe24b797dc9090890')
    })
    if (query.answer) {
      search.$and.push({
        "queAns.answer": query.answer
      })
    }

    let sortBy: {
      [name: string]: number
    } = {};
    if (query.sortby && typeof query.sortby === "string") {
      const validSortBy = ['schoolName', '-schoolName', 'teacherName', '-teacherName', 'studentName', '-studentName', 'date', '-date']
      const sortByParam = query.sortby;
      if (validSortBy.includes(sortByParam)) {
        const sortType = sortByParam[0] === '-' ? -1 : 1;
        const sortName = sortByParam[0] === '-' ? sortByParam.substr(1) : sortByParam;
        sortBy[sortName] = sortType;
      }
    }
    if (_.isEmpty(sortBy)) {
      sortBy = { schoolName: 1 }
    }
    const getQueData: QueAnsStudentDashbord[] = await this.queAnsStudentDeashbord.aggregate([
      {
        $unwind:
        {
          path: '$queAns',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind:
        {
          path: '$queAns.answer',
          preserveNullAndEmptyArrays: true
        }
      },
      { $match: search },
      {
        $lookup: {
          from: 'studentdashbordques',
          localField: 'queAns.questionId',
          foreignField: '_id',
          as: "question"
        }
      },
      {
        $unwind: {
          path: '$question',
          preserveNullAndEmptyArrays: true
        }
      },
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
          from: 'students',
          localField: 'studentId',
          foreignField: '_id',
          as: "student"
        }
      },
      {
        $unwind:
        {
          path: '$school',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind:
        {
          path: '$teacher',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind:
        {
          path: '$student',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'grades',
          localField: 'student.gradeId',
          foreignField: '_id',
          as: "grade"
        }
      },
      {
        $unwind:
        {
          path: '$grade',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          schoolId: "$schoolId",
          teacherId: "$teacherId",
          studentId: "$studentId",
          schoolName: "$school.schoolName",
          teacherName: { $concat: ["$teacher.firstName", " ", "$teacher.lastName"] },
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          // school: "$school",
          // teacher: "$teacher",
          studentName: "$student.studentName",
          gradeId: "$student.gradeId",
          gradeName: "$grade.name",
          sasId: "$student.sasId",
          question: "$question.question",
          questionId: "$question._id",
          answerType: "$question.answerType",
          assessementId: "$student.assessementId",
          queAns: "$queAns",
          _id: 0
        }
      },
      {
        $group: {
          "_id": { questionId: '$questionId', question: '$question', studentId: "$studentId", studentName : "$studentName", answer : "$queAns.answer" },
          "count": { "$sum": 1 },
        },
      },
      {
        $group : {
          _id : null,
          student_details:{$push: "$$ROOT"},
          total_days : {$sum : "$count"}
        }
      },
      {
        $unwind:
        {
          path: '$student_details',
          preserveNullAndEmptyArrays: true
        }
      },
      { "$project": {
        "present": "$student_details._id.answer",
        "days": "$student_details.count",
        _id: 0
      } },
    ])
    return getQueData;
  }

  public async getQueAnsStudentDashbordListChart2(query, user): Promise<QueAnsStudentDashbord[]> {
    let search = {
      $and: [{ isDeleted: false }] as any
    };
    if (query.startDate && query.endDate) {
      search.$and.push({ createdAt: { $gte: moment.utc(query.startDate).set({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }).toDate() } })
      search.$and.push({ createdAt: { $lte: moment.utc(query.endDate).set({ hours: 23, minutes: 59, seconds: 59, milliseconds: 999 }).toDate() } })
    } else {
      throw new HttpException(409, `Please enter start and end date`);
    }

    if (user.role.name == "Super-Admin") {
      if (query.districtId) {
        search.$and.push({
          districtId: new mongoose.Types.ObjectId(query.districtId)
        })
      }
      if (query.schoolId) {
        search.$and.push({
          schoolId: new mongoose.Types.ObjectId(query.schoolId)
        })
      }
      if (query.teacherId) {
        search.$and.push({
          teacherId: new mongoose.Types.ObjectId(query.teacherId)
        })
      }
      if (query.studentId) {
        search.$and.push({
          studentId: new mongoose.Types.ObjectId(query.studentId)
        })
      }
    } else if (user.role.name == "School-Admin" || user.role.name == "School-Sub-Admin") {
      if (query.districtId) {
        search.$and.push({
          districtId: new mongoose.Types.ObjectId(query.districtId)
        })
      }
      if (user.schoolId) {
        search.$and.push({
          schoolId: new mongoose.Types.ObjectId(user.schoolId)
        })
      }
      if (query.teacherId) {
        search.$and.push({
          teacherId: new mongoose.Types.ObjectId(query.teacherId)
        })
      }
      if (query.studentId) {
        search.$and.push({
          studentId: new mongoose.Types.ObjectId(query.studentId)
        })
      }
    } else if (user.role.name == "Teacher") {
      if (query.districtId) {
        search.$and.push({
          districtId: new mongoose.Types.ObjectId(query.districtId)
        })
      }
      if (user.schoolId) {
        search.$and.push({
          schoolId: new mongoose.Types.ObjectId(user.schoolId)
        })
      }
      if (user._id) {
        search.$and.push({
          teacherId: new mongoose.Types.ObjectId(user._id)
        })
      }
      if (query.studentId) {
        search.$and.push({
          studentId: new mongoose.Types.ObjectId(query.studentId)
        })
      }
    }

    if (query.questionId) {
      search.$and.push({
        "queAns.questionId": new mongoose.Types.ObjectId(query.questionId)
      })
    }
    search.$and.push({
      "queAns.questionId": new mongoose.Types.ObjectId('61604ae6e24b797dc90908e3')
    })
    if (query.answer) {
      search.$and.push({
        "queAns.answer": query.answer
      })
    }

    let sortBy: {
      [name: string]: number
    } = {};
    if (query.sortby && typeof query.sortby === "string") {
      const validSortBy = ['schoolName', '-schoolName', 'teacherName', '-teacherName', 'studentName', '-studentName', 'date', '-date']
      const sortByParam = query.sortby;
      if (validSortBy.includes(sortByParam)) {
        const sortType = sortByParam[0] === '-' ? -1 : 1;
        const sortName = sortByParam[0] === '-' ? sortByParam.substr(1) : sortByParam;
        sortBy[sortName] = sortType;
      }
    }
    if (_.isEmpty(sortBy)) {
      sortBy = { schoolName: 1 }
    }
    const getQueData: QueAnsStudentDashbord[] = await this.queAnsStudentDeashbord.aggregate([
      {
        $unwind:
        {
          path: '$queAns',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind:
        {
          path: '$queAns.answer',
          preserveNullAndEmptyArrays: true
        }
      },
      { $match: search },
      {
        $lookup: {
          from: 'studentdashbordques',
          localField: 'queAns.questionId',
          foreignField: '_id',
          as: "question"
        }
      },
      {
        $unwind: {
          path: '$question',
          preserveNullAndEmptyArrays: true
        }
      },
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
          from: 'students',
          localField: 'studentId',
          foreignField: '_id',
          as: "student"
        }
      },
      {
        $unwind:
        {
          path: '$school',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind:
        {
          path: '$teacher',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind:
        {
          path: '$student',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'grades',
          localField: 'student.gradeId',
          foreignField: '_id',
          as: "grade"
        }
      },
      {
        $unwind:
        {
          path: '$grade',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          schoolId: "$schoolId",
          teacherId: "$teacherId",
          studentId: "$studentId",
          schoolName: "$school.schoolName",
          teacherName: { $concat: ["$teacher.firstName", " ", "$teacher.lastName"] },
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          // school: "$school",
          // teacher: "$teacher",
          studentName: "$student.studentName",
          gradeId: "$student.gradeId",
          gradeName: "$grade.name",
          sasId: "$student.sasId",
          question: "$question.question",
          questionId: "$question._id",
          answerType: "$question.answerType",
          assessementId: "$student.assessementId",
          queAns: "$queAns",
          _id: 0
        }
      },
      {
        $group: {
          "_id": { questionId: '$questionId', duration: '$queAns.answer', question : '$question' },
          "count": { "$sum": 1 }
        }
      },
      { "$project": {
        //"studentId": "$student_details._id.studentId",
        "durationPeriod": "$_id.duration",
        "totalMinutes": { "$multiply": ["$count", "$_id.duration"] },
        _id: 0
      } },
      {
        $group : {
          _id : null,
          duration_details:{$push: "$$ROOT"},
          total_duration : {$sum : "$totalMinutes"}
        }
      },
      { "$project": {
        //"studentId": "$student_details._id.studentId",
        "duration_details": "$duration_details",
        "total_duration": "$total_duration",
        _id: 0
      } },
      // {
      //   $group: {
      //     "_id": { studentId: "$_id.studentId", questionId:'$_id.questionId' },
      //     "total_duration": {
      //       '$sum': {
      //         '$cond': [
      //           { '$eq': ['$data.answerType', 'number'] },
      //           '$data.queAns.answer',
      //           0, 
      //         ]
      //       }
      //     }
      //   }
      // },
    ])
    // .facet(
    //   {
    //     studentId: [{ groupBy: '$studentId' }]
    //   }
    // );

    return getQueData;
  }

  public async getQueAnsStudentDashbordListChart3(query, user): Promise<QueAnsStudentDashbord[]> {
    let search = {
      $and: [{ isDeleted: false }] as any
    };
    if (query.startDate && query.endDate) {
      search.$and.push({ createdAt: { $gte: moment.utc(query.startDate).set({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }).toDate() } })
      search.$and.push({ createdAt: { $lte: moment.utc(query.endDate).set({ hours: 23, minutes: 59, seconds: 59, milliseconds: 999 }).toDate() } })
    } else {
      throw new HttpException(409, `Please enter start and end date`);
    }

    if (user.role.name == "Super-Admin") {
      if (query.districtId) {
        search.$and.push({
          districtId: new mongoose.Types.ObjectId(query.districtId)
        })
      }
      if (query.schoolId) {
        search.$and.push({
          schoolId: new mongoose.Types.ObjectId(query.schoolId)
        })
      }
      if (query.teacherId) {
        search.$and.push({
          teacherId: new mongoose.Types.ObjectId(query.teacherId)
        })
      }
      if (query.studentId) {
        search.$and.push({
          studentId: new mongoose.Types.ObjectId(query.studentId)
        })
      }
    } else if (user.role.name == "School-Admin" || user.role.name == "School-Sub-Admin") {
      if (query.districtId) {
        search.$and.push({
          districtId: new mongoose.Types.ObjectId(query.districtId)
        })
      }
      if (user.schoolId) {
        search.$and.push({
          schoolId: new mongoose.Types.ObjectId(user.schoolId)
        })
      }
      if (query.teacherId) {
        search.$and.push({
          teacherId: new mongoose.Types.ObjectId(query.teacherId)
        })
      }
      if (query.studentId) {
        search.$and.push({
          studentId: new mongoose.Types.ObjectId(query.studentId)
        })
      }
    } else if (user.role.name == "Teacher") {
      if (query.districtId) {
        search.$and.push({
          districtId: new mongoose.Types.ObjectId(query.districtId)
        })
      }
      if (user.schoolId) {
        search.$and.push({
          schoolId: new mongoose.Types.ObjectId(user.schoolId)
        })
      }
      if (user._id) {
        search.$and.push({
          teacherId: new mongoose.Types.ObjectId(user._id)
        })
      }
      if (query.studentId) {
        search.$and.push({
          studentId: new mongoose.Types.ObjectId(query.studentId)
        })
      }
    }

    if (query.questionId) {
      search.$and.push({
        "queAns.questionId": new mongoose.Types.ObjectId(query.questionId)
      })
    }
    search.$and.push({
      "queAns.questionId": new mongoose.Types.ObjectId('61604a2ee24b797dc90908a4')
    })
    if (query.answer) {
      search.$and.push({
        "queAns.answer": query.answer
      })
    }

    let sortBy: {
      [name: string]: number
    } = {};
    if (query.sortby && typeof query.sortby === "string") {
      const validSortBy = ['schoolName', '-schoolName', 'teacherName', '-teacherName', 'studentName', '-studentName', 'date', '-date']
      const sortByParam = query.sortby;
      if (validSortBy.includes(sortByParam)) {
        const sortType = sortByParam[0] === '-' ? -1 : 1;
        const sortName = sortByParam[0] === '-' ? sortByParam.substr(1) : sortByParam;
        sortBy[sortName] = sortType;
      }
    }
    if (_.isEmpty(sortBy)) {
      sortBy = { schoolName: 1 }
    }
    const getQueData: QueAnsStudentDashbord[] = await this.queAnsStudentDeashbord.aggregate([
      {
        $unwind:
        {
          path: '$queAns',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind:
        {
          path: '$queAns.answer',
          preserveNullAndEmptyArrays: true
        }
      },
      { $match: search },
      {
        $lookup: {
          from: 'studentdashbordques',
          localField: 'queAns.questionId',
          foreignField: '_id',
          as: "question"
        }
      },
      {
        $unwind: {
          path: '$question',
          preserveNullAndEmptyArrays: true
        }
      },
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
          from: 'students',
          localField: 'studentId',
          foreignField: '_id',
          as: "student"
        }
      },
      {
        $unwind:
        {
          path: '$school',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind:
        {
          path: '$teacher',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind:
        {
          path: '$student',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'grades',
          localField: 'student.gradeId',
          foreignField: '_id',
          as: "grade"
        }
      },
      {
        $unwind:
        {
          path: '$grade',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          schoolId: "$schoolId",
          teacherId: "$teacherId",
          studentId: "$studentId",
          schoolName: "$school.schoolName",
          teacherName: { $concat: ["$teacher.firstName", " ", "$teacher.lastName"] },
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          // school: "$school",
          // teacher: "$teacher",
          studentName: "$student.studentName",
          gradeId: "$student.gradeId",
          gradeName: "$grade.name",
          sasId: "$student.sasId",
          question: "$question.question",
          questionId: "$question._id",
          answerType: "$question.answerType",
          assessementId: "$student.assessementId",
          queAns: "$queAns",
          _id: 0
        }
      },
      {
        $group: {
          "_id": { questionId: '$questionId', methode: '$queAns.answer', question : '$question' },
          "count": { "$sum": 1 }
        }
      },
      { "$project": {
        //"studentId": "$student_details._id.studentId",
        "category": "$_id.methode",
        "categoryCount": "$count",
        _id: 0
      } },
      // {
      //   $group: {
      //     "_id": { studentId: "$_id.studentId", questionId:'$_id.questionId' },
      //     "total_duration": {
      //       '$sum': {
      //         '$cond': [
      //           { '$eq': ['$data.answerType', 'number'] },
      //           '$data.queAns.answer',
      //           0, 
      //         ]
      //       }
      //     }
      //   }
      // },
    ])
    // .facet(
    //   {
    //     studentId: [{ groupBy: '$studentId' }]
    //   }
    // );

    return getQueData;
  }

  public async getQueAnsStudentDashbordListChart4(query, user): Promise<QueAnsStudentDashbord[]> {
    let search = {
      $and: [{ isDeleted: false }] as any
    };
    if (query.startDate && query.endDate) {
      search.$and.push({ createdAt: { $gte: moment.utc(query.startDate).set({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }).toDate() } })
      search.$and.push({ createdAt: { $lte: moment.utc(query.endDate).set({ hours: 23, minutes: 59, seconds: 59, milliseconds: 999 }).toDate() } })
    } else {
      throw new HttpException(409, `Please enter start and end date`);
    }

    if (user.role.name == "Super-Admin") {
      if (query.districtId) {
        search.$and.push({
          districtId: new mongoose.Types.ObjectId(query.districtId)
        })
      }
      if (query.schoolId) {
        search.$and.push({
          schoolId: new mongoose.Types.ObjectId(query.schoolId)
        })
      }
      if (query.teacherId) {
        search.$and.push({
          teacherId: new mongoose.Types.ObjectId(query.teacherId)
        })
      }
      if (query.studentId) {
        search.$and.push({
          studentId: new mongoose.Types.ObjectId(query.studentId)
        })
      }
    } else if (user.role.name == "School-Admin" || user.role.name == "School-Sub-Admin") {
      if (query.districtId) {
        search.$and.push({
          districtId: new mongoose.Types.ObjectId(query.districtId)
        })
      }
      if (user.schoolId) {
        search.$and.push({
          schoolId: new mongoose.Types.ObjectId(user.schoolId)
        })
      }
      if (query.teacherId) {
        search.$and.push({
          teacherId: new mongoose.Types.ObjectId(query.teacherId)
        })
      }
      if (query.studentId) {
        search.$and.push({
          studentId: new mongoose.Types.ObjectId(query.studentId)
        })
      }
    } else if (user.role.name == "Teacher") {
      if (query.districtId) {
        search.$and.push({
          districtId: new mongoose.Types.ObjectId(query.districtId)
        })
      }
      if (user.schoolId) {
        search.$and.push({
          schoolId: new mongoose.Types.ObjectId(user.schoolId)
        })
      }
      if (user._id) {
        search.$and.push({
          teacherId: new mongoose.Types.ObjectId(user._id)
        })
      }
      if (query.studentId) {
        search.$and.push({
          studentId: new mongoose.Types.ObjectId(query.studentId)
        })
      }
    }

    if (query.questionId) {
      search.$and.push({
        "queAns.questionId": new mongoose.Types.ObjectId(query.questionId)
      })
    }
    search.$and.push({
      "queAns.questionId": new mongoose.Types.ObjectId('61604ac9e24b797dc90908d8')
    })
    if (query.answer) {
      search.$and.push({
        "queAns.answer": query.answer
      })
    }

    let sortBy: {
      [name: string]: number
    } = {};
    if (query.sortby && typeof query.sortby === "string") {
      const validSortBy = ['schoolName', '-schoolName', 'teacherName', '-teacherName', 'studentName', '-studentName', 'date', '-date']
      const sortByParam = query.sortby;
      if (validSortBy.includes(sortByParam)) {
        const sortType = sortByParam[0] === '-' ? -1 : 1;
        const sortName = sortByParam[0] === '-' ? sortByParam.substr(1) : sortByParam;
        sortBy[sortName] = sortType;
      }
    }
    if (_.isEmpty(sortBy)) {
      sortBy = { schoolName: 1 }
    }
    const getQueData: QueAnsStudentDashbord[] = await this.queAnsStudentDeashbord.aggregate([
      {
        $unwind:
        {
          path: '$queAns',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind:
        {
          path: '$queAns.answer',
          preserveNullAndEmptyArrays: true
        }
      },
      { $match: search },
      {
        $lookup: {
          from: 'studentdashbordques',
          localField: 'queAns.questionId',
          foreignField: '_id',
          as: "question"
        }
      },
      {
        $unwind: {
          path: '$question',
          preserveNullAndEmptyArrays: true
        }
      },
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
          from: 'students',
          localField: 'studentId',
          foreignField: '_id',
          as: "student"
        }
      },
      {
        $unwind:
        {
          path: '$school',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind:
        {
          path: '$teacher',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind:
        {
          path: '$student',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'grades',
          localField: 'student.gradeId',
          foreignField: '_id',
          as: "grade"
        }
      },
      {
        $unwind:
        {
          path: '$grade',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          schoolId: "$schoolId",
          teacherId: "$teacherId",
          studentId: "$studentId",
          schoolName: "$school.schoolName",
          teacherName: { $concat: ["$teacher.firstName", " ", "$teacher.lastName"] },
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          // school: "$school",
          // teacher: "$teacher",
          studentName: "$student.studentName",
          gradeId: "$student.gradeId",
          gradeName: "$grade.name",
          sasId: "$student.sasId",
          question: "$question.question",
          questionId: "$question._id",
          answerType: "$question.answerType",
          assessementId: "$student.assessementId",
          queAns: "$queAns",
          _id: 0
        }
      },
      {
        $group: {
          "_id": { questionId: '$questionId', methode: '$queAns.answer', question : '$question' },
          "count": { "$sum": 1 }
        }
      },
      { "$project": {
        //"studentId": "$student_details._id.studentId",
        "instruction": "$_id.methode",
        "instructionCount": "$count",
        _id: 0
      } },
      // {
      //   $group: {
      //     "_id": { studentId: "$_id.studentId", questionId:'$_id.questionId' },
      //     "total_duration": {
      //       '$sum': {
      //         '$cond': [
      //           { '$eq': ['$data.answerType', 'number'] },
      //           '$data.queAns.answer',
      //           0, 
      //         ]
      //       }
      //     }
      //   }
      // },
    ])
    // .facet(
    //   {
    //     studentId: [{ groupBy: '$studentId' }]
    //   }
    // );

    return getQueData;
  }

  public async getQueAnsStudentDashbordListChart5(query, user): Promise<QueAnsStudentDashbord[]> {
    let search = {
      $and: [{ isDeleted: false }] as any
    };
    if (query.startDate && query.endDate) {
      search.$and.push({ createdAt: { $gte: moment.utc(query.startDate).set({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }).toDate() } })
      search.$and.push({ createdAt: { $lte: moment.utc(query.endDate).set({ hours: 23, minutes: 59, seconds: 59, milliseconds: 999 }).toDate() } })
    } else {
      throw new HttpException(409, `Please enter start and end date`);
    }

    if (user.role.name == "Super-Admin") {
      if (query.districtId) {
        search.$and.push({
          districtId: new mongoose.Types.ObjectId(query.districtId)
        })
      }
      if (query.schoolId) {
        search.$and.push({
          schoolId: new mongoose.Types.ObjectId(query.schoolId)
        })
      }
      if (query.teacherId) {
        search.$and.push({
          teacherId: new mongoose.Types.ObjectId(query.teacherId)
        })
      }
      if (query.studentId) {
        search.$and.push({
          studentId: new mongoose.Types.ObjectId(query.studentId)
        })
      }
    } else if (user.role.name == "School-Admin" || user.role.name == "School-Sub-Admin") {
      if (query.districtId) {
        search.$and.push({
          districtId: new mongoose.Types.ObjectId(query.districtId)
        })
      }
      if (user.schoolId) {
        search.$and.push({
          schoolId: new mongoose.Types.ObjectId(user.schoolId)
        })
      }
      if (query.teacherId) {
        search.$and.push({
          teacherId: new mongoose.Types.ObjectId(query.teacherId)
        })
      }
      if (query.studentId) {
        search.$and.push({
          studentId: new mongoose.Types.ObjectId(query.studentId)
        })
      }
    } else if (user.role.name == "Teacher") {
      if (query.districtId) {
        search.$and.push({
          districtId: new mongoose.Types.ObjectId(query.districtId)
        })
      }
      if (user.schoolId) {
        search.$and.push({
          schoolId: new mongoose.Types.ObjectId(user.schoolId)
        })
      }
      if (user._id) {
        search.$and.push({
          teacherId: new mongoose.Types.ObjectId(user._id)
        })
      }
      if (query.studentId) {
        search.$and.push({
          studentId: new mongoose.Types.ObjectId(query.studentId)
        })
      }
    }

    if (query.questionId) {
      search.$and.push({
        "queAns.questionId": new mongoose.Types.ObjectId(query.questionId)
      })
    }
    search.$and.push({
      "queAns.questionId": new mongoose.Types.ObjectId('61604afbe24b797dc90908ee')
    })
    if (query.answer) {
      search.$and.push({
        "queAns.answer": query.answer
      })
    }

    let sortBy: {
      [name: string]: number
    } = {};
    if (query.sortby && typeof query.sortby === "string") {
      const validSortBy = ['schoolName', '-schoolName', 'teacherName', '-teacherName', 'studentName', '-studentName', 'date', '-date']
      const sortByParam = query.sortby;
      if (validSortBy.includes(sortByParam)) {
        const sortType = sortByParam[0] === '-' ? -1 : 1;
        const sortName = sortByParam[0] === '-' ? sortByParam.substr(1) : sortByParam;
        sortBy[sortName] = sortType;
      }
    }
    if (_.isEmpty(sortBy)) {
      sortBy = { schoolName: 1 }
    }
    const getQueData: QueAnsStudentDashbord[] = await this.queAnsStudentDeashbord.aggregate([
      {
        $unwind:
        {
          path: '$queAns',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind:
        {
          path: '$queAns.answer',
          preserveNullAndEmptyArrays: true
        }
      },
      { $match: search },
      {
        $lookup: {
          from: 'studentdashbordques',
          localField: 'queAns.questionId',
          foreignField: '_id',
          as: "question"
        }
      },
      {
        $unwind: {
          path: '$question',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'districts',
          localField: 'districtId',
          foreignField: '_id',
          as: "district"
        }
      },
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
          from: 'students',
          localField: 'studentId',
          foreignField: '_id',
          as: "student"
        }
      },
      {
        $unwind:
        {
          path: '$district',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind:
        {
          path: '$school',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind:
        {
          path: '$teacher',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind:
        {
          path: '$student',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'grades',
          localField: 'student.gradeId',
          foreignField: '_id',
          as: "grade"
        }
      },
      {
        $unwind:
        {
          path: '$grade',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          districtName: "$district.name",
          schoolName: "$school.schoolName",
          teacherName: { $concat: ["$teacher.firstName", " ", "$teacher.lastName"] },
          studentName: "$student.studentName",
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          question: "$question.question",
          assessementId: "$student.assessementId",
          lession: "$queAns.answer",
          _id: 0
        }
      },
    ])
    // .facet(
    //   {
    //     studentId: [{ groupBy: '$studentId' }]
    //   }
    // );
    return getQueData;
  }

  public async getQueAnsStudentDashbordListChart6(query, user): Promise<QueAnsStudentDashbord[]> {
    let search = {
      $and: [{ isDeleted: false }] as any
    };
    if (query.startDate && query.endDate) {
      search.$and.push({ createdAt: { $gte: moment.utc(query.startDate).set({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }).toDate() } })
      search.$and.push({ createdAt: { $lte: moment.utc(query.endDate).set({ hours: 23, minutes: 59, seconds: 59, milliseconds: 999 }).toDate() } })
    } else {
      throw new HttpException(409, `Please enter start and end date`);
    }

    if (user.role.name == "Super-Admin") {
      if (query.districtId) {
        search.$and.push({
          districtId: new mongoose.Types.ObjectId(query.districtId)
        })
      }
      if (query.schoolId) {
        search.$and.push({
          schoolId: new mongoose.Types.ObjectId(query.schoolId)
        })
      }
      if (query.teacherId) {
        search.$and.push({
          teacherId: new mongoose.Types.ObjectId(query.teacherId)
        })
      }
      if (query.studentId) {
        search.$and.push({
          studentId: new mongoose.Types.ObjectId(query.studentId)
        })
      }
    } else if (user.role.name == "School-Admin" || user.role.name == "School-Sub-Admin") {
      if (query.districtId) {
        search.$and.push({
          districtId: new mongoose.Types.ObjectId(query.districtId)
        })
      }
      if (user.schoolId) {
        search.$and.push({
          schoolId: new mongoose.Types.ObjectId(user.schoolId)
        })
      }
      if (query.teacherId) {
        search.$and.push({
          teacherId: new mongoose.Types.ObjectId(query.teacherId)
        })
      }
      if (query.studentId) {
        search.$and.push({
          studentId: new mongoose.Types.ObjectId(query.studentId)
        })
      }
    } else if (user.role.name == "Teacher") {
      if (query.districtId) {
        search.$and.push({
          districtId: new mongoose.Types.ObjectId(query.districtId)
        })
      }
      if (user.schoolId) {
        search.$and.push({
          schoolId: new mongoose.Types.ObjectId(user.schoolId)
        })
      }
      if (user._id) {
        search.$and.push({
          teacherId: new mongoose.Types.ObjectId(user._id)
        })
      }
      if (query.studentId) {
        search.$and.push({
          studentId: new mongoose.Types.ObjectId(query.studentId)
        })
      }
    }

    if (query.questionId) {
      search.$and.push({
        "queAns.questionId": new mongoose.Types.ObjectId(query.questionId)
      })
    }
    search.$and.push({
      "queAns.questionId": new mongoose.Types.ObjectId('61604b11e24b797dc90908f9')
    })
    if (query.answer) {
      search.$and.push({
        "queAns.answer": query.answer
      })
    }

    let sortBy: {
      [name: string]: number
    } = {};
    if (query.sortby && typeof query.sortby === "string") {
      const validSortBy = ['schoolName', '-schoolName', 'teacherName', '-teacherName', 'studentName', '-studentName', 'date', '-date']
      const sortByParam = query.sortby;
      if (validSortBy.includes(sortByParam)) {
        const sortType = sortByParam[0] === '-' ? -1 : 1;
        const sortName = sortByParam[0] === '-' ? sortByParam.substr(1) : sortByParam;
        sortBy[sortName] = sortType;
      }
    }
    if (_.isEmpty(sortBy)) {
      sortBy = { schoolName: 1 }
    }
    const getQueData: QueAnsStudentDashbord[] = await this.queAnsStudentDeashbord.aggregate([
      {
        $unwind:
        {
          path: '$queAns',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind:
        {
          path: '$queAns.answer',
          preserveNullAndEmptyArrays: true
        }
      },
      { $match: search },
      {
        $lookup: {
          from: 'studentdashbordques',
          localField: 'queAns.questionId',
          foreignField: '_id',
          as: "question"
        }
      },
      {
        $unwind: {
          path: '$question',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'districts',
          localField: 'districtId',
          foreignField: '_id',
          as: "district"
        }
      },
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
          from: 'students',
          localField: 'studentId',
          foreignField: '_id',
          as: "student"
        }
      },
      {
        $unwind:
        {
          path: '$district',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind:
        {
          path: '$school',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind:
        {
          path: '$teacher',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind:
        {
          path: '$student',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'grades',
          localField: 'student.gradeId',
          foreignField: '_id',
          as: "grade"
        }
      },
      {
        $unwind:
        {
          path: '$grade',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          districtName: "$district.name",
          schoolName: "$school.schoolName",
          teacherName: { $concat: ["$teacher.firstName", " ", "$teacher.lastName"] },
          studentName: "$student.studentName",
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          question: "$question.question",
          assessementId: "$student.assessementId",
          notes: "$queAns.answer",
          _id: 0
        }
      },
    ])
    // .facet(
    //   {
    //     studentId: [{ groupBy: '$studentId' }]
    //   }
    // );
    return getQueData;
  }
}

export default QueAnsStudentDeashbordService;
