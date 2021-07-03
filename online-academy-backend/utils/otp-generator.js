const { totp } = require('otplib')

const secret = 'DaiHocKhoaHocTuNhien';

totp.options = {
    digits: 6,
    epoch: Date.now(),
    step: 300
}

const generateToken = () => {
    try {
        let token = totp.generate(secret);
        return token;
    }
    catch (e) {
        console.log(e.stack);
    }
}

const checkValid = (token) => {
    try {
        return totp.check(token, secret);
    }
    catch (e) {
        console.log(e.stack);
    }
}

module.exports = {generateToken, checkValid}

