const jwt = require("jsonwebtoken");
const jwtConfig = require("../jwt-config");

// store for refresh tokens
let refreshTokens = [];

const generateAccessToken = (id, expiresIn) => jwt.sign({ id }, jwtConfig.accessSecret, expiresIn);
const generateRefreshToken = (id, expiresIn) => jwt.sign({ id }, jwtConfig.refreshSecret, expiresIn);

const verifyToken = (token, secret, req, res) => {
    let verified = false;
    try {
        verified = jwt.verify(token, secret);
    }
    catch(err) {
        throw err;
    }
    return verified;
}

const logout = (req, res) => {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter((token) => token != refreshToken);
    res.json({
        success: true,
        message: "logout successful"
    });
}

module.exports = {
    refreshTokens,
    logout,
    generateAccessToken,
    generateRefreshToken,
    verifyToken
}