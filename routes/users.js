const router = require("express").Router();
const { createUser, getUser, getUsers } = require("../controllers/users");

router.get("/", getUsers);
router.get("/:userId", getUser);
router.post("/", createUser);

module.exports = router;
