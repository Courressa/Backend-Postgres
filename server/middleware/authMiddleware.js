import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET;

export function authMiddleware(req, res, next) {
    try {
        if (!secretKey) {
            console.error('JWT_SECRET is not defined');
            return res.status(500).json({ message: 'Server configuration error' });
        }

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: Authentication token is required' });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: Authentication token is required' });
        }

        const decoded = jwt.verify(token, secretKey);

        // Attach user info to the request
        req.user = {
            id: decoded.id,
            type: decoded.type,        // "customer" or "admin"
            role: decoded.role || null // only for admins
        };

        next();
    } catch (error) {
        console.error('Authentication error:', error.message);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }

        return res.status(401).json({ message: 'Unauthorized' });
    }
}