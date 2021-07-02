const express = require('express');
const registerCourseDetailModel = require('../models/registerCourseDetail.model');
const teacherAuthMdw = require('../middlewares/teacherAuth.mdw');
const userAuthMdw = require('../middlewares/userAuth.mdw');
const adminAuthMdw = require('../middlewares/adminAuth.mdw');
const registerCourseModel = require('../models/registerCourse.model');

const router = express.Router();



router.get('/', adminAuthMdw, async (req, res) => {
    try {
        const list = await registerCourseDetailModel.getAll();
        return res.json(list);
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
})

router.get('/progress', userAuthMdw, async (req, res) => {
    try {
        let courseId = req.query.courseId;
        let userId = req.accessTokenPayload.id;
        console.log(courseId, userId)

        const registration = await registerCourseModel.getRegistration(userId, courseId);
        if (registration === undefined) {
            return res.status(400).json({
                message: 'User has not registered yet'
            })
        }
        
        const list = await registerCourseDetailModel.getDetailsByCourseAndUser(courseId, userId);
        return res.json(list);
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
})

router.get('/details', userAuthMdw, async (req, res) => {
    try {
        let courseId = req.query.courseId;
        let userId = req.accessTokenPayload.id;
        let contentId = req.query.contentId;

        const registration = await registerCourseModel.getRegistration(userId, courseId);
        if (registration === undefined) {
            return res.status(400).json({
                message: 'User has not registered yet'
            })
        }

        const list = await registerCourseDetailModel.getDetailsByContent(courseId, userId, contentId);
        return res.json(list);
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
})

router.post('/update-time', userAuthMdw, async (req, res) => {
    try {
        let courseId = req.body.courseId;
        let userId = req.accessTokenPayload.id;
        let contentId = req.body.contentId;

        const registration = await registerCourseModel.getRegistration(userId, courseId);
        if (registration === undefined) {
            return res.status(400).json({
                message: 'User has not registered yet'
            })
        }

        await registerCourseDetailModel.updateTime(courseId, userId, contentId);
        return res.status(200).json({
            message: 'OK'
        })

    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
})

// router.post('/', async (req, res) => {
//     try {

//         await registerCourseDetailModel.add(req.body);
//         return res.status(201).json(req.body);
//     }
//     catch (e) {
//         console.log(e.stack);
//         res.status(500).json({
//             message: e.message
//         })
//     }
// })

// router.put('/update-percent', async (req, res) => {
//     try {
//         let courseId = req.query.courseId;
//         let userId = req.accessTokenPayload;
//         let contentId = req.query.contentId;
//         let percent = req.query.percent;
//         const ret = await registerCourseDetailModel.updatePercent(courseId, userId, contentId, percent);
//         return res.status(200).json(ret);
//     }
//     catch (e) {
//         console.log(e.stack);
//         res.status(500).json({
//             message: e.message
//         })
//     }
// })

// router.delete('/', async (req, res) => {
//     try {
//         const courseId = req.body.courseId;
//         const userId = req.body.userId;
//         const ret = await registerCourseDetailModel.delete(courseId, userId, contentId);
//         return res.status(200).json(ret);
//     }
//     catch (e) {
//         console.log(e.stack);
//         res.status(500).json({
//             message: e.message
//         })
//     }
// })

module.exports = router;