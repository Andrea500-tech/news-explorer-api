const Article = require("../models/article");
const {
  NotFoundError,
  BadRequestError,
  ForbiddenError,
} = require("../utils/errors");

// Get all saved articles for the current logged-in user
const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send(articles))
    .catch(next);
};

// Create / Save a new article (Bookmark button)
const createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.status(201).send(article))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};

// Delete a saved article by ID (Delete button)
const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;

  Article.findById(articleId)
    .select("+owner")
    .then((article) => {
      if (!article) {
        throw new NotFoundError("Article not found");
      }
      //  Ensure both sides are strings for safe comparison
      if (article.owner.toString() !== String(req.user._id)) {
        throw new ForbiddenError(
          "You cannot delete an article saved by another user",
        );
      }
      return Article.findByIdAndDelete(articleId).then(() =>
        res.send({ message: "Article successfully deleted" }),
      );
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid article ID format"));
      }
      return next(err);
    });
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
