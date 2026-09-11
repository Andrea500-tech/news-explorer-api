// middlewares/validation.js
const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

// Custom URL validator
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

// User creation (signup) validation
module.exports.validateUserBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string().min(8).required().messages({
      "string.min": 'The minimum length of the "password" field is 8',
      "string.empty": 'The "password" field must be filled in',
    }),
    name: Joi.string().min(2).max(30).required().messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
  }),
});

// Login validation
module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

// Article body validation (Saving an article)
module.exports.validateArticleBody = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().messages({
      "string.empty": 'The "keyword" field must be filled in',
    }),
    title: Joi.string().required().messages({
      "string.empty": 'The "title" field must be filled in',
    }),
    text: Joi.string().required().messages({
      "string.empty": 'The "text" field must be filled in',
    }),
    date: Joi.string().required().messages({
      "string.empty": 'The "date" field must be filled in',
    }),
    source: Joi.string().required().messages({
      "string.empty": 'The "source" field must be filled in',
    }),
    link: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "link" field must be filled in',
      "string.uri": 'The "link" field must be a valid url',
    }),
    image: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "image" field must be filled in',
      "string.uri": 'The "image" field must be a valid url',
    }),
  }),
});

// Article ID validation (Deleting an article)
module.exports.validateArticleId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24).required().messages({
      "string.hex": 'The "articleId" must be a valid hex string',
      "string.length": 'The "articleId" length must be 24 characters',
      "string.empty": 'The "articleId" field must be filled in',
    }),
  }),
});
