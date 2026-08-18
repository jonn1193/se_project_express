const ClothingItem = require("../models/clothingItem");
const BadRequestError = require("../utils/errors/bad-request-error");
const ForbiddenError = require("../utils/errors/forbidden-error");
const NotFoundError = require("../utils/errors/not-found-error");

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch(next);
};

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data passed to create item"));
      }

      return next(err);
    });
};

const deleteItem = (req, res, next) => {
  ClothingItem.findById(req.params.itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        return next(new ForbiddenError("You can only delete your own items"));
      }

      return item.deleteOne().then(() => res.send(item));
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID"));
      }

      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item not found"));
      }

      return next(err);
    });
};

const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID"));
      }

      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item not found"));
      }

      return next(err);
    });
};

const dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID"));
      }

      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item not found"));
      }

      return next(err);
    });
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
