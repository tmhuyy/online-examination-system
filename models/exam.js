const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const examSchema = new Schema({
    course: Schema.Types.ObjectId,
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