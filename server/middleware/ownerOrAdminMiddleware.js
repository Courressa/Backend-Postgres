export function ownerOrAdminMiddleware(req, res, next) {
  const resourceId = req.params.id;

  if (!resourceId || isNaN(resourceId)) {
    return res.status(400).json({ message: 'A valid ID is required' });
  }

  const isOwner = req.user.type === 'customer' && String(req.user.id) === String(resourceId);
  const isAdmin = req.user.type === 'admin';

  if (!isOwner && !isAdmin) {
    return res.status(403).json({
      message: 'Forbidden: You do not have access to this resource'
    });
  }

  next();
}