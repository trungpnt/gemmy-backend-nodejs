const Role = require("../models/role");

exports.createRole=(req, res, next) => {
    const role = new Role({
        role_name:req.body.role_name,
        description:req.body.description,
        permissions:req.body.permissions
    })
    Role.findOne({ role_name: req.body.role_name }).then((roleEntry)=>{
        if(!roleEntry){
            role.save().then((result)=>{
                res.status(201).json({
                    message: "Role created!",
                    result: result,
                  });
            })
        }else{
            res.status(201).json({
                message: "Role name already exist!",
              });
        }
    })
}