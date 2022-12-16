import Post from "../models/Post.js";

export const getPosts = async (req, res) => {
  try {
    const isPost = await Post.find();
    res.status(200).json(isPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const addPost = async (req, res) => {
  const newPost = new Post({ ...req.body, userId: req.user.id });
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const isPost = await Post.findById(req.params.id);
    if (!isPost) res.status(500).json("Post not found!");

    if (req.user.id === isPost.userId) {
      await Post.findOneAndDelete(req.params.id);
    } else {
      res.json("You can't delete other's post.");
    }
    res.status(201).json("Post deleted.");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const like = async (req, res) => {
  try {
    const isPost = await Post.findById(req.params.id);
    if (!isPost) res.status(500).json("Post not found!");

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likes: req.user.id },
      },
      { new: true }
    );
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const dislike = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likes: req.user.id },
      },
      { new: true }
    );
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};
