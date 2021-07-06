const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Account = require("../models/account");

const mongoose = require("mongoose");

//create User + account
exports.createUser = (req, res, next) => {
  let fetched_account_id;
  const user = new User({
    full_name: req.body.full_name,
    dob: req.body.dob,
    phone: req.body.phone,
    email: req.body.email,
    facebook: req.body.facebook,
    bank_account_number: req.body.bank_account_number,
    assigned_classes: req.body.assigned_classes,
    account_id: null,
  });

  let checkCollectionAccountExist = false;
  let checkCollectionUserExist = false;

  //check colletions account exists
  mongoose.connection.db
    .listCollections({ name: "accounts" })
    .next(async function (err, collectionInfo) {
      if (collectionInfo) {
        // The collection exists

        checkCollectionAccountExist = await true;

        console.log(collectionInfo);
      }
    });

  //check collections user exist
  mongoose.connection.db
    .listCollections({ name: "users" })
    .next(function (err, collectionInfo) {
      if (collectionInfo) {
        // The collection exists
        checkCollectionUserExist = true;

        console.log(collectionInfo);
      }
    });

  let checkUsernameExist = false;
  let checkEmailExist = false;
  setTimeout(() => {
    console.log(checkCollectionAccountExist);
    console.log(checkCollectionUserExist);

    //check email exist in user
    if (checkCollectionUserExist) {
      User.findOne({ email: req.body.email }).then((email) => {
        if (email) {
          checkEmailExist = true;
        }
      });
    }

    //check username exist in account
    if (checkCollectionAccountExist) {
      Account.findOne({ username: req.body.username }).then((account) => {
        if (account) {
          checkUsernameExist = true;
        }
      });
    }
  }, 300);

  setTimeout(() => {
    console.log(checkEmailExist);
    console.log(checkUsernameExist);
    if (checkUsernameExist === false && checkEmailExist === false) {
      bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
          const account = new Account({
            username: req.body.username,
            password: hash,
            user_roles: req.body.roles,
          });
          account
            .save()
            .then((result) => {
              fetched_account_id = result._id;
              res.status(201).json({
                message: "Account created!",
                result: result,
              });
            })
            .then(() => {
              user.account_id = fetched_account_id;
              user
                .save()
                .then((result) => {
                  res.status(201).json({
                    message: "User created!",
                  });
                })
                .catch((err) => {
                  res.status(500).json({
                    message: "User create fail !",
                    result: err,
                  });
                  console.log(err);
                });
            })
            .catch((err) => {
              res.status(500).json({
                message: "Account create fail !",
              });
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (checkUsernameExist || checkEmailExist) {
        res.status(409).json({
          message: "Username or email already created!",
        });
      }
    }
  }, 500);
};

exports.getUsers = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const UserQuery = User.find().populate({
    path: "account_id",
    populate: { path: "user_roles" },
  });

  if (pageSize && currentPage) {
    UserQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  let fetchedUser;
  UserQuery.then((documents) => {
    fetchedUser = documents;
    return User.count();
  })
    .then((count) => {
      res.status(200).json({
        message: "User fetched successfully!",
        user: fetchedUser,
        maxUser: count,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching User failed!",
      });
    });
};

exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .populate({ path: "account_id", populate: { path: "user_roles" } })
    .then((user_found) => {
      if (user_found) {
        res.status(200).json(user_found);
      } else {
        res.status(404).json({ message: "User not found!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching User failed!",
      });
    });
};

exports.updateUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user_found) => {
      if (user_found) {
        const userModel = new User({
          _id: req.params.id,
          full_name: req.body.full_name,
          dob: req.body.dob,
          phone: req.body.phone,
          email: req.body.email,
          facebook: req.body.facebook,
          bank_account_number: req.body.bank_account_number,
          assigned_classes: req.body.assigned_classes,
          account_id: req.body.account_id,
        });

        if (user_found.email === req.body.email) {
          User.updateOne({ _id: userModel._id }, userModel)
            .then((result) => {
              if (result.n > 0) {
                res.status(200).json({
                  message: "Update new class successfully",
                  updated_user: userModel,
                });
              } else {
                res.status(401).json({ message: "Not authorized!" });
              }
            })
            .catch((error) => {
              console.log(error);
              res.status(500).json({
                message: "Couldn't update User!",
              });
            });
        } else {
          User.findOne({ email: userModel.email }).then((result) => {
            if (result) {
              res.status(200).json({
                message: "email already exist !",
              });
            } else {
              User.updateOne({ _id: userModel._id }, userModel)
                .then((result) => {
                  if (result.n > 0) {
                    res.status(200).json({
                      message: "Update user successfully",
                      updated_user: userModel,
                    });
                  } else {
                    res.status(401).json({ message: "Not authorized!" });
                  }
                })
                .catch((error) => {
                  res.status(500).json({
                    message: "Couldn't update User!",
                  });
                });
            }
          });
        }
      } else {
        res.status(404).json({ message: "User not found!" });
      }
    })
    .catch((error) => {
      res.status(500).json({});
    });
};

exports.deleteUser = (req, res, next) => {
  User.deleteOne({ _id: req.params.id })
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
        message: "Deleting User failed!",
      });
    });
};
// exports.userLogin = (req, res, next) => {
//   let fetchedUser;
//   User.findOne({ username: req.body.username })
//     .then((user) => {
//       if (!user) {
//         return res.status(401).json({
//           message: "Auth failed",
//         });
//       }
//       fetchedUser = user;
//       return bcrypt.compare(req.body.password, user.password);
//     })
//     .then((result) => {
//       if (!result) {
//         return res.status(401).json({
//           message: "Auth failed",
//         });
//       }
//       //add more logic for admin_role
//       const token = jwt.sign(
//         { email: fetchedUser.email, userId: fetchedUser._id },
//         "securesecuresecuresecuresecuresecuresecure",
//         { expiresIn: "1h" }
//       );
//       res.status(200).json({
//         token: token,
//         expiresIn: 3600,
//         userId: fetchedUser._id,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       return res.status(401).json({
//         message: "Invalid authentication credentials!",
//       });
//     });
// };
