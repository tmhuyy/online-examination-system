const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Student = require("./student")
const Teacher = require("./teacher")

const courseSchema = new Schema({
    subjectCode: {
        type: String
    },
    name: {
        type: String,
    },
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: Student,
        },
    ],
    teacher: {
        type: Schema.Types.ObjectId,
        ref: Teacher
    }
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
