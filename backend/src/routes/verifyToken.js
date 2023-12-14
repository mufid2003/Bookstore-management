const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized - No token provided' });
  }

  const [bearer, token] = authHeader.split(' ');

  if (!bearer || !token || bearer.toLowerCase() !== 'bearer') {
    return res.status(401).json({ message: 'Unauthorized - Invalid Authorization header format' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden - Invalid token' });
    }

    req.user = decoded; // Attach the decoded user to the request
    next();
  });
};

module.exports = verifyToken;
