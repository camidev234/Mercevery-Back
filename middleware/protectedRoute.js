import jwt from "jsonwebtoken";

// Middleware function to authenticate the token
const authenticateToken = (req, res, next) => {
  // Extract the authorization header from the request
  const authHeader = req.headers["authorization"];
  console.log("Authorization Header:", authHeader);

  // If the authorization header is missing, return a 401 error
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  // Extract the token from the authorization header
  const token = authHeader.split(" ")[1];
  console.log("Token:", token);

  // If the token is missing, return a 401 error
  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  // Verify the token using the secret key
  jwt.verify(token, "mysecretkey123", (err, user) => {
    // If there is an error in verifying the token
    if (err) {
      // If the token has expired, return a 401 error with a specific message
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Your Token has expired' });
      }
      // For other errors, return a 403 error indicating the token is invalid
      return res.status(403).json({ error: 'Invalid token' });
    }
    // If the token is valid, attach the decoded user information to the request object
    req.user = user;
    // Pass control to the next middleware or route handler
    next();
  });
};

export default authenticateToken;
