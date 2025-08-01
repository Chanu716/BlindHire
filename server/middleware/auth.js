const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'blindhire_secret';

function authenticateEmployer(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided.' });
    try {
        const decoded = jwt.verify(token, SECRET);
        if (decoded.role !== 'employer') return res.status(403).json({ error: 'Forbidden.' });
        req.employerId = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token.' });
    }
}

function authenticateAdmin(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided.' });
    try {
        const decoded = jwt.verify(token, SECRET);
        if (decoded.role !== 'admin') return res.status(403).json({ error: 'Forbidden.' });
        req.adminId = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token.' });
    }
}

module.exports = { authenticateEmployer, authenticateAdmin };
