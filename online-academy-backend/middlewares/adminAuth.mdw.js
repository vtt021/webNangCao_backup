const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const authConstants = require('../utils/auth.constant');

module.exports = async function (req, res, next) {
    const accessToken = req.headers['x-access-token'];
    if (accessToken) {
        try {
            const decoded = jwt.verify(accessToken, 'ONLINE_ACADEMY');
            // console.log(decoded);
            const id = decoded.id;
            console.log(decoded)
            console.log(id);
            const user = await userModel.getUserById(id);
            console.log(JSON.stringify(user));
            if (user.role < authConstants.KEY_ADMIN_AUTH) {
                return res.status(401).json({
                    message: 'Invalid access token!'
                })
            }

            req.accessTokenPayload = decoded;
            next();
        } catch (err) {
            console.log(err);
            return res.status(401).json({
                message: 'Invalid access token!'
            });
        }
    } else {
        return res.status(400).json({
            message: 'Access token not found!'
        });
    }
}