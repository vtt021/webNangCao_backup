const express = require('express');
const courseContentModel = require('../models/courseContent.model');
const teacherAuthMdw = require('../middlewares/teacherAuth.mdw');
const userAuthMdw = require('../middlewares/userAuth.mdw');
const adminAuthMdw = require('../middlewares/adminAuth.mdw');

const courseModel = require('../models/course.model');
const router = express.Router();
const upload = require('../middlewares/upload.mdw')




router.get('/', adminAuthMdw, async (req, res) => {
    try {
        const list = await courseContentModel.getAll();
        return res.json(list);
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
})

router.get('/id', async (req, res) => {
    try {
        let id = req.query.contentId || 0;
        const list = await courseContentModel.getContentsByContentId(id);
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
        console.log(courseId);
        const list = await courseContentModel.getContentsByCourseId(courseId);
        return res.json(list);
        // return res.json({
        //     message: 'OK'
        // })
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

router.post('/', teacherAuthMdw, async (req, res) => {
    try {
        const courseId = req.body.courseId;
        const teacherId = req.accessTokenPayload.id;

        const course = await courseModel.getCourseById(courseId);
        console.log(course);
        console.log(teacherId);

        if (course === undefined || course.teacherId !== teacherId) {
            res.status(400).json({
                message: 'Incorrect courseId or wrong teacher'
            })
        }

        const contentId = await courseContentModel.add(req.body);
        return res.status(201).json({
            message: 'OK',
            contentId: contentId[0]
        });
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
})

router.post('/', adminAuthMdw, async (req, res) => {
    try {
        const courseId = req.body.courseId;

        const course = await courseModel.getCourseById(courseId);
        console.log(course);

        if (course === undefined) {
            res.status(400).json({
                message: 'Incorrect courseId'
            })
        }

        const contentId = await courseContentModel.add(req.body);
        return res.status(201).json({
            message: 'OK',
            contentId: contentId[0]
        });
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }

})

router.post('/video', teacherAuthMdw, upload.uploadVideoMdw, async (req, res) => {
    try {
        const file = req.file;
        const teacherId = req.accessTokenPayload.id;

        const contentId = req.body.contentId;

        const content = await courseContentModel.getContentsByContentId(contentId);

        if (content === undefined) {
            upload.deleteFile(file.filename)
            return res.status(400).json({
                message: 'Invalid contentId'
            })
        }
        let courseId = content.courseId;

        const course = await courseModel.getCourseById(courseId);
        if (course === undefined) {
            upload.deleteFile(file.filename)
            res.status(500).json({
                message: 'Incorrect courseId'
            })
        }

        if (course.teacherId !== teacherId) {
            upload.deleteFile(file.filename)
            res.status(400).json({
                message: 'Wrong teacher'
            })
        }

        await courseContentModel.uploadVideoContent(contentId, file.filename);
        return res.status(200).json({
            message: 'OK',
            filename: file.filename
        })
    }
    catch (e) {
        console.log(e.stack);
        if (file !== undefined) {
            upload.deleteFile(file.filename)
        }
        res.status(500).json({
            message: e.message
        })
    }
})

router.post('/video/admin', adminAuthMdw, upload.uploadVideoMdw, async (req, res) => {
    try {
        const file = req.file;
        const contentId = req.body.contentId;

        const content = await courseContentModel.getContentsByContentId(contentId);

        if (content === undefined) {
            upload.deleteFile(file.filename)
            return res.status(400).json({
                message: 'Invalid contentId'
            })
        }
        let courseId = content.courseId;

        const course = await courseModel.getCourseById(courseId);
        if (course === undefined) {
            upload.deleteFile(file.filename)
            res.status(500).json({
                message: 'Incorrect courseId'
            })
        }

        await courseContentModel.uploadVideoContent(contentId, file.filename);
        return res.status(200).json({
            message: 'OK',
            filename: file.filename
        })
    }
    catch (e) {
        console.log(e.stack);
        if (file !== undefined) {
            upload.deleteFile(file.filename)
        }
        res.status(500).json({
            message: e.message
        })
    }
})

router.put('/', teacherAuthMdw, async (req, res) => {
    try {
        const teacherId = req.accessTokenPayload.id;
        const contentId = req.body.contentId;
        const content = await courseContentModel.getContentsByContentId(contentId);
        const courseContentUpdateData = req.body.contentData;

        if (content === undefined) {
            upload.deleteFile(file.filename)
            return res.status(400).json({
                message: 'Invalid contentId'
            })
        }
        let courseId = content.courseId;
        const course = await courseModel.getCourseById(courseId);
        if (course === undefined) {
            upload.deleteFile(file.filename)
            res.status(500).json({
                message: 'Incorrect courseId'
            })
        }
        if (course.teacherId !== teacherId) {
            upload.deleteFile(file.filename)
            res.status(400).json({
                message: 'Wrong teacher'
            })
        }

        if (course.isComplete == true) {
            upload.deleteFile(file.filename)
            res.status(400).json({
                message: 'Course completed'
            })
        }


        await courseContentModel.update(contentId, courseContentUpdateData);
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

router.put('/admin', adminAuthMdw, async (req, res) => {
    try {
        const contentId = req.body.contentId;
        const content = await courseContentModel.getContentsByContentId(contentId);

        if (content === undefined) {
            upload.deleteFile(file.filename)
            return res.status(400).json({
                message: 'Invalid contentId'
            })
        }
        let courseId = content.courseId;
        const course = await courseModel.getCourseById(courseId);
        if (course === undefined) {
            upload.deleteFile(file.filename)
            res.status(500).json({
                message: 'Incorrect courseId'
            })
        }

        const courseContentUpdateData = req.body.contentData;
        await courseContentModel.update(contentId, courseContentUpdateData);
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

router.delete('/', teacherAuthMdw, async (req, res) => {
    try {
        const teacherId = req.accessTokenPayload.id;
        const contentId = req.body.contentId;
        const content = await courseContentModel.getContentsByContentId(contentId);
        if (content === undefined) {
            upload.deleteFile(file.filename)
            return res.status(400).json({
                message: 'Invalid contentId'
            })
        }
        let courseId = content.courseId;
        const course = await courseModel.getCourseById(courseId);
        if (course === undefined) {
            upload.deleteFile(file.filename)
            res.status(500).json({
                message: 'Incorrect courseId'
            })
        }
        if (course.teacherId !== teacherId) {
            upload.deleteFile(file.filename)
            res.status(400).json({
                message: 'Wrong teacher'
            })
        }

        await courseContentModel.delete(contentId);

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

router.delete('/admin', adminAuthMdw, async (req, res) => {
    try {
        const contentId = req.body.contentId;
        const content = await courseContentModel.getContentsByContentId(contentId);

        if (content === undefined) {
            upload.deleteFile(file.filename)
            return res.status(400).json({
                message: 'Invalid contentId'
            })
        }
        let courseId = content.courseId;
        const course = await courseModel.getCourseById(courseId);
        if (course === undefined) {
            upload.deleteFile(file.filename)
            res.status(500).json({
                message: 'Incorrect courseId'
            })
        }

        await courseContentModel.delete(id);
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



module.exports = router;