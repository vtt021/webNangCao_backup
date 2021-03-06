const jwt = require('jsonwebtoken');
const authConstants = require('../utils/auth.constant');

module.exports = function (req, res, next) {
    const accessToken = req.headers['x-access-token'];
    if (accessToken) {
        try {
            const decoded = jwt.verify(accessToken, 'ONLINE_ACADEMY');
            // console.log("decoded = " + decoded);
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