const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Course = require("./course")
const TeacherSchema = new Schema({
    name: {
        type: String,
    },
    course: [
        {
            type: Schema.Types.ObjectId,
            ref: Course,
        },
    ],
    email: {
        type: String
    }, 
    phoneNumber: {
        type: String
    }
});

const Teacher = mongoose.model("Teacher", TeacherSchema);

module.exports = Teacher;
