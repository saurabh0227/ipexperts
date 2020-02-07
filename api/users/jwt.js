const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWTSECRET ? process.env.JWTSECRET : "sdafsdsdfgfdjknjk"

exports.sign = user => {
    return jwt.sign({ uid: user.id }, jwtSecret, { expiresIn: '2h' });
}

exports.verify = (req, res, next) => {
    const rawToken = req.get('authorization')
    if (!rawToken) { return res.status(401).json('Invalid Request'); }
    const token = rawToken.split(' ')[1];
    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) { return res.status(401).json(err); }
        req.user = decoded.uid;
        next()
    });
}