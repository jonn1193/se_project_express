const router = require("express").Router();
const clothingItemsRouter = require("./clothingItems");
const usersRouter = require("./users");
const auth = require("../middlewares/auth");
const { createUser, login } = require("../controllers/users");
const {
  validateLogin,
  validateUserBody,
} = require("../middlewares/validation");
const NotFoundError = require("../utils/errors/not-found-error");

router.post("/signin", validateLogin, login);
router.post("/signup", validateUserBody, createUser);
router.use("/items", clothingItemsRouter);
router.use("/users", auth, usersRouter);
router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
