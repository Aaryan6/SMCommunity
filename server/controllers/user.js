import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const result = await User.findById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteUser = async (req, res) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(500).json("User deleted successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(500).json("You can change only your account");
  }
};

export const updateUser = async (req, res) => {
  if (req.params.id === req.user.id) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(500).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

export const follow = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.body.userId,
      {
        $addToSet: { followings: req.params.id },
      },
      { new: true }
    );
    await User.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { followers: req.body.userId },
      },
      { new: true }
    );
    res.status(200).json(req.body.userId + " follow to " + req.params.id);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const unfollow = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.body.userId,
      {
        $pull: { followings: req.params.id },
      },
      { new: true }
    );
    await User.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { followers: req.body.userId },
      },
      { new: true }
    );
    res.status(200).json(req.body.userId + " unfollow to " + req.params.id);
  } catch (error) {
    res.status(500).json(error);
  }
};
