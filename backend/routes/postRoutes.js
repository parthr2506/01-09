const express = require("express");
const router = express.Router();

const isLoggedIn = require("../middlewares/isLoggedIn");
const { createPost, updatePost, deletePost, getAllPosts, getPostById } = require("../controllers/postController");

router.route("/post/create").post(isLoggedIn, createPost);
router.route("/post/update/:id").put(updatePost);
router.route("/post/delete/:id").delete(deletePost);
router.route("/post/get").get(getAllPosts);
router.route("/post/:id").get(getPostById);



module.exports = router;