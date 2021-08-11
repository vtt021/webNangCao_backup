const express = require('express');
const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');

const router = express.Router();
const adminAuthMdw = require('../middlewares/adminAuth.mdw');
const userAuthMdw = require('../middlewares/userAuth.mdw');
const { sendMail } = require('../utils/mailer');
const saltRounds = 10;
const otpGenerator = require('../utils/otp-generator');
const courseModel = require('../models/course.model');

router.get('/', /*adminAuthMdw,*/ async (req, res) => {
    try {
        const list = await userModel.getAllUsers();
        return res.json(list);
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
});

router.get('/id', async (req, res) => {
    try {
        const id = req.query.id || 0;
        const user = await userModel.getUserById(id);
        if (user === undefined) {
            return res.status(204).end();
        }
        delete user.password;
        delete user.refreshToken;
        delete user.role;
        delete user.isDeleted;
        delete user.lastUpdated;
        return res.json(user);



    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }


});

router.get('/teacher', async (req, res) => {
    try {
        const list = await userModel.getAllTeachers();
        return res.json(list);
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
})

router.post('/verify-otp', async (req, res) => {
    try {
        const email = req.body.email;
        const token = req.body.token;

        if (email === undefined || token === undefined) {
            return res.status(400).json({
                message: 'Invalid data'
            });
        }
        const user = await userModel.getUserByEmailForVerification(email);
        if (user === undefined) {
            return res.status(400).json({
                message: 'User not exists'
            });
        }

        let result = otpGenerator.checkValid(token);
        if (result == true) {
            await userModel.unlockAccount(email);
        }
        else {
            return res.status(400).json({
                message: 'Wrong otp'
            });
        }

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

router.post('/', async (req, res) => {
    try {
        const user = req.body;
        if (user.email === undefined || user.password === undefined || user.username === undefined) {
            res.status(400).json({
                message: 'Invalid data'
            })
        }
        user.password = bcrypt.hashSync(user.password, saltRounds);

        const existData = await userModel.getUserByEmailForVerification(user.email);
        console.log("existData", existData)

        if (existData === undefined) {
            await userModel.addUser(user);
            sendMail(user.email)
            return res.status(201).json({
                message: 'User added, check email for OTP'
            });
        }


        if (existData.isUnlocked == true) {
            if (existData.isDeleted == false) {
                return res.status(400).json({
                    message: 'User exists'
                })
            }
            else {
                return res.status(400).json({
                    message: 'User banned'
                })
            }
        }
        else {
            await userModel.update(existData._id, user);
            sendMail(user.email);
            res.status(200).json({
                message: 'User already added, check email for OTP'
            });
        }



    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
});



router.get('/favorite', userAuthMdw, async (req, res) => {
    try {
        let userId = req.accessTokenPayload.id;
        const favorites = await userModel.getFavoriteCourses(userId);
        const data = await courseModel.getArrayCourses(favorites);
    
        return res.status(200).send(data);
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
})

router.get('/favorite-course', userAuthMdw, async (req, res) => {
    try {
        let userId = req.accessTokenPayload.id;
        let courseId = req.query.courseId;
    
        const favorites = await userModel.getFavoriteCourses(userId);
        if (favorites.findIndex(e => e.localeCompare(courseId) == 0) == -1) {
            return res.status(200).send({
                isFavorite: false
            })
        }
        else {
            return res.status(200).send({
                isFavorite: true
            })
        }
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
})

router.post('/favorite', userAuthMdw, async (req, res) => {
    let courseId = req.body.courseId;
    let userId = req.accessTokenPayload.id;

    const favorites = await userModel.getFavoriteCourses(userId);

    let find = favorites.findIndex(e => e.localeCompare(courseId) == 0);
    if (find == -1) {
        favorites.push(courseId);
    }
    else {
        favorites.splice(find, 1);
    }

    await userModel.updateFavorite(userId, favorites);
    return res.status(200).send({
        message: 'OK',
        isFavorite: (find == -1)
    })
})

// router.put('/remove-favorite', userAuthMdw, async (req, res) => {
//     let courseId = req.body.courseId;
//     let userId = req.accessTokenPayload.id;
// })



router.put('/password', userAuthMdw, async (req, res) => {
    try {
        const id = req.accessTokenPayload.id;
        const currentPass = req.body.currentPass;
        const newPass = req.body.newPass;
        const confirmPass = req.body.confirmPass;

        const user = await userModel.getAllInfoById(id);
        if (user === undefined || !bcrypt.compareSync(currentPass, user.password)) {

        // console.log(currentPass);
        // console.log(user.password);
        // if (user === undefined || currentPass.localeCompare(user.password) != 0) {
            console.log('User not exist or incorrect pass')
            return res.status(401).json({
                message: 'User not exist or incorrect pass'
            });
        }

        if (newPass.localeCompare(confirmPass) !== 0) {
            return res.status(400).json({
                message: 'New password is not match'
            });
        }

        const hashPass = bcrypt.hashSync(newPass, saltRounds);
        await userModel.updatePassword(id, hashPass);

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
});

router.put('/', userAuthMdw, async (req, res) => {
    try {
        const id = req.accessTokenPayload.id;
        const password = req.body.password;
        const email = req.body.email;
        const username = req.body.username;

        const user = await userModel.getAllInfoById(id);
        if (user === undefined || !bcrypt.compareSync(password, user.password)) {
            console.log('User not exist or incorrect pass')
            return res.status(401).json({
                message: 'User not exist or incorrect pass'
            });
        }

        if (typeof (username) === 'string' && username.length === 0) {
            return res.status(400).json({
                message: 'Username cannot be empty'
            });
        }
        let users = {
            email: email,
            username: username
        }
        await userModel.update(id, users);

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

router.delete('/', adminAuthMdw, async (req, res) => {
    try {
        const adminId = req.accessTokenPayload.id;
        const id = req.body.id;

        if (adminId === id) {
            returnres.status(400).json({
                message: "Unable to delete this account"
            })
        }
        await userModel.delete(id);
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