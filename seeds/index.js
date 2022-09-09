const mongoose = require("mongoose");
const Student = require("../models/student");
// const Exam = require("../models/exam");
// const Course = require("../models/course");

const studentDetail = require("./studentDatail");

const mongoDB = "mongodb://localhost:27017/online-examination-system";
mongoose
    .connect(mongoDB, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log("CONNECTION MONGODB"))
    .catch((err) => console.log(err));

const seedDb = async function () {
    // await Student.deleteMany();
    // for (let i = 0; i <= 20; i++){
    //     const username = studentDetail.username[i];
    //     const password = studentDetail.password[i];
    //     const email = studentDetail.email[i];
    //     const phoneNumber = studentDetail.phoneNumber[i];
    //     const student = new Student({
    //         username,
    //         password,
    //         email,
    //         phoneNumber
    //     })
    //     const newStudent = await Student.register(student, password);
    // }
    const students = await Student.find();
    console.log(students)
};

seedDb();
