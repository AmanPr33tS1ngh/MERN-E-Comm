import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT,
    {
      expiresIn: "30d",
    }
  );
};

export const isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT, (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Invalid token" });
      } else {
        req.user = decode;
        console.log("decodddeee", decode);
        next();
      }
    });
  } else {
    res.send({ success: false, msg: "Invalid Token" });
  }
};

export const isAdmin = (req, res, next) => {
  console.log("req", req.user);
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.send({ success: false, msg: "Invalid Admin Token" });
  }
};
