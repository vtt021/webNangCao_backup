const otpGenerator = require('./otp-generator')
var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'ltt.mailreceiver@gmail.com',
        pass: 'Aa@123456'
    }
})

const sendMail = (receivedMail) => {
    try {
        let token = otpGenerator.generateToken();
        let mainOptions = {
            from: 'ltt.mailreceiver@gmail.com',
            to: receivedMail,
            subject: 'Email verification',
            html: '<p>Chào mừng bạn đến với Online Academy, mã xác thực của bạn là</p><h3>' + token + '</h3><p>Mã có hiệu lực trong <b>5</b> phút</p>'
        }

        transporter.sendMail(mainOptions, (err, info) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("OTP sent:", token);
            }
        })
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = {sendMail}