const Role = require("../models/role");

exports.createRole = (req, res, next) => {
  const role = new Role({
    role_name: req.body.role_name,
    description: req.body.description,
    permissions: req.body.permissions,
  });
  Role.findOne({ role_name: req.body.role_name }).then((roleEntry) => {
    if (!roleEntry) {
      role.save().then((result) => {
        res.status(201).json({
          message: "Role created!",
          result: result,
        });
      });
    } else {
      res.status(201).json({
        message: "Role name already exist!",
      });
    }
  });
};

exports.getRoles = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const RoleQuery = Role.find();

  if (pageSize && currentPage) {
    RoleQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  let fetchedRole;
  RoleQuery.then((documents) => {
    fetchedRole = documents;
    return Role.count();
  })
    .then((count) => {
      res.status(200).json({
        message: "Role fetched successfully!",
        role: fetchedRole,
        maxRole: count,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching Role failed!",
      });
    });
};

exports.getRoleByName = (req, res, next) => {
  Role.findOne({role_name: req.params.role_name})
    .then((role_found) => {
      if (role_found) {
        res.status(200).json(role_found);
      } else {
        res.status(404).json({ message: "Role not found!" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Fetching Role failed!",
      });
    });
};

exports.getRoleById = (req, res, next) => {

  Role.findById(req.params.id)
    .then((role_found) => {
      if (role_found) {
        res.status(200).json(role_found);
      } else {
        res.status(404).json({ message: "Role not found!" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Fetching Role failed!",
      });
    });
};




exports.updateRole = (req, res, next) => {
  Role.findById(req.params.id)
    .then((role_found) => {
      if (role_found) {
        const roleModel = new Role({
          _id: req.params.id,
          role_name: req.body.role_name,
          description: req.body.description,
          permissions: req.body.permissions,
        });

        if (role_found.role_name === req.body.role_name) {
          Role.updateOne({ _id: roleModel._id }, roleModel)
            .then((result) => {
              if (result.n > 0) {
                res.status(200).json({
                  message: "Update role successfully",
                  updated_role: roleModel,
                });
              } else {
                res.status(401).json({ message: "Not authorized!" });
              }
            })
            .catch((error) => {
              console.log(error);
              res.status(500).json({
                message: "Couldn't update Role!",
              });
            });
        } else {
          Role.findOne({ role_name: roleModel.role_name }).then((result) => {
            if (result) {
              res.status(200).json({
                message: "role name already exist !",
              });
            } else {
              Role.updateOne({ _id: roleModel._id }, roleModel)
                .then((result) => {
                  if (result.n > 0) {
                    res.status(200).json({
                      message: "Update role successfully",
                      updated_role: roleModel,
                    });
                  } else {
                    res.status(401).json({ message: "Not authorized!" });
                  }
                })
                .catch((error) => {
                  res.status(500).json({
                    message: "Couldn't update Role!",
                  });
                });
            }
          });
        }
      } else {
        res.status(404).json({ message: "Role not found!" });
      }
    })
    .catch((error) => {
      res.status(500).json({});
    });
};

exports.deleteRole = (req, res, next) => {
  Role.deleteOne({ _id: req.params.id })
    .then((result) => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Deleting Role failed!",
      });
    });
};
