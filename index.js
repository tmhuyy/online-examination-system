if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const localStrategy = require("passport-local");
const mongoSanitize = require("express-mongo-sanitize");

const mongoDB = "mongodb://localhost:27017/online-examination-system";
mongoose
  .connect(mongoDB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => console.log("CONNECTION MONGODB"))
  .catch((err) => console.log(err));

const app = express();
app.use(mongoSanitize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const store = MongoStore.create({
  mongoUrl: mongoDB,
  secret: process.env.SESSION_SECRET,
  touchAfter: 24 * 3600,
});

const configSession = {
  name: "session",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
  store,
};

app.use(session(configSession));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
// passport.use(new localStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

app.listen("8080", () => {
  console.log("SERVER IS RUNNING");
});
