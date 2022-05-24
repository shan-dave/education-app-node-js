import { NextFunction, Request, Response } from 'express';
// import { CreateUserDto } from '../dtos/users.dto';
// import { School } from '../interfaces/schools.interface';
// import schoolService from '../services/schools.service';
import {IGetUserAuthInfo} from '../interfaces/request.interface'
import CSVService from '../services/csv.service'
import fs from 'fs'
import { unlink } from 'fs/promises';
import csv from 'csv-parser'
import HttpException from '../exceptions/HttpException';
class CSVController {
  public csvService = new CSVService();

  public insertCSV = async (req: IGetUserAuthInfo, res: Response, next: NextFunction) => {
    // try {

    //     const path = req.file?.path
    //     if(!path) res.status(500).json({  message: "Please select CSV file" });
    //     let error = ''
    //     const CSVData = []
    //     fs.createReadStream(path)
    //     .pipe(csv())
    //     .on('data', async (row) => {
    //         const neededKeys = ['country_code','country', 'state', 'city'];
    //         if(!neededKeys.every(key => Object.keys(row).includes(key))) {
    //             error = "true"
    //             return true
    //         }else{
    //             CSVData.push(row)
                 
    //         }
    //     })
    //     .on('end', async () => {
    //         if(error == 'true'){
    //             res.status(500).json({  message: "Please select proper CSV file" });
    //         }else{
    //             for (const data of CSVData) {
    //                 await this.csvService.insertCsvData(data, req.user)
    //             }
    //             await unlink(path);
    //             res.status(200).json({  message: "CSV file inserted successfully" });
    //         }
    //     })
    // } catch (error) {
    //   next(error);
    // }
  };
}

export default CSVController;