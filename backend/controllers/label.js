const Label = require("../models/label");
const objectMapper = require('object-mapper');
const merge = require('deepmerge')

exports.createLabel = (req, res, next) => {
    
    for(var i = 0; i < req.body.length; i++) {
        
        const label = new Label({
            label_name: req.body[i].label_name,
            description: req.body[i].description,
            //creator: req.userData.userId
        });
        
        Label.findOne({ label_name: label.label_name })
            .then(result => {   
                if (result) {
                    res.status(200).json({ message: "The label with the same name already exists !" });
                } else {
                    label
                        .save()
                        .then(createdLabel => {
                            res.status(201).json({
                                message: "Label added successfully",
                                label: {
                                    id: createdLabel._id,
                                    label_name: createdLabel.label_name
                                }
                            });
                        })
                        .catch(error => {
                            res.status(500).json({
                                message: "Creating a label failed!"
                            });
                        });
                }
            })
            .catch(error => {
                res.status(500).json({
                    message: "Please check your inputs and try again!"
                });
            });
    }

}

exports.updateLabel = (req, res, next) => {

    const label = new Label({
        _id: req.body.id,
        label_name: req.body.label_name,
        description: req.body.description,
    });
    Label.updateOne({ _id: req.params.id }, label)
        .then(result => {
            if (result.n > 0) {
                res.status(200).json({ message: "Update successful!" });
            } else {
                res.status(401).json({ message: "Not authorized!" });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Couldn't update label!"
            });
        });
};

exports.getLabels = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const labelQuery = Label.find();

    if (pageSize && currentPage) {
        labelQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    let fetchedLabels;
    labelQuery
        .then(documents => {
            fetchedLabels = documents;
            return Label.count();
        })
        .then(count => {
            res.status(200).json({
                message: "Labels fetched successfully!",
                labels: fetchedLabels,
                maxLabels: count
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching labels failed!"
            });
        });
};

exports.getLabel = (req, res, next) => {
    Label.findById(req.params.id)
        .then(label => {
            if (label) {
                res.status(200).json(label);
            } else {
                res.status(404).json({ message: "Label not found!" });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching label failed!"
            });
        });
};

exports.deleteLabel = (req, res, next) => {
    Label.deleteOne({ _id: req.params.id })
        .then(result => {
            console.log(result);
            if (result.n > 0) {
                res.status(200).json({ message: "Deletion successful!" });
            } else {
                res.status(401).json({ message: "Not authorized!" });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Deleting labels failed!"
            });
        });
};
