const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(
      token,
      "securesecuresecuresecuresecuresecuresecure"
    );
    console.log(decodedToken)
    req.userData = {
      email: decodedToken.email,
      userId: decodedToken.userId,
      role: decodedToken.user_roles,
    };
    req.userPermissions = { permissions: decodedToken.user_roles[0].permissions};
    next();
  } catch (error) {
    res.status(401).json({ message: "You are not authenticated!" });
  }
};
