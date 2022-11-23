const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const AdminSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

AdminSchema.statics.findAndValidate = async function (email, password) {
  const admin = await this.findOne({ email });
  if (admin) {
    const isValid = await bcrypt.compare(password, admin.password);
    return isValid ? admin : false;
  }
  return false;
};

AdminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    return next();
  }
  return next();
});
const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
