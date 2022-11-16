const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

// customize extention to validate the entered HTMl
const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});
const Joi = BaseJoi.extend(extension);

// const campgroundSchema = Joi.object({
//   campground: Joi.object({
//     title: Joi.string().required().escapeHTML(),
//     price: Joi.number().required().min(0),
//     // images: Joi.array().required(),
//     description: Joi.string().required().escapeHTML(),
//     location: Joi.string().required().escapeHTML(),
//   }).required(),
//   deleteImages: Joi.array()
// });

// const reviewSchema = Joi.object({
//   review: Joi.object({
//     body: Joi.string().required().escapeHTML(),
//     rating: Joi.number().required().min(1).max(5)
//   }).required(),
// });

const studentSchema = Joi.object({
  student: Joi.object({
    email: Joi.string().required().escapeHTML(),
    username: Joi.string().required().escapeHTML(),
    password: Joi.string().required().escapeHTML(),
    // rating: Joi.number().required().min(1).max(5)
  }).required(),
});

module.exports = {  studentSchema };
