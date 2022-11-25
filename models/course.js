const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    // _id: {
    //     type: String
    // },
    subjectID: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    credit: {
        type: Number,
        min: 1
    },
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: "Student",
            required: true
        },
    ],
});

CourseSchema.post("save", async function (course, next) {
    console.log(course._id);
    // next();
    // console.log("LUu");
});

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
