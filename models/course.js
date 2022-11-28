const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Exam = require("./exam");
const Student = require("./student");
const CourseSchema = new Schema({
    // _id: {
    //     type: String
    // },
    subjectID: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        unique: true,
        required: true,
    },
    credit: {
        type: Number,
        min: 1,
    },
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },
    ],
});


CourseSchema.post("save", async function (course, next) {
    const exam = new Exam({
        course: course._id,
        students: course.students,
    });
    await exam.save();
    next();
});

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
