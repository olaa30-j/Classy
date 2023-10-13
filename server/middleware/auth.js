import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");

        if (!token) {
            return res.sendStatus(403);
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;

        console.log(verified)
        next();
    } catch (error) {
        res.status(500).json({ error: "There was a problem with the user token", message: error.message });
    }
};
