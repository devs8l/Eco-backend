export const checkAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1] || req.query.token;
  
  // Super simple token check (in production use JWT)
  if (token === process.env.ADMIN_SECRET) {
    req.isAdmin = true;
    next();
  } else {
    res.status(401).json({ error: 'Access denied' });
  }
};