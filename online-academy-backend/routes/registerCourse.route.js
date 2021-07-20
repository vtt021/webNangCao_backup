const express = require('express');
const registerCourseModel = require('../models/registerCourse.model');
const teacherAuthMdw = require('../middlewares/teacherAuth.mdw');
const userAuthMdw = require('../middlewares/userAuth.mdw');
const adminAuthMdw = require('../middlewares/adminAuth.mdw');

const router = express.Router();
const registerCourseDetailModel = require('../models/registerCourseDetail.model');


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
        let userId = req.accessTokenPayload.id;
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

router.get('/course', teacherAuthMdw, async (req, res) => {
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

router.get('/rate', async(req, res) => {
    try {
        let courseId = req.query.courseId;
        const list = await registerCourseModel.getRatingDetail(courseId);
        return res.json(list);
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
})

router.get('/detail', userAuthMdw,  async(req, res) => {
    try {
        const userId = req.accessTokenPayload.id;
        const courseId = req.query.courseId;

        if (courseId === undefined) {
            return res.status(400).json({
                message: 'Invalid courseId'
            })
        }
        const registration = await registerCourseModel.getRegistration(userId, courseId);
        return res.status(200).json(registration);
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
})

router.post('/favorite', userAuthMdw, async(req, res) => {
    try {
        const userId = req.accessTokenPayload.id;
        const courseId = req.body.courseId;

        if (courseId === undefined) {
            return res.status(400).json({
                message: 'Invalid courseId'
            })
        }
        const registration = await registerCourseModel.getRegistration(userId, courseId);

        if (registration === undefined) {
            return res.status(400).json({
                message: 'User has not registered yet'
            }) 
        }
        else {
            await registerCourseModel.changeFavoriteStatus(courseId, userId, registration.isFavorite == 0);
        }
        
        return res.status(201).json({
            message: 'OK'
        });
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
})

router.post('/', userAuthMdw,  async (req, res) => {
    try {
        const userId = req.accessTokenPayload.id;
        const courseId = req.body.courseId;

        if (courseId === undefined) {
            return res.status(400).json({
                message: 'Invalid courseId'
            })
        }
        const registration = await registerCourseModel.getRegistration(userId, courseId);

        if (registration === undefined) {
            await registerCourseModel.add({
                userId: userId,
                courseId: courseId
            });
        }
        else {
            return res.status(400).json({
                message: 'User registered this'
            })
        }
        
        return res.status(201).json({
            message: 'OK'
        });
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
})

router.post('/rate', userAuthMdw, async (req, res) => {
    try {
        const userId = req.accessTokenPayload.id;
        const courseId = req.body.courseId;
        const rate = req.body.rate;
        const rateContent = req.body.rateContent;

        
        if (courseId === undefined || !Number.isInteger(rate) || rate < 1 || rate > 5 || rateContent === undefined) {
            return res.status(400).json({
                message: 'Invalid data'
            })
        }
        const registration = await registerCourseModel.getRegistration(userId, courseId);

        if (registration.length === undefined) {
            return res.status(400).json({
                message: 'You have not registered the course yet'
            })
        }
        else {
            await registerCourseModel.addRate(courseId, userId, rate, rateContent)
        }
        
        return res.status(200).json({
            message: 'OK'
        });
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
})

router.delete('/', userAuthMdw, async (req, res) => {
    try {
        const userId = req.accessTokenPayload.id;
        const courseId = req.body.courseId;

        if (courseId === undefined) {
            return res.status(400).json({
                message: 'Invalid courseId'
            })
        }
        const registration = await registerCourseModel.getRegistration(userId, courseId);

        if (registration === undefined) {
            res.status(400).json({
                message: 'You did not register this course'
            })
        }
        else {
            //TODO: Delete all register course detail
            await registerCourseDetailModel.removeContent(courseId, userId);

            await registerCourseModel.delete(courseId, userId);
        }
        
        return res.status(201).json({
            message: 'OK'
        });
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
})

router.delete('/admin', userAuthMdw, async (req, res) => {
    try {
        const userId = req.body.userId;
        const courseId = req.body.courseId;

        if (courseId === undefined || userId === undefined) {
            return res.status(400).json({
                message: 'Invalid data'
            })
        }
        const registration = await registerCourseModel.getRegistration(userId, courseId);

        if (registration === undefined) {
            res.status(400).json({
                message: 'The user did not register this course'
            })
        }
        else {
            //TODO: Delete all register course detail
            await registerCourseDetailModel.removeContent(courseId, userId);

            await registerCourseModel.unregistered(courseId, userId);
        }
        
        return res.status(201).json({
            message: 'OK'
        });
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

module.exports = router;