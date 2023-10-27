const Post = require("../pkg/posts");
const { validate, postCreate, postUpdate } = require("../pkg/posts/validate");

// Create a new post
const createPost = async (data) => {
  try {
    await validate(data, postCreate);
    if (data.image) {
      // Handle image upload and storage here
    }
    const newPost = await Post.create(data);
    return newPost;
  } catch (err) {
    throw new Error("Failed to create a new post");
  }
};

// Retrieve all posts
const getAllPosts = async () => {
  try {
    const allPosts = await Post.find();
    return allPosts;
  } catch (err) {
    throw new Error("Failed to retrieve posts");
  }
};

// Update a post by ID
const updatePost = async (postId, data) => {
  try {
    await validate(data, postUpdate);
    const updatedPost = await Post.findByIdAndUpdate(postId, data, { new: true });
    if (!updatedPost) {
      throw new Error("Post not found");
    }
    return updatedPost;
  } catch (err) {
    throw new Error("Failed to update the post");
  }
};

// Remove a post by ID
const removePost = async (postId) => {
  try {
    await Post.findByIdAndDelete(postId);
  } catch (err) {
    throw new Error("Failed to remove the post");
  }
};

module.exports = {
  createPost,
  getAllPosts,
  updatePost,
  removePost,
};
