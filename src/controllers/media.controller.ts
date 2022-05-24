import multer from 'multer';
import fs from 'fs';

class MediaController {
    public multerStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            let dir = './media';
            fs.mkdirSync(dir, { recursive: true })
            return cb(null, dir)
        },
        filename: (req, file, cb) => {
            const ext = file.mimetype.split("/")[1];
            const fileName = `${file.fieldname}-${Date.now()}.${ext}`
            req.body.imageUrl = fileName
            cb(null, fileName);
        },
    });

    public upload = multer({
        storage: this.multerStorage,
    }).single('csv_file');
}

export default MediaController;