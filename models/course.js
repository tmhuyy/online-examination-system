const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Student = require("./student")
const Teacher = require("./teacher")

const courseSchema = new Schema({
    _id: {
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
            ref: Student,
        },
    ],
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
