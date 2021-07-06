module.exports = (...permittedPermissions) => {
  return (req, res, next) => {
    const { permissions } = req.userPermissions;
    console.log(permittedPermissions + "..........");
    console.log(permissions);
    const permittedPermissionsConverted = Object.values(permittedPermissions);
    console.log(permittedPermissionsConverted);

    let flag = false;
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
  };
};
