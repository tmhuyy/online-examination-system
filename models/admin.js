const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;
const AdminShema = new Schema({});

// automatically add a username and password
AdminShema.plugin(passportLocalMongoose);
const Admin = mongoose.model("Admin", AdminShema);

module.exports = Admin;
