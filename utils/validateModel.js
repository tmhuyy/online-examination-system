const { studentSchema } = require("../schema");
const AppError = require("../utils/AppError");

// const validateCampground = (req, res, next) => {
//   const result = campgroundSchema.validate(req.body);
//   if (result.error) {
//     const [{ message }] = result.error.details;
//     throw new AppError(message, 400);
//   } else {
//     return next();
//   }
// };

// const validateReview = (req, res, next) => {
//   const result = reviewSchema.validate(req.body);
//   if (result.error) {
//     const [{ message }] = result.error.details;
//     throw new AppError(message, 400);
//   } else {
//     return next();
//   }
// };

const validateStudent = (req, res, next) => {
  const result = studentSchema.validate(req.body);
  if (result.error) {
    const [{ message }] = result.error.details;
    throw new AppError(message, 400);
  } else {
    return next();
  }
};

module.exports = { validateStudent}