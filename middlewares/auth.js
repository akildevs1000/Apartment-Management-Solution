const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
    // Get the token from the request header
    const auth = req.header('Authorization');

    if (typeof auth === "undefined") {
        return res.status(401).json({ msg: 'Authorization header missing' });
    }

    const authKey = auth.split(" ")[0];

    if (authKey !== 'Bearer') {
        return res.status(401).json({ msg: 'Bearer key missing' });

    }

    const token = auth.split(" ")[1];

    if (!token) {
        return res.status(401).json({ msg: 'No token found, authorization denied' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Add the decoded user object to the request object
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = auth;