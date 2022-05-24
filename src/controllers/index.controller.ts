import { NextFunction, Request, Response } from 'express';
import AuthRoute from '../routes/auth.route';
import IndexRoute from '../routes/index.route';
import UsersRoute from '../routes/users.route';
import SchoolsRoute from '../routes/schools.route';
import CSVRoute from '../routes/csv.routes';
import CommonsRoute from '../routes/common.route';
import RoleRoute from '../routes/roles.route';
import EndorsementsRoute from '../routes/endorsements.route';
import TeachersRoute from '../routes/teachers.route'
import StudentDashbordQueRoute from '../routes/studentdashbordque.route';
import StudentsRoute from '../routes/students.route';
import QueAnsStudentDashbordRoute from '../routes/queansstudentdashbord.route';
import ReportsRoute from '../routes/reports.route';
import GradesRoute from '../routes/grades.route';
class IndexController {
  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };

  /**
   * initializeAllRoutes
   */
  public initializeAllRoutes() {
    return [new IndexRoute(), new UsersRoute(), new AuthRoute(), new SchoolsRoute(), new CSVRoute(), new CommonsRoute(), new RoleRoute(), new EndorsementsRoute(), new TeachersRoute(), new StudentDashbordQueRoute(), new QueAnsStudentDashbordRoute(), new StudentsRoute(), new ReportsRoute(), new GradesRoute()]
  }
}

export default IndexController;
