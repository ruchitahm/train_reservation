const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;


const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
  
    if (!token) return res.status(401).json({ message: "Access denied. No token provided." });
  
    try {
      const decoded = jwt.verify(token.split(" ")[1], JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(400).json({ message: "Invalid token" });
    }
  };
  
  module.exports = verifyToken;
  
