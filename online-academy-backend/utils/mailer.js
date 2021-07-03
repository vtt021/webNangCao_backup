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
            from: 'Online Academy Admin',
            to: receivedMail,
            subject: 'Email verification',
            text: 'Mã xác nhận của bạn là: ' + token,
            html: '<h3>' + token + '</h3>'
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