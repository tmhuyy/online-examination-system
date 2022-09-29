const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Student = require("./student")
const courseSchema = new Schema({
    name: {
        type: String,
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
