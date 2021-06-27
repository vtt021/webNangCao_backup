const multer = require('multer');
const util = require("util");
const randomstring = require("randomstring");
const path = require("path");


const maxSize = 50 * 1024 * 1024;

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './resources/assets/');
    },
    filename: (req, file, cb) => {
        // const fileName = file.originalname.toLowerCase().split(' ').join('-');
        const fileName = randomstring.generate({
            length: 12,
            charset: 'alphanumeric'
        });
        cb(null, fileName + path.extname(file.originalname));
    },
});

let uploadImage = multer({
    storage: storage,
    limits: {
        fileSize: maxSize
    },
    fileFilter: (req, file, cb) => { 
        let ext = path.extname(file.originalname);
        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
            cb(null, true);
        }
        else {
            cb(null, false);
            return cb(new Error('File types allowed jpeg, jpg, png only'))
        }
    }
}).single("file");

let uploadVideo = multer({
    storage: storage,
    limits: {
        fileSize: maxSize
    },
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        
        if (ext === '.mp4' || ext === '.mov' || ext === '.wmv' || ext === '.avi' || ext === '.mkv' || ext === '.webm' || ext === '.swf') {
            cb(null, true);
        }
        else {
            cb(null, false);
            return cb(new Error('Video types allowed mp4, mov, wmv, avi, mkv, webm, swf only'))
        }
    }
}).single("file");

let uploadImageMdw = util.promisify(uploadImage);
let uploadVideoMdw = util.promisify(uploadVideo); 

module.exports = {uploadImageMdw, uploadVideoMdw};