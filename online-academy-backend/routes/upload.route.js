const express = require('express')
const router = express.Router();

const controller = require('../controllers/file.controller');

router.post("/upload-file", controller.uploadFile);

router.get("/files", controller.getFilesList);

router.get("/files/:name", controller.downloadFiles);

module.exports = router;