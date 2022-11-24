const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    // _id: {
    //     type: String
    // },
    subjectID: {
        type: String
    },
    name: {
        type: String,
    },
    credit: {
        type: Number,
        min: 1
    },
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: "Student",
        },
    ],
});

CourseSchema.pre("save", async function (next) {
    console.log("cb lu");
    next();
    console.log("LUu");
});

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
