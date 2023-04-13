require('dotenv').config();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { token: Token } = require("../models");
const { MASTER_ID, MASTER_EMAIL, MASTER_PASSWORD, JWT_SECRET } = process.env;

const login = async (req, res) => {
    // Get the user credentials from the request body
    const { email, password, is_master } = req.body;

    let id = 0;

    if (is_master || false) {
        if (email !== MASTER_EMAIL || password !== MASTER_PASSWORD) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        id = parseInt(MASTER_ID);
    } else {
        if (email !== "user@erp.com" || password !== "secret") {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        id = 1;
    }

    const token = jwt.sign({ id, email }, JWT_SECRET, { expiresIn: '1d' });
    await Token.create({ token });
    return res.json({ token });
};

const me = ({ user }, res) => res.json(user);

const logout = async (req, res) => {

    try {
        const token = await Token.destroy({
            where: {
                token: req.header("authorization").split(" ")[1],
            },
        });
        if (token) {
            return res.json({ message: 'Logged out' });
        } else {
            return res.status(404).json({ message: "token not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Failed to retrieve data", error });
    }
};

module.exports = { login, me, logout };
