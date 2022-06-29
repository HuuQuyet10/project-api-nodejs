import jwt from "jsonwebtoken";

export const checkMiddleware = async (req, res, next) => {
    try {
        const token =  await req.headers.authorization;
        const decoded = jwt.verify(token, daylapassword);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.sendStatus(401);
    }
}