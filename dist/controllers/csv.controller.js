"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const csv_service_1 = tslib_1.__importDefault(require("../services/csv.service"));
class CSVController {
    constructor() {
        this.csvService = new csv_service_1.default();
        this.insertCSV = async (req, res, next) => {
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
}
exports.default = CSVController;
//# sourceMappingURL=csv.controller.js.map