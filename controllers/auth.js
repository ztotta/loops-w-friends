var jwt = require('jsonwebtoken');

function isLoggedIn (req, res, next) {
    var token = req.body.token || req.params.token || req.query.token || req.cookies.token;
    if (!token) {
        res.status(403).json({ error: 'No token present in request' })
    }
    try {
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.token = decoded
        next()
    } catch(err) {
        res.status(403).json({ error: err })
    }
}

module.exports = {
	isLoggedIn: isLoggedIn
}