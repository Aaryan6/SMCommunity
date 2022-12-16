import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) res.status(500).json("You are not authenticated!");

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) res.status(500).json(err);
    req.user = user;
    next();
  });
};
