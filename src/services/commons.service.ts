import HttpException from '../exceptions/HttpException';
import { State } from '../interfaces/states.interface';
import { District } from '../interfaces/districts.interface';
import { School } from '../interfaces/schools.interface';
import { Teacher } from '../interfaces/teachers.interface';
import { Student } from '../interfaces/students.interface';
import stateModel from '../models/states.model';
import districtModel from '../models/districts.model';
import schoolModel from '../models/schools.model';
import teacherModel from '../models/teachers.model';
import studentModel from '../models/students.model';
import moment from 'moment';
import mongoose from 'mongoose';
import { query } from 'express';

class CommonService {
  public states = stateModel;
  public districts = districtModel;
  public schools = schoolModel;
  public teachers = teacherModel;
  public students = studentModel;

  // public async insertCountryData(countryData, userData): Promise<Country> {
  //   const findCountry: Country = await this.countries.findOne({ name: countryData.countryName.toLowerCase(), isDeleted: false });
  //   if (findCountry) throw new HttpException(409, `Country ${countryData.countryName} is already exist`);
  //   const insertedCountryData: Country = await this.countries.create({
  //       name: countryData.countryName.toLowerCase(),
  //       countryCode: countryData.countryCode,
  //       createdBy: userData._id
  //   })

  //   return insertedCountryData;
  // }

  public async insertStateData(body, user): Promise<State> {
    const findState: State = await this.states.findOne({ name: body.name.toLowerCase(), isDeleted: false });
    if (findState) throw new HttpException(409, `State ${body.stateName} is already exist`);
    const insertedStateData: State = await this.states.create({
      ...body,
      createdBy: user._id
    })

    return insertedStateData;
  }

  public async insertDistrictData(body, user): Promise<District> {
    const findDistrict: District = await this.districts.findOne({ name: body.name, sauCode: body.sauCode, isDeleted: false });
    if (findDistrict) throw new HttpException(409, `District "${findDistrict.name}" is already exist`);
    const findDistrictSauCode: District = await this.districts.findOne({ sauCode: body.sauCode, isDeleted: false });
    if (findDistrictSauCode) throw new HttpException(409, `District SAU Code "${findDistrictSauCode.sauCode}" must be unique`);
    const insertedCityData: District = await this.districts.create({
      ...body,
      createdBy: user._id
    })

    return insertedCityData;
  }

  // public async deleteCountry(countryData, userData): Promise<Country> {
  //   const findCountry: Country = await this.countries.findOne({ _id: countryData.countryId, isDeleted: true });
  //   if (findCountry) throw new HttpException(409, `Country ${findCountry.name} is already deleted`);
  //   const deleteCountryData: Country = await this.countries.findByIdAndUpdate(countryData.countryId,{
  //       isDeleted: true,
  //       deletedBy: userData._id,
  //       deletedAt: moment().utc().toDate()
  //   }, {new: true})

  //   return deleteCountryData;
  // }

  public async deleteState(stateData, userData): Promise<State> {
    const findState: State = await this.states.findOne({ _id: stateData.stateId, isDeleted: true });
    if (findState) throw new HttpException(409, `State "${findState.name}" is already deleted`);
    const deleteStateData: State = await this.states.findByIdAndUpdate(stateData.stateId, {
      isDeleted: true,
      deletedBy: userData._id,
      deletedAt: moment().utc().toDate()
    }, { new: true })

    return deleteStateData;
  }

  public async changeStateStatus(stateData, userData): Promise<{ changeStateStatusData: State; statusMode: String; }> {
    const findState: State = await this.states.findOne({ _id: stateData.stateId });
    if (!findState) throw new HttpException(409, `State not found`);

    let status: Boolean;
    let statusMode: String;
    if (findState.isActivated === false) {
      status = true
      statusMode = 'Deactivated'
    } else {
      status = false
      statusMode = 'Activated'
    }
    const changeStateStatusData: State = await this.states.findByIdAndUpdate(stateData.stateId, {
      isActivated: status,
      updatedBy: userData._id
    }, { new: true })

    return { changeStateStatusData, statusMode };
  }

  public async changeDistrictStatus(districtData, userData): Promise<{ changeDistrictStatusData: District; statusMode: String; }> {
    const findDistrict: District = await this.districts.findOne({ _id: districtData.districtId });
    if (!findDistrict) throw new HttpException(409, `District not found`);
    let status: Boolean;
    let statusMode: String;
    if (findDistrict.isActivated === false) {
      status = true
      statusMode = 'Deactivated'
    } else {
      status = false
      statusMode = 'Activated'
    }
    const changeDistrictStatusData: District = await this.districts.findByIdAndUpdate(districtData.districtId, {
      isActivated: status,
      updatedBy: userData._id
    }, { new: true })

    return { changeDistrictStatusData, statusMode };
  }

  public async deleteDistrict(params, user): Promise<District> {
    const findDistrict: District = await this.districts.findOne({ _id: params.districtId, isDeleted: true });
    if (findDistrict) throw new HttpException(409, `District ${findDistrict.name} is already deleted`);
    const deleteDistrictData: District = await this.districts.findByIdAndUpdate(params.districtId, {
      isDeleted: true,
      deletedBy: user._id,
      deletedAt: moment().utc().toDate()
    }, { new: true })

    return deleteDistrictData;
  }

  public async getState(stateData, userData): Promise<State[]> {
    const pageNumber = stateData?.pageNumber || 1;
    const pageSize = stateData?.pageSize || 100;
    const limit = Number(pageSize);
    const skip = (Number(pageNumber) - 1) * limit;
    let search = {
      $and: [
        { isDeleted: false }
      ] as any
    };
    if (stateData.status) {
      search.$and.push({ isActivated: JSON.parse(stateData.status) })
    }

    if (stateData.stateId) {
      search.$and.push({ _id: new mongoose.Types.ObjectId(stateData.stateId) })
    }

    if (stateData.search) {
      const searchRegex = new RegExp(stateData.search, 'i')
      search.$and.push({
        name: { $regex: searchRegex }
      })
    }

    if (stateData.pageNumber && stateData.pageSize) {
      const getStateData: State[] = await this.states.aggregate([
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
      return getStateData;
    } else {
      const getStateData: State[] = await this.states.aggregate([
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
      return getStateData;
    }
  }

  public async getDistrict(params, userData): Promise<District[]> {
    const pageNumber = params?.pageNumber || 1;
    const pageSize = params?.pageSize || 100;
    const limit = Number(pageSize);
    const skip = (Number(pageNumber) - 1) * limit;
    let search = {
      $and: [
        { isDeleted: false }
      ] as any
    };

    if (params.status) {
      search.$and.push({ isActivated: JSON.parse(params.status) })
    }

    if (params.stateId) {
      search.$and.push({ stateId: new mongoose.Types.ObjectId(params.stateId) })
    }

    if (params.districtId) {
      search.$and.push({ _id: new mongoose.Types.ObjectId(params.districtId) })
    }

    if (params.search) {
      const searchRegex = new RegExp(params.search, 'i')
      search.$and.push({
        name: { $regex: searchRegex }
      })
    }

    if (params.pageNumber && params.pageSize) {
      const getDistrictData: District[] = await this.districts.aggregate([
        { $match: search },
        {
          $lookup: {
            from: 'states',
            localField: 'stateId',
            foreignField: '_id',
            as: "state"
          }
        },
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
      return getDistrictData;
    }
    else {
      const getDistrictData: District[] = await this.districts.aggregate([
        { $match: search },
        {
          $lookup: {
            from: 'states',
            localField: 'stateId',
            foreignField: '_id',
            as: "state"
          }
        },
      ]).facet(
        {
          "data": [
            // { $sort: sortBy },
          ],
          "count": [
            { $count: "count" }
          ]
        }
      );
      return getDistrictData;
    }
  }

  public async getSchoolDashbord(queryData): Promise<School[]> {
    let search = {
      $and: [
        { isDeleted: false }
      ] as any
    };
    if (queryData.startDate && queryData.endDate) {
      search.$and.push({ createdAt: { $gte: moment.utc(queryData.startDate).set({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }).toDate() } })
      search.$and.push({ createdAt: { $lte: moment.utc(queryData.endDate).set({ hours: 23, minutes: 59, seconds: 59, milliseconds: 999 }).toDate() } })
    }
    if (queryData.status) {
      search.$and.push({ isActivated: JSON.parse(queryData.status) })
    }
    const schoolDashbord: School[] = await this.schools.aggregate([
      {
        $match: search
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          date: '$_id',
          count: 1,
          _id: 0
        }
      },
      {
        $sort: {
          date: 1
        }
      }
    ])
    return schoolDashbord
  }

  public async getStateDashbord(queryData): Promise<State[]> {
    let search = {
      $and: [
        { isDeleted: false },     
      ] as any
    };
    if (queryData.startDate && queryData.endDate) {
      search.$and.push({ createdAt: { $gte: moment.utc(queryData.startDate).set({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }).toDate() } })
      search.$and.push({ createdAt: { $lte: moment.utc(queryData.endDate).set({ hours: 23, minutes: 59, seconds: 59, milliseconds: 999 }).toDate() } })
    }
    if (queryData.status) {
      search.$and.push({ isActivated: JSON.parse(queryData.status) })
    }
    const stateDashbord: State[] = await this.states.aggregate([
      {
        $match: search
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          date: '$_id',
          count: 1,
          _id: 0
        }
      },
      {
        $sort: {
          date: 1
        }
      }
    ])
    return stateDashbord
  }

  public async getDistrictDashbord(queryData): Promise<District[]> {
    let search = {
      $and: [
        { isDeleted: false },     
      ] as any
    };
    if (queryData.startDate && queryData.endDate) {
      search.$and.push({ createdAt: { $gte: moment.utc(queryData.startDate).set({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }).toDate() } })
      search.$and.push({ createdAt: { $lte: moment.utc(queryData.endDate).set({ hours: 23, minutes: 59, seconds: 59, milliseconds: 999 }).toDate() } })
    }
    if (queryData.status) {
      search.$and.push({ isActivated: JSON.parse(queryData.status) })
    }
    const districtDashbord: District[] = await this.districts.aggregate([
      {
        $match: search
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          date: '$_id',
          count: 1,
          _id: 0
        }
      },
      {
        $sort: {
          date: 1
        }
      }
    ])
    return districtDashbord
  }

  public async getStudentDashbord(queryData): Promise<Student[]> {
    let search = {
      $and: [
        { isDeleted: false },     
      ] as any
    };
    if (queryData.startDate && queryData.endDate) {
      search.$and.push({ createdAt: { $gte: moment.utc(queryData.startDate).set({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }).toDate() } })
      search.$and.push({ createdAt: { $lte: moment.utc(queryData.endDate).set({ hours: 23, minutes: 59, seconds: 59, milliseconds: 999 }).toDate() } })
    }
    if (queryData.status) {
      search.$and.push({ isActivated: JSON.parse(queryData.status) })
    }
    if (queryData.schoolId) {
      search.$and.push({ schoolId: new mongoose.Types.ObjectId(queryData.schoolId) })
    }
    const studentDashbord: Student[] = await this.students.aggregate([
      {
        $match: search
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          date: '$_id',
          count: 1,
          _id: 0
        }
      },
      {
        $sort: {
          date: 1
        }
      }
    ])
    return studentDashbord
  }

  public async getTeacherDashbord(queryData): Promise<Teacher[]> {
    let search = {
      $and: [
        { isDeleted: false }
      ] as any
    };
    if (queryData.startDate && queryData.endDate) {
      search.$and.push({ createdAt: { $gte: moment.utc(queryData.startDate).set({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }).toDate() } })
      search.$and.push({ createdAt: { $lte: moment.utc(queryData.endDate).set({ hours: 23, minutes: 59, seconds: 59, milliseconds: 999 }).toDate() } })
    }
    if (queryData.status) {
      search.$and.push({ isActivated: JSON.parse(queryData.status) })
    }
    if (queryData.schoolId) {
      search.$and.push({ schoolId: new mongoose.Types.ObjectId(queryData.schoolId) })
    }
    const teacherDashbord: Teacher[] = await this.teachers.aggregate([
      {
        $match: search
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          date: '$_id',
          // records: 1,
          count: 1,
          _id: 0
        }
      },
      {
        $sort: {
          date: 1
        }
      }
    ])
    return teacherDashbord
  }
}

export default CommonService;
