const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;
const Course = require("./course")
const studentShema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    courses: [
        {
            type: Schema.Types.ObjectId,
            ref: "Course",
        },
    ],
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// automatically add a username and password
studentShema.plugin(passportLocalMongoose);
const Student = mongoose.model("Student", studentShema);

module.exports = Student;
