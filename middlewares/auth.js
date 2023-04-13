const jwt = require('jsonwebtoken');
require('dotenv').config();
const fs = require('fs');
const { token: Token } = require("../models");

const errorResponse = (res, message, statusCode = 401) => {
    return res.status(statusCode).json({ message });
};

const auth = async (req, res, next) => {
    // Get the token from the request header
    const auth = req.header('Authorization');

    if (typeof auth === "undefined") {
        return errorResponse(res, `Authorization header missing`);
    }

    const authKey = auth.split(" ")[0];

    if (authKey !== 'Bearer') {

    }

    const token = auth.split(" ")[1];

    if (!token) {
        return errorResponse(res, `Token expired or invalid`);
    }

    try {
        const exist = await Token.findOne({ where: { token } });

        if (!exist) {
            return errorResponse(res, `Token expired or invalid`);
        }
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Add the decoded user object to the request object
        req.user = decoded;
        next();
    } catch (err) {
        return errorResponse(res, `Token expired or invalid`);
    }
};

module.exports = auth;