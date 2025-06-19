import express from 'express';
const router = express.Router();

// Login - just returns a hardcoded token
router.post('/login', (req, res) => {
  const { password } = req.body;
  
  if (password === process.env.ADMIN_PASSWORD) {
    res.json({ token: process.env.ADMIN_SECRET });
  } else {
    res.status(401).json({ error: 'Wrong password' });
  }
});

export default router;