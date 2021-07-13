const express = require('express');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');

const router = express.Router();
const schemaValidate = require('../middlewares/validate.mdw')
const schema = require('../schema/user.json');
const adminAuthMdw = require('../middlewares/adminAuth.mdw');
const userAuthMdw = require('../middlewares/userAuth.mdw');
const { sendMail } = require('../utils/mailer');
const saltRounds = 10;
const otpGenerator = require('../utils/otp-generator')

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
                message: 'User not exists'
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

router.post('/', schemaValidate(schema), async (req, res) => {
    try {
        const user = req.body;
        if (user.email === undefined || user.password === undefined || user.username === undefined) {
            res.status(400).json({
                message: 'Invalid data'
            })
        }
        user.password = bcrypt.hashSync(user.password, saltRounds);

        // const existData = await userModel.getUserByEmailForVerification(user.email);

        // if (existData === undefined) {
            await userModel.addUser(user);
            // sendMail(user.email)
            return res.status(201).json({
                message: 'OK'
            });
        // }


        // if (existData.isUnlocked == true) {
        //     if (existData.isDeleted == false) {
        //         return res.status(400).json({
        //             message: 'User exists'
        //         })
        //     }
        //     else {
        //         return res.status(400).json({
        //             message: 'User banned'
        //         })
        //     }
        // }
        // else {
        //     await userModel.update(existData.id, user);
        //     sendMail(user.email);
        //     res.status(200).json({
        //         message: 'OK'
        //     });
        // }


        
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
});

router.put('/password', userAuthMdw, async(req, res) => {
    try {
        const id = req.accessTokenPayload.id;
        const currentPass = req.body.currentPass;
        const newPass = req.body.newPass;
        const confirmPass = req.body.confirmPass;

        const user = await userModel.getUserById(id);
        if (user === undefined || !bcrypt.compareSync(currentPass, user.password)) {
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
    catch(e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
});

router.put('/',adminAuthMdw, async (req, res) => {
    try {
        const id = req.accessTokenPayload.id;
        const user = req.body;

        const email = user.email;
        // if (typeof(email) === 'string') {
        //     if (!email.match("\/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$\/g")) {
        //         return res.status(400).json({
        //             message: 'Incorrect email format'
        //         });
        //     }
        // }
        const username = user.username;
        if (typeof(username) === 'string' && username.length === 0) {
            return res.status(400).json({
                message: 'Username cannot be empty'
            });
        }
        if (Object.keys(user).length != 0) {
            await userModel.update(id, user);
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

router.delete('/', adminAuthMdw,  async (req, res) => {
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