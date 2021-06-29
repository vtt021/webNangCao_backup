const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const userModel = require('../models/user.model');


const router = express.Router();

router.post('/', async (req, res, next) => {
    const user = await userModel.getUserByEmail(req.body.email);

    if (user === null) {
        return res.status(401).json({
            authenticated: false
        })
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(401).json({
            authenticated: false
        })
    }

    const payload = {
        id: user.id
    }

    const options = {
        expiresIn: 10 * 60
    }

    const accessToken = jwt.sign(payload, 'ONLINE_ACADEMY' , options);
    const refreshToken = randomstring.generate(80);

    await userModel.patchRFToken(user.id, refreshToken);

    return res.status(200).json({
        authenticated: true,
        accessToken,
        refreshToken
    });

})

router.post('/refresh', async (req, res, next) => {
    try {
        const {accessToken, refreshToken} = req.body;

        const decoded = jwt.verify(accessToken, 'ONLINE_ACADEMY', {
            ignoreExpiration: true
        });

        let userId = decoded.id;
    
        const ret = await userModel.isValidRefreshToken(userId, refreshToken);
    
        if (ret === true) {
            const newAccessToken = jwt.sign({userId}, 'ONLINE_ACADEMY', {expiresIn: 600})
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