const model = require('../models/user');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const secretKey = 'mynameisshreyashbansode';

exports.createUser = async (req, res) => {
    try {
        const saveUser = await new model(req.body).save();
        if (saveUser) {
            res.send({
                success: true,
                message: "User successfully register"
            })
        } else {
            res.send({
                success: false,
                message: "failed to create user"
            })
        }

    } catch (err) {
        res.send({
            success: false,
            message: "failed to create user"
        })
    }
}


exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await model.findOne({ email: email, password: password });

        if (user) {
            const token = await user.generateToken();
            res.send({
                success: true,
                message: 'login successfully',
                data: {
                    user,
                    token
                }
            })
        } else {
            res.send({
                success: false,
                message: 'something went wrong'
            })
        }


    } catch (err) {
        res.send({
            success: false,
            message: 'something went wrong'
        })
    }
}

exports.sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        let findUser = await model.findOne({ email: email });

        if (!findUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        const random = Math.floor(Math.random() * 9000 + 1000);
        findUser.otp = random;
        await findUser.save(); // Save the updated user object

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "shreyashbansode01@gmail.com",
                pass: "zqhk ogue bikl fnqn",
            },
        });


        const gmailBody = ` Hello ${findUser.firstName}, 
                        For security reason ,you're required to use the following One TIme Password to login.
                       <h1> ${random}</h1>

 NOTE : this OTP is set to expire in 5 minutes.`

        const info = await transporter.sendMail({
            from: 'shreyashbansode01@gmail.com',
            to: "shreyashbansode1@gmail.com",
            subject: "OTP varifation",
            html: gmailBody,
        });

        res.status(200).json({
            success: true,
            message: "OTP successfully sent",
            otp: random,
            messageID: info.messageId,
        });


    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}


exports.varifyOtp = async (req, res) => {
    try {
        const { Otp } = req.body;
        let varifyUser = await model.find({ otp: Otp });
        if (varifyUser) {
            res.send({
                success: true,
                message: 'OTP successfully varify'
            })
        }
    } catch (err) {
        console.log(err)
    }

}

exports.createNewPassword = async (req, res) => {
    try {
        const token = req.headers.token;
        console.log(token)
        const varifyToken = jwt.verify(token, secretKey);
        const user = await model.findOne({ _id: varifyToken._id });
        const { password, confirmPassword } = req.body;
        if (user && password == confirmPassword) {
            user.password = password;
            await user.save()
            res.send({
                success: true,
                message: "Password update password"
            })
        } else {
            res.send({
                success: false,
                message: "can't update password1"
            })
        }
    } catch (err) {
        res.send({
            success: false,
            message: "can't update password2"
        })
    }

}


exports.changeAddress = async (req, res) => {
    try {
        const token = req.headers.token;
        console.log(token)
        const varifyToken = jwt.verify(token, secretKey);
        const user = await model.findOne({ _id: varifyToken._id });
        const { pincode, address, city, state } = req.body;
        let combineAddress = `${address},${pincode},${city},${state}`
        const changeAddres = await model.findByIdAndUpdate({ _id: user._id }, { address: combineAddress });
        if (changeAddres) {
            res.send({
                success: true,
                message: "Address change succssfully"
            })
        } else {
            res.send({
                success: false,
                message: "can't change address"
            })
        }


    }
    catch (err) {
        res.send({
            success: false,
            message: "can't change address"

        })
    }
}