const router = require("express").Router();
const clothingItemsRouter = require("./clothingItems");
const usersRouter = require("./users");
const auth = require("../middlewares/auth");
const NotFoundError = require("../utils/errors/not-found-error");

router.use("/items", clothingItemsRouter);
router.use("/users", auth, usersRouter);
router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
