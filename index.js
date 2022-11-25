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
const engine = require("ejs-mate");
const path = require("path");
const bodyParser = require("body-parser");

const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
const AdminJSMongoose = require("@adminjs/mongoose");

// const Student = require("./models/student");
const AppError = require("./utils/AppError");
const Student = require("./models/student");
const Admin = require("./models/admin");
const Exam = require("./models/exam");
const Course = require("./models/course");
const Record = require("./models/record");

const studentRoutes = require("./routes/studentRoutes");
const examRoutes = require("./routes/examRoutes");
const app = express();

AdminJS.registerAdapter(AdminJSMongoose);

const isValidExamDate = function (initExam, newExam) {
    if (Date.parse(newExam.startTime) < initExam.startTime.getTime()) {
        if (Date.parse(newExam.endTime) > initExam.startTime.getTime()) {
            return false;
        } else {
            return true;
        }
    } else if (Date.parse(newExam.startTime) > initExam.startTime.getTime()) {
        if (Date.parse(newExam.startTime) < initExam.endTime.getTime()) {
            return false;
        } else {
            return true;
        }
    }
};

// Very basic configuration of AdminJS.
const adminJs = new AdminJS({
    resources: [
        {
            resource: Admin,
            features: [],
            options: {
                // or you can provide an object with your custom resource options
                properties: {
                    password: {
                        isVisible: false,
                    },
                    _id: {
                        isTitle: true,
                    },
                },
                actions: {
                    new: {
                        isVisible: false,
                    },
                    delete: {
                        isVisible: false,
                    },
                    edit: {
                        isAccessible: (context) => {
                            const { record, currentAdmin } = context;

                            // We are only allowing to edit records created by currently logged in user
                            return (
                                record?.params?.createdByUserId ===
                                currentAdmin.id
                            );
                        },
                        isVisible: true,
                    },
                },
            },
        },
        {
            resource: Student,
            options: {
                properties: {
                    password: {
                        isVisible: {
                            list: false,
                            edit: true,
                            filter: false,
                            show: false,
                        },
                    },
                    _id: {
                        isTitle: true,
                    },
                    courses: {
                        isVisible: false,
                    },
                },
            },
        },
        {
            resource: Course,
        },
        {
            resource: Exam,
            options: {
                actions: {
                    new: {
                        before: async (request) => {
                            const exams = await Exam.find();
                            const newExam = request?.payload;
                            if (exams) {
                                for (let exam of exams) {
                                    if (isValidExamDate(exam, newExam)) {
                                        return request;
                                    } else {
                                        console.log(
                                            "OH Boy!!! Overlap Exam Time"
                                        );
                                        return;
                                    }
                                }
                                return request;
                            } else {
                                return request;
                            }
                            // return request
                        },
                    },
                },
            },
        },
        {
            resource: Record,
        },
    ],
    databases: [], // We don’t have any resources connected yet.
    // Path to the AdminJS dashboard.
});

const router = AdminJSExpress.buildAuthenticatedRouter(
    adminJs,
    {
        cookieName: "adminjs",
        cookiePassword: "complicatedsecurepassword",
        // validation
        authenticate: async (email, password) => {
            const admin = await Admin.findAndValidate(email, password);
            if (admin) {
                return admin;
            }
            return false;
        },
    },
    null,
    // Add configuration required by the express-session plugin.
    {
        resave: false,
        saveUninitialized: true,
    }
);
app.use(adminJs.options.rootPath, router);

const mongoDB =
    "mongodb+srv://minhhuy123:Tuilahuy123@cluster0.tpopnup.mongodb.net/onlineExamSystem?retryWrites=true&w=majority";
mongoose
    .connect(mongoDB, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
    })
    .then(() => console.log("CONNECTION MONGODB"))
    .catch((err) => console.log(err));

app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(mongoSanitize());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

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

// comment to change the way to register and login student
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new localStrategy(Student.authenticate()));
// passport.serializeUser(Student.serializeUser());
// passport.deserializeUser(Student.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.student = req.session.student;
    next();
});

app.use("/", studentRoutes);
app.use("/", examRoutes);

app.get("/blogs", (req, res) => {
    res.render("blogs/blog-list-3");
});

// app.get("/admin", (req, res) => {
//   res.render("admin/index")
// })

app.get("/", (req, res) => {
    res.render("index");
});

// TODO ERROR ROUTES
app.all("*", (req, res, next) => {
    next(new AppError("PAGE NOT FOUND", 404));
});

// TODO custom error hanlding middleware
app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong", name } = err;
    res.render("error", { status, message, name });
});

app.listen("5050", () => {
    console.log("SERVER IS RUNNING");
});
