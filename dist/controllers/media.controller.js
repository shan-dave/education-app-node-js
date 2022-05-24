"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const multer_1 = tslib_1.__importDefault(require("multer"));
const fs_1 = tslib_1.__importDefault(require("fs"));
class MediaController {
    constructor() {
        this.multerStorage = multer_1.default.diskStorage({
            destination: (req, file, cb) => {
                let dir = './media';
                fs_1.default.mkdirSync(dir, { recursive: true });
                return cb(null, dir);
            },
            filename: (req, file, cb) => {
                const ext = file.mimetype.split("/")[1];
                const fileName = `${file.fieldname}-${Date.now()}.${ext}`;
                req.body.imageUrl = fileName;
                cb(null, fileName);
            },
        });
        this.upload = multer_1.default({
            storage: this.multerStorage,
        }).single('csv_file');
    }
}
exports.default = MediaController;
//# sourceMappingURL=media.controller.js.map