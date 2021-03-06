    const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const userModel = require('../models/user.model');


const router = express.Router();
var timeExpired = 600;

router.post('/', async (req, res, next) => {
    try {
        const user = await userModel.getUserByEmailLogin(req.body.email);

        console.log(user)
        if (user === undefined) {
            return res.status(401).json({
                authenticated: false
            })
        }

        if (user.isDeleted == true) {
            return res.status(403).json({
                authenticated: false
            })
        }

        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                authenticated: false
            })
        }
        console.log(user._id);
        const payload = {
            id: user._id
        }

        const options = {
            expiresIn: timeExpired
        }

        const accessToken = jwt.sign(payload, 'ONLINE_ACADEMY', options);
        const refreshToken = randomstring.generate(80);

        await userModel.patchRFToken(user._id, refreshToken);

        return res.status(200).json({
            id: user._id,
            role: user.role,
            authenticated: true,
            accessToken,
            refreshToken,
	    role: user.role
        });
    }
    catch (e) {
        console.log(e.stack)
        return res.status(500).json({
            authenticated: false,
            message: 'Something went wrong'
        })
    }
})

router.post('/refresh', async (req, res, next) => {
    try {
        const { accessToken, refreshToken } = req.body;

        const decoded = jwt.verify(accessToken, 'ONLINE_ACADEMY', {
            ignoreExpiration: true
        });

        console.log(decoded);

        let userId = decoded.id;
        console.log(userId);

        const ret = await userModel.isValidRefreshToken(userId, refreshToken);

        if (ret == true) {
            const newAccessToken = jwt.sign({ id: userId }, 'ONLINE_ACADEMY', { expiresIn: timeExpired })
            return res.json({
                accessToken: newAccessToken
            })
        }

        return res.status(400).json({
            message: 'Refresh token is invalid'
        })
    }
    catch (e) {
        console.log(e.stack);
        return res.status(400).json({
            message: 'Invalid token'
        })
    }

});

module.exports = router;