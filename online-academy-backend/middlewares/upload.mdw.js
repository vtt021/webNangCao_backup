const multer = require('multer');
const util = require("util")

const maxSize = 50 * 1024 * 1024;

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './resources/assets/');
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName);
    },
});

let uploadFile = multer({
    storage: storage,
    limits: {
        fileSize: maxSize
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        }
        else {
            cb(null, false);
            return cb(new Error('File types allowed jpeg, jpg, png only'))
        }
    }
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);


module.exports = uploadFileMiddleware;