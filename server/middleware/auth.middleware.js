const { accessSecret } = require('../config/jwt.config');
const { verifyToken } = require('../utils/jwt-helpers');

module.exports = (req, res, next) => {
    // if(isTest) { // if running tests, set test user id and skip authentication
    //     req.auth = {
    //         id: '5fb9fe19f50e130570589732'
    //     }
    //     return next();
    // }
    const authHeader = req.headers['auth-token'] || req.headers['authorization'];
    const accessToken = authHeader ? authHeader.split(' ')[1] : false;
    if(!accessToken) return res.status(401).send({
        success: false,
        error: 'no token provided'
    });
    try {
        const auth = verifyToken(accessToken, accessSecret, req, res);
        req.auth = auth;
        next();
    }
    catch(err) {
        res.status(200).send({
            success: false,
            message: 'invalid token'
        });
    }
}