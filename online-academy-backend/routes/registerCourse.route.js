const express = require('express');
const registerCourseModel = require('../models/registerCourse.model');
const teacherAuthMdw = require('../middlewares/teacherAuth.mdw');
const userAuthMdw = require('../middlewares/userAuth.mdw');
const adminAuthMdw = require('../middlewares/adminAuth.mdw');

const router = express.Router();
const registerCourseDetailModel = require('../models/registerCourseDetail.model');
const courseModel = require('../models/course.model');
const { Course } = require('../schema/mongodb.schema');
const courseContentModel = require('../models/courseContent.model');


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

router.get('/ids', async (req, res) => {
    try {
        const list = await registerCourseModel.getAllIds();
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

router.get('/course-only', userAuthMdw, async (req, res) => {
    try {
        let userId = req.accessTokenPayload.id;
        const list = await registerCourseModel.getRegisterCourseDataByUserId(userId);
        return res.json(list);
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
})

router.get('/course', async (req, res) => {
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
        if (registration == undefined) {
            return res.status(200).json({
                isRegistered: false
            })
        }
        else {
            return res.status(200).json({
                isRegistered: true,
                registration: registration
            });
        }
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
})

router.get('/progress', userAuthMdw, async(req, res) => {
    try {
        const userId = req.accessTokenPayload.id;
        const courseId = req.query.courseId;

        if (courseId === undefined) {
            return res.status(400).json({
                message: 'Invalid courseId'
            })
        }
        const registration = await registerCourseModel.getRegistration(userId, courseId);
        if (registration == undefined) {
            return res.status(400).json({
                message: 'User has not registered this'
            })
        }
        else {
            return res.status(200).json(registration['progress']);
        }
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
})

router.get('/detail_ad',  async(req, res) => {
    try {
        const userId = req.query.userId;
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

router.post('/changeId', async(req, res) => {
    try {
        let oldId = req.body.oldId;
        let newId = req.body.newId;

        await registerCourseModel.changeId(oldId, newId);
        
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

            let courses = await Course.find({ _id: courseId, isDeleted: false }).exec();
            let course = courses[0];

            
            await Course.find({ _id: courseId, isDeleted: false }).updateMany({
                hotPoint: course['viewCount'] + (course['studentCount'] + 1) * 5,
                studentCount: course['studentCount'] + 1
            })
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

router.post('/fake/add', async(req, res) => {
    try {
        const userId = req.body.id;

        console.log(courses.length);
        for(let i = 0; i < courses.length; i++) {
            // const courseId = req.body.courseId;
            console.log("fake add", i);
            const courseId = courses[i];
            let isLegit = Math.floor(Math.random() * 2);
            if (isLegit == 0) {
                continue;
            }

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
    
                let courses = await Course.find({ _id: courseId, isDeleted: false }).exec();
                let course = courses[0];
    
                
                await Course.find({ _id: courseId, isDeleted: false }).updateMany({
                    hotPoint: course['viewCount'] + (course['studentCount'] + 1) * 5,
                    studentCount: course['studentCount'] + 1
                })
            }
            else {
                return res.status(400).json({
                    message: 'User registered this'
                })
            }
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

router.post('/fake/rate', async (req, res) => {
    try {
        
        for(let i = 0; i < ids.length; i++) {
            let t = Math.floor(Math.random() * rateStr.length);
            let star = Math.floor(Math.random() * 5) + 1;
            // let count =  Math.floor(Math.random() * ids.length);
            console.log("star", star);
            // await registerCourseModel.addFakeRate(ids[count], star, rateStr[t])
            
            await registerCourseModel.addFakeRate(ids[i], star, rateStr[t])

            const reg = await registerCourseModel.getRegistrationById(ids[i]);

            let courseId = reg["courseId"];

            const course = await courseModel.getCourseById(courseId);

            let totalRating = course["totalRating"] + star;
            let ratingCount = course["ratingCount"] + 1;
            let rating = totalRating / ratingCount;

            await courseModel.update(courseId, {
                totalRating: totalRating,
                ratingCount: ratingCount,
                rating: rating
            })
        }

        res.status(200).json({
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

router.get('/fake/ids', async (req, res) => {
    try {
        const list = await registerCourseModel.getIdOnly();
        return res.json(list);
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

        if (registration === undefined) {
            return res.status(400).json({
                message: 'You have not registered the course yet'
            })
        }
        else {
            await registerCourseModel.addRate(courseId, userId, rate, rateContent)

            const course = await courseModel.getCourseById(courseId);

            let totalRating = course["totalRating"] + rate;
            let ratingCount = course["ratingCount"] + 1;
            let rating = totalRating / ratingCount;

            await courseModel.update(courseId, {
                totalRating: totalRating,
                ratingCount: ratingCount,
                rating: rating
            })
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

router.post('/progress', userAuthMdw, async (req, res) => {
    try {
        const userId = req.accessTokenPayload.id;
        // const courseId = req.body.courseId;
        const contentId = req.body.contentId;
        const currentTime = req.body.currentTime;

        
        if (/*courseId === undefined ||*/ !Number.isInteger(currentTime) || contentId === undefined ) {
            return res.status(400).json({
                message: 'Invalid data'
            })
        }

        let content = await courseContentModel.getContentsByContentId(contentId);
        if (content === undefined) {
            console.log("Invalid content id")
            return res.status(400).json({
                message: 'Invalid content id'
            })
        }

        let courseId = content['courseId']

        const registration = await registerCourseModel.getRegistration(userId, courseId);

        if (registration === undefined) {
            console.log("Here")
            return res.status(400).json({
                message: 'You have not registered the course yet'
            })
        }
        else {
            await registerCourseModel.updateProgress(courseId, userId, contentId, currentTime);
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