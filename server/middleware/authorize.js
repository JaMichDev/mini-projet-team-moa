const authorize = (...allowedRoles) => {
  const allowed = allowedRoles.map((r) => r.toLowerCase());

  return (req, res, next) => {
    const currentRole = (req.user?.role || '').toLowerCase();

    if (!req.user || !allowed.includes(currentRole)) {
      return res.status(403).json({ error: 'Accès refusé - permissions insuffisantes' });
    }
    next();
  };
};

module.exports = authorize;
