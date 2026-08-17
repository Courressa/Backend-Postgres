export function adminMiddleware(req, res, next) {
    if (req.user?.type !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Admin access only' });
    }
    next();
}