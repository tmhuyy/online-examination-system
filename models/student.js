const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const StudentSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
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
});

StudentSchema.statics.findAndValidate = async function (username, password) {
    const student = await this.findOne({ username });
    if (student) {
        const isValid = await bcrypt.compare(password, student.password);
        return isValid ? student : false;
    }
    return false;
};

StudentSchema.pre("save", async function (next) {
    // neu password duoc sua doi
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        return next();
    }
    return next();
});

// automatically add a username and password
const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
