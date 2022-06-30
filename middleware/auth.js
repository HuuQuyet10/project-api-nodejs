import jwt from "jsonwebtoken";

export const checkMiddleware = async (req, res, next) => {
    try {
        const token =  await req.headers.authorization;
        const decoded = jwt.verify(token, "daylapassword");
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            "code": "401",
            "status": "Vui lòng đăng nhập lại"
        });
    }
}