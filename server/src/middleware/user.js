const jwt = require("jsonwebtoken");

async function userMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(404).json({ error: "Empty Token" });
    }

    const token = authHeader.split(" ")[1];

    const isValidToken = jwt.verify(token, process.env.JWT_SECRET);
    if (isValidToken) {
      req.userdata = isValidToken;
      next();
    } else {
      return res.status(404).json({ error: "You are an Unauthenticated User" });
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = userMiddleware;
