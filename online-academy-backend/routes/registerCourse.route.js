const express = require('express');
const registerCourseModel = require('../models/registerCourse.model');
const teacherAuthMdw = require('../middlewares/teacherAuth.mdw');
const userAuthMdw = require('../middlewares/userAuth.mdw');
const adminAuthMdw = require('../middlewares/adminAuth.mdw');

const router = express.Router();



router.get('/', adminAuthMdw, async (req, res) => {
    try {
        const list = await registerCourseModel.getAll();
        return res.json(list);
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }

})

router.get('/my-course', userAuthMdw, async (req, res) => {
    try {
        let userId = req.accessTokenPayload;
        const list = await registerCourseModel.getRegisterCourseByUserId(userId);
        return res.json(list);
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }

})

router.get('/course-users', async (req, res) => {
    try {
        let courseId = req.query.courseId;
        const list = await registerCourseModel.getRegisterUsersByCourseId(courseId);
        return res.json(list);
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }

})

// router.post('/imageThumbnail', async(req, res) => {
//     const link = req.body.link;

// })

router.post('/', async (req, res) => {
    try {
        await registerCourseModel.add(req.body);
        return res.status(201).json(req.body);
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }

})

router.put('/', async (req, res) => {
    try {
        const id = req.body.id;
        const registerCourseUpdateData = req.body.registerData;
        const ret = await registerCourseModel.update(id, registerCourseUpdateData);
        return res.status(200).json(ret);
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }

})

router.delete('/', async (req, res) => {
    try {
        const courseId = req.body.courseId;
        const userId = req.body.userId;
        const ret = await registerCourseModel.delete(courseId, userId);
        return res.status(200).json(ret);
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
})

module.exports = router;