const { celebrate, Joi } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }

  return helpers.error("string.uri");
};

const validateObjectId = (value, helpers) => {
  if (/^[a-fA-F0-9]{24}$/.test(value)) {
    return value;
  }

  return helpers.error("string.hex");
};

const nameSchema = Joi.string().min(2).max(30).messages({
  "string.min": 'The minimum length of the "name" field is 2',
  "string.max": 'The maximum length of the "name" field is 30',
  "string.empty": 'The "name" field must be filled in',
});

const avatarSchema = Joi.string().required().custom(validateURL).messages({
  "string.empty": 'The "avatar" field must be filled in',
  "string.uri": 'The "avatar" field must be a valid url',
});

const emailSchema = Joi.string().required().email().messages({
  "string.empty": 'The "email" field must be filled in',
  "string.email": 'The "email" field must be a valid email',
});

const passwordSchema = Joi.string().required().messages({
  "string.empty": 'The "password" field must be filled in',
});

module.exports.validateItemBody = celebrate({
  body: Joi.object().keys({
    name: nameSchema.required(),
    weather: Joi.string().required().valid("hot", "warm", "cold").messages({
      "any.only": 'The "weather" field must be hot, warm, or cold',
      "string.empty": 'The "weather" field must be filled in',
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'The "imageUrl" field must be a valid url',
    }),
  }),
});

module.exports.validateUserBody = celebrate({
  body: Joi.object().keys({
    name: nameSchema.required(),
    avatar: avatarSchema,
    email: emailSchema,
    password: passwordSchema,
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: emailSchema,
    password: passwordSchema,
  }),
});

module.exports.validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: nameSchema.required(),
    avatar: avatarSchema,
  }),
});

module.exports.validateItemId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().required().custom(validateObjectId).messages({
      "string.empty": 'The "itemId" parameter must be filled in',
      "string.hex":
        'The "itemId" parameter must be a 24-character hexadecimal string',
    }),
  }),
});

module.exports.validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().custom(validateObjectId).messages({
      "string.empty": 'The "userId" parameter must be filled in',
      "string.hex":
        'The "userId" parameter must be a 24-character hexadecimal string',
    }),
  }),
});
