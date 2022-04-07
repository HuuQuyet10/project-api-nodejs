import jwt from "jsonwebtoken";

export const checkMiddleware = async (req, res, next) => {
    try {
        const token =  await req.headers.authorization;
        const decoded = jwt.verify(token, process.env.KEY_SECURITY);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.sendStatus(401);
    }
}