const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Course = require("./course")
const Student = require("./student")
const RecordSchema = new Schema({
    studentID: {
        type: Schema.Types.ObjectId,
        ref: Student
    },
    courseID: {
        type: String,
        ref: Course
    },
    score: {
        type: Number,
    }
});

const Record = mongoose.model("Record", RecordSchema);

module.exports = Record;