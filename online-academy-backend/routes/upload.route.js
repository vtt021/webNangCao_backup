const express = require('express')
const fs = require('fs');
const pathName = __basedir + '/resources/';

const router = express.Router();

// const controller = require('../controllers/file.controller');

// router.post("/upload-file", controller.uploadImage);

// router.get("/files", controller.getFilesList);

router.get("/send", async (req, res) => {
    const fileName = req.query.fileName;
    // const stat = await fs.statSync(pathName + fileName);

    res.sendFile(pathName + fileName)

    // let readStream = fs.createReadStream(pathName + fileName);
    // readStream.pipe(res);

    // await res.status(200).send(stat);
});

router.get("/download", async (req, res) => {
    const fileName = req.query.fileName;



    res.download(pathName + fileName, err => {
        if (err) {
            console.log(err)
            res.status(500).send({
                message: "File cannot be download: " + err
            });
        }
    });
})

module.exports = router;