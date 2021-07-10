const express = require("express");

const PostController = require("../controllers/posts");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");
const permit = require("../middleware/authorization");

const router = express.Router();

router.post("", checkAuth, extractFile,permit('post_write') ,PostController.createPost);

router.put("/:id", checkAuth, extractFile, PostController.updatePost);

router.get("",checkAuth , permit('post_read'), PostController.getPosts);

router.get("/:id",checkAuth , permit('post_read'), PostController.getPost);

router.delete("/:id", checkAuth, permit('post_write'),  PostController.deletePost);

module.exports = router;
