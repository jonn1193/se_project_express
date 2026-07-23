const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const {
  BAD_REQUEST,
  CONFLICT,
  NOT_FOUND,
  SERVER_ERROR,
  UNAUTHORIZED,
} = require("../utils/errors");

const handleServerError = (res) =>
  res
    .status(SERVER_ERROR)
    .send({ message: "An error has occurred on the server" });

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  if (!password) {
    return res
      .status(BAD_REQUEST)
      .send({ message: "Invalid data passed to create user" });
  }

  return bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) => {
      const userObject = user.toObject();
      delete userObject.password;
      return res.status(201).send(userObject);
    })
    .catch((err) => {
      console.error(err);

      if (err.code === 11000) {
        return res.status(CONFLICT).send({ message: "Email already exists" });
      }

      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid data passed to create user" });
      }

      return handleServerError(res);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.send({ token });
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(UNAUTHORIZED)
        .send({ message: "Incorrect email or password" });
    });
};

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);

      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid user ID" });
      }

      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }

      return handleServerError(res);
    });
};

const updateCurrentUser = (req, res) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);

      if (err.name === "CastError" || err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid data passed to update user" });
      }

      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "User not found" });
      }

      return handleServerError(res);
    });
};

module.exports = {
  createUser,
  getCurrentUser,
  login,
  updateCurrentUser,
};
