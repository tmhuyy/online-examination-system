const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExamSchema = new Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    semester: {
        type: Number,
        enum: [1, 2],
    },
    room: {
        type: String,
        unique: true,
        // required: true
    },
    startTime: {
        type: Date,
        unique: true,
    },
    endTime: {
        type: Date,
        unique: true,
    },
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },
    ],
});

// ExamSchema.pre("save", async function (next) {});

const Exam = mongoose.model("Exam", ExamSchema);

module.exports = Exam;
