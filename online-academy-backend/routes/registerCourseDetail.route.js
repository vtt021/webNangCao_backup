const express = require('express');
const registerCourseDetailModel = require('../models/registerCourseDetail.model');
const teacherAuthMdw = require('../middlewares/teacherAuth.mdw');
const userAuthMdw = require('../middlewares/userAuth.mdw');
const adminAuthMdw = require('../middlewares/adminAuth.mdw');

const router = express.Router();



router.get('/', adminAuthMdw,  async(req, res) => {
    const list = await registerCourseDetailModel.getAll();
    return res.json(list);
})

router.get('/details', userAuthMdw, async(req, res) => {
    let courseId = req.query.courseId;
    let userId = req.accessTokenPayload;
    let contentId = req.query.contentId;
    const list = await registerCourseDetailModel.getDetailsByCourseId(courseId, userId, contentId);
    return res.json(list);
})

router.post('/',  async (req, res) => {
    await registerCourseDetailModel.add(req.body);
    return res.status(201).json(req.body);
})

router.put('/update-percent', async (req, res) => {
    let courseId = req.query.courseId;
    let userId = req.accessTokenPayload;
    let contentId = req.query.contentId;
    let percent = req.query.percent;
    const ret = await registerCourseDetailModel.updatePercent(courseId, userId, contentId, percent);
    return res.status(200).json(ret);
})

router.delete('/', async(req, res) => {
    const courseId = req.body.courseId;
    const userId = req.body.userId;
    const ret = await registerCourseDetailModel.delete(courseId, userId, contentId);
    return res.status(200).json(ret);
})

module.exports = router;