const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(
      token,
      "securesecuresecuresecuresecuresecuresecure"
    );
    console.log("In check-auth.js file");
    console.log(decodedToken);
    // req.userData = {
    //   email: decodedToken.email,
    //   userId: decodedToken.userId,
    //   role: decodedToken.user_roles,
    // };

    

    //check if user have multiple role ??
    if (decodedToken.user_roles.length === 1) {
      req.userPermissions = {
        permissions: decodedToken.user_roles[0].permissions,
      };
      req.user_role = decodedToken.user_roles[0].role_name;
    } else if (decodedToken.user_roles.length > 1) {
      console.log(222222222222)
      const permissionsSet = new Set();
      const user_role = [];
      for (let i = 0; i < decodedToken.user_roles.length; i++) {
        decodedToken.user_roles[i].permissions.forEach((element) => {
          permissionsSet.add(element);
        });
        user_role.push(decodedToken.user_roles[i].role_name);
      }
      const arrReq = Array.from(permissionsSet);
      req.userPermissions = arrReq;
      req.user_role = user_role;
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "You are not authenticated!" });
  }
};
