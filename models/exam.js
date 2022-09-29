const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Student = require("./student")
const Course = require("./course")
const examSchema = new Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: Course
    },
    semester: Number,
    room: {
        type: String,
    },
    startTime: {
        type: Date
    },
    endTime: {
        type: Date,
    },
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: Student,

        }
    ],
});

const Exam = mongoose.model("Exam", examSchema);

module.exports = Exam;  