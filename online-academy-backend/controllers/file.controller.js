const upload = require('../middlewares/upload.mdw');

const URL = "http://localhost:3001/get-cfiles/";

const fs = require("fs");


const uploadFile = async (req, res) => {
    try {
        await upload(req, res);

        if (req.file === undefined) {
            return res.status(400).send({
                message: 'File not found'
            });
        }

        res.status(200).send({
            message: 'File upload successfully',
            link: req.file.originalname
        });
    }
    catch (err) {
        console.log(err);

        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size should be less than 50MB",
            });
        }

        res.status(500).send({
            message: `Error occured: ${err}`,
        });
    }
};

const getFilesList = (req, res) => {
    const path = __dirname + '/resources/assets/';
    fs.readdir(path, (err, files) => {
        if (err) {
            res.status(500).send({
                message: "Files not found"
            });
        }
        let filesList = [];

        files.forEach(file => {
            filesList.push({
                name: file,
                url: URL + file
            });
        });

        res.status(200).send(filesList);
    });
};

const downloadFiles = (req, res) => {
    const fileName = req.params.name;
    const path = __dirname + '/resources/assets/';

    res.download(path + fileName, err => {
        if (err) {
            res.status(500).send({
                message: "File cannot be download: " + err
            });
        }
    });
}
module.exports = {uploadFile, downloadFiles, getFilesList};