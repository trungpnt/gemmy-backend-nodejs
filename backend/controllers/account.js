const Account = require("../models/account");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//temporary can not use
exports.createAccount = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const account = new Account({
        username: req.body.username,
        password: hash,
        user_id: "60dc71ca5a93973914544c38",
        user_roles: ["60e068f854973f1a58aee3a3"],
      });
      account
        .save()
        .then((result) => {
          res.status(201).json({
            message: "Account created!",
            result: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: "Account create fail !",
          });
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.loginAccount = (req, res, next) => {
  let fetchedAccount;
  Account.findOne({ username: req.body.username })
    .populate("user_roles")
    .then((account) => {
      if (!account) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      fetchedAccount = account;
      return bcrypt.compare(req.body.password, account.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      //add more logic for admin_role
      const token = jwt.sign(
        {
          email: fetchedAccount.email,
          userId: fetchedAccount._id,
          user_roles: fetchedAccount.user_roles,
        },
        "securesecuresecuresecuresecuresecuresecure",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        accountId: fetchedAccount._id,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json({
        message: "Invalid authentication credentials!",
      });
    });
};

// exports.createAccount = (req, res, next) => {

//     const account = new Account({
//         username: req.body.username,
//         password: req.body.password
//     });

//     account.findOne({ username: account.username })
//         .then(result => {
//             if (result) {
//                 res.status(200).json({ message: "The label with the same name already exists !" });
//             } else {
//                 label
//                     .save()
//                     .then(createdLabel => {
//                         res.status(201).json({
//                             message: "Label added successfully",
//                             label: {
//                                 id: createdLabel._id,
//                                 label_name: createdLabel.label_name
//                             }
//                         });
//                     })
//                     .catch(error => {
//                         res.status(500).json({
//                             message: "Creating a label failed!"
//                         });
//                     });
//             }
//         })
//         .catch(error => {
//             res.status(500).json({
//                 message: "Please check your inputs and try again!"
//             });
//         });

//     account
//         .save()
//         .then(createdAccount => {
//             res.status(201).json({
//                 message: "Account added successfully",
//                 account: {
//                     ...createdAccount,
//                     id: createdAccount._id
//                 }
//             });
//         })
//         .catch(error => {
//             res.status(500).json({
//                 message: "Creating a account failed!"
//             });
//         });
// };

exports.updateAccount = (req, res, next) => {
  const account = new Account({
    _id: req.body.id,
    username: req.body.username,
    password: req.body.content,
  });
  bcrypt
    .hash(req.body.password, 10)
    .then((result) => {
      account.password = result;
    })
    .then(() => {
      Account.updateOne({ _id: req.params.id }, account)
        .then((result) => {
          if (result.n > 0) {
            res.status(200).json({ message: "Update successful!" });
          } else {
            res.status(401).json({ message: "Not authorized!" });
          }
        })
        .catch((error) => {
          res.status(500).json({
            message: "Couldn't udpate account!",
          });
        });
    });
};

// exports.getAccounts = (req, res, next) => {
//     const pageSize = +req.query.pagesize;
//     const currentPage = +req.query.page;
//     const accountQuery = Account.find();

//     if (pageSize && currentPage) {
//         accountQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
//     }
//     let fetchedAccounts;
//     accountQuery
//         .then(documents => {
//             fetchedAccounts = documents;
//             return Account.count();
//         })
//         .then(count => {
//             res.status(200).json({
//                 message: "Accounts fetched successfully!",
//                 accounts: fetchedAccounts,
//                 maxAccounts: count
//             });
//         })
//         .catch(error => {
//             res.status(500).json({
//                 message: "Fetching accounts failed!"
//             });
//         });
// };

exports.getAccount = (req, res, next) => {
  Account.findById(req.params.id)
    .then((account) => {
      if (account) {
        res.status(200).json(account);
      } else {
        res.status(404).json({ message: "Account not found!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching account failed!",
      });
    });
};

exports.deleteAccount = (req, res, next) => {
  Account.deleteOne({ _id: req.params.id, creator: req.userData.userId })
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
        message: "Deleting accounts failed!",
      });
    });
};
