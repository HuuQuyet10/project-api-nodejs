import { UserModel } from "../models/UserModel.js";
import bcrypt from "bcrypt";
import cryptr from "cryptr";
import md5 from "md5";
import jwt from "jsonwebtoken";
const cryptrs = new cryptr('myTotalySecretKey');


// ĐĂNG KÝ USER MỚI
export const registerUser = async (req, res) => {
    try {
        await UserModel.find({ mail: req.body.mail })
            .then(users => {
                if (users.length >= 1) {
                    return res.status(409).json({
                        "code": "401",
                        "message": "mail đã được đăng ký"
                    })
                } else {
                    const users = new UserModel({
                        mail: req.body.mail,
                        user: req.body.user,
                        password: md5(req.body.password)
                    });
                    users.save();
                    const notiCreateUsers = {
                        "code": 200,
                        "status": "Đăng ký thành công"
                    }
                    res.json(notiCreateUsers);
                }
            })
    } catch (err) {
        res.status(401).json({ error: err });
    }
}

// XOÁ USER
export const deleteUser = async (req, res) => {
    try {
        const paramBody = req.params._id;
        await UserModel.deleteOne({ _id: paramBody })
            .then(response => {
                const notiDeleteUsers = {
                    "code": 200,
                    "status": "Xoá user thành công"
                }
                res.json(notiDeleteUsers);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            })
    } catch (err) {
        res.status(401).json({ error: err });
    }
}

// ĐĂNG NHẬP TRẢ VỀ TOKEN 
export const loginUser = async (req, res) => {
    try {
        const existUser = await UserModel.findOne({ 'mail': req.body.mail.trim(), 'password': req.body.password.trim() });
        if (existUser === null) {
            return res.json({
                success: false,
                message: 'Tên tài khoản hoặc mật khẩu không chính xác.',
            })
        } else {
            const token = jwt.sign(
                {
                    mail: existUser.mail,
                    password: existUser.password,
                    userId: existUser._id
                },
                process.env.KEY_SECURITY,
                {
                    expiresIn: "1h"
                }
            );
            const refreshtoken = jwt.sign(
                {
                    mail: existUser.mail,
                    password: existUser.password,
                    userId: existUser._id
                },
                process.env.KEY_SECURITY,
                {
                    expiresIn: "30d"
                }
            );
            return res.status(200).json({
                message: "Authorization successful",
                accessToken: token,
                refreshtoken: refreshtoken,
                username: existUser.user
            });
        }
    } catch (error) {
        console.log(error)
    }
}

export const refrestoken = async (req, res) => {
    try {
        const refreshtoken = req.headers.authorization;
        const checkRefreshtoken = jwt.verify(refreshtoken, process.env.KEY_SECURITY);
        const existUser = await UserModel.findOne({ 'mail': checkRefreshtoken.mail, 'password': checkRefreshtoken.password });
        if (existUser.mail == checkRefreshtoken.mail && existUser.password == checkRefreshtoken.password) {
            const token = jwt.sign(
                {
                    mail: existUser.mail,
                    password: existUser.password,
                    userId: existUser._id
                },
                process.env.KEY_SECURITY,
                {
                    expiresIn: "1h"
                }
            );
            const refreshtoken = jwt.sign(
                {
                    mail: existUser.mail,
                    password: existUser.password,
                    userId: existUser._id
                },
                process.env.KEY_SECURITY,
                {
                    expiresIn: "1m"
                }
            );
            return res.status(200).json({
                message: "Authorization successful",
                accessToken: token,
                refreshtoken: refreshtoken,
                username: existUser.user
            });
        } else {
            return res.status(401).json({
                code: 401,
                message: "Token không hợp lệ"
            });
        }
    } catch (err) {
        res.status(401).json({ error: err });
    }
}