const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(400).json({ message: 'Token não informado' });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
        return res.status(400).json({ message: 'Token mal formatado' });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(400).json({ message: 'Token mal formatado' });
    }

    try {
        // ✅ CORRETO
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        return next();

    } catch (err) {
        return res.status(400).json({ message: 'Token inválido' });
    }
};