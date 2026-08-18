const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  validateItemBody,
  validateItemId,
} = require("../middlewares/validation");
const {
  createItem,
  deleteItem,
  dislikeItem,
  getItems,
  likeItem,
} = require("../controllers/clothingItems");

router.get("/", getItems);

router.use(auth);

router.post("/", validateItemBody, createItem);
router.delete("/:itemId", validateItemId, deleteItem);
router.put("/:itemId/likes", validateItemId, likeItem);
router.delete("/:itemId/likes", validateItemId, dislikeItem);

module.exports = router;
