module.exports = (...permittedPermissions) => {
  return (req, res, next) => {
    const { permissions } = req.userPermissions;
    console.log(permissions);
    const permittedPermissionsConverted = Object.values(permittedPermissions);
    console.log(permittedPermissionsConverted);

    let flag = false;

    const role_name = req.user_role;

    console.log("In authorization file ------");
    console.log(typeof req.user_role);

    if (role_name === "super_admin") {
      console.log(1111111)
      next();
    } else {
      for (let i = 0; i < permittedPermissionsConverted.length; i++) {
        if (permissions.includes(permittedPermissionsConverted[i])) {
          flag = true;
        } else {
          flag = false;
          break;
        }
      }

      if (flag === true) {
        next();
      } else {
        res.status(401).json({
          message: "Forbidden",
        });
      }
    }
  };
};
