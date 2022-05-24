import HttpException from '../exceptions/HttpException';
import { Grade } from '../interfaces/grades.interface';
import gradeModel from '../models/grades.model';
import moment from 'moment';

class GreadeService {
  public grades = gradeModel;
  
  public async creatGradee(body, user): Promise<Grade> {
    const findGrade: Grade = await this.grades.findOne({ name: body.name, isDeleted: false });
    if (findGrade) throw new HttpException(409, `Grade ${body.name} is already exist`);
    const createdGradeData: Grade = await this.grades.create({
        ...body,
        createdBy: user._id
    })
    
    return createdGradeData;
  }
  
  public async getGrade(query, user): Promise<Grade[]> {
    let search = {
      $and: [
        { isDeleted: false },
      ] as any
    };

    if(query.status){
      search.$and.push({
        isActivated: JSON.parse(query.status)
      })
    }

    if (query.search) {
      const searchRegex = new RegExp(query.search, 'i') 
      search.$and.push({
        $or: [{name: { $regex: searchRegex } }]
      })
    }
    const findGrade: Grade[] = await this.grades.find(search);
    return findGrade;
  }

  public async deleteGrade(gradeId, user): Promise<Grade> {
    const findGrade: Grade = await this.grades.findOne({ _id: gradeId, isDeleted: false })
    if (!findGrade) throw new HttpException(409, `Grade not found`);
    const deleteGrade: Grade = await this.grades.findByIdAndUpdate(gradeId, {
      isDeleted: true,
      deletedBy: user._id,
      deletedAt: moment().utc().toDate()
    },{
      new: true
    })

    return deleteGrade;
  }

  public async changeGradeStatus(gradeId, user): Promise<{ gradeData: Grade; statusMode: String; }> {
    const findGrade: Grade = await this.grades.findOne({ _id: gradeId, isDeleted: false })
    if (!findGrade) throw new HttpException(409, `Grade not found`);
    
    let status: Boolean;
    let statusMode: String;
    if (findGrade.isActivated === false) {
      status = true
      statusMode = 'Deactivated'
    } else {
      status = false
      statusMode = 'Activated'
    }
    const gradeData: Grade = await this.grades.findByIdAndUpdate(gradeId, {
      isActivated: status,
      updatedBy: user._id
    }, { new: true })

    return { gradeData, statusMode };
  }
}

export default GreadeService;
