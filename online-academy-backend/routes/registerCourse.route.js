const express = require('express');
const registerCourseModel = require('../models/registerCourse.model');
const teacherAuthMdw = require('../middlewares/teacherAuth.mdw');
const userAuthMdw = require('../middlewares/userAuth.mdw');
const adminAuthMdw = require('../middlewares/adminAuth.mdw');

const router = express.Router();



router.get('/', adminAuthMdw,  async(req, res) => {
    const list = await registerCourseModel.getAll();
    return res.json(list);
})

router.get('/my-course', userAuthMdw, async(req, res) => {
    let userId = req.accessTokenPayload;
    const list = await registerCourseModel.getRegisterCourseByUserId(userId);
    return res.json(list);
})

router.get('/course-users', async(req, res) => {
    let courseId = req.query.courseId;
    const list = await registerCourseModel.getRegisterUsersByCourseId(courseId);
    return res.json(list);
})

// router.post('/imageThumbnail', async(req, res) => {
//     const link = req.body.link;

// })

router.post('/',  async (req, res) => {
    await registerCourseModel.add(req.body);
    return res.status(201).json(req.body);
})

router.put('/', async (req, res) => {
    const id = req.body.id;
    const registerCourseUpdateData = req.body.registerData;
    const ret = await registerCourseModel.update(id, registerCourseUpdateData);
    return res.status(200).json(ret);
})

router.delete('/', async(req, res) => {
    const courseId = req.body.courseId;
    const userId = req.body.userId;
    const ret = await registerCourseModel.delete(courseId, userId);
    return res.status(200).json(ret);
})

module.exports = router;