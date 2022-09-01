const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose")
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

// automatically add a username and password
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);

module.exports = User;  