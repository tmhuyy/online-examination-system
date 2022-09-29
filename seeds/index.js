const mongoose = require("mongoose");
const Student = require("../models/student");
const Exam = require("../models/exam");
const Course = require("../models/course");

const studentDetail = require("./studentDatail");
const examDetail = require("./examDetail");

const mongoDB = "mongodb://localhost:27017/online-examination-system";
mongoose
    .connect(mongoDB, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log("CONNECTION MONGODB"))
    .catch((err) => console.log(err));

const seedDb = async function () {
    await Student.deleteMany();
    for (let i = 0; i <= 19; i++){
        const username = studentDetail.username[i];
        const password = studentDetail.password[i];
        const email = studentDetail.email[i];
        const phoneNumber = studentDetail.phoneNumber[i];
        const student = new Student({
            username,
            password,
            email,
            phoneNumber
        })
        const newStudent = await Student.register(student, password);
    }
    // const students = await Student.find();
    // console.log(students);
};

const seedCourse = async function () {
    // const students = await Student.find();

    await Course.deleteMany();
    for (let i = 0; i <= 5; i++) {
        // const randomNumber = Math.floor(Math.random() * students.length) // 0 -> 20
        // const studentStudiedCourse = []
        const name = examDetail.name[i];
        const course = new Course({
            name,
            students: [
                "63181cf9ea9fa13401de79cf",
                "63181cf9ea9fa13401de79d2",
                "63181cf9ea9fa13401de79b4",
                "63181cf8ea9fa13401de79ae"
            ],
        });
        await course.save();
    }

};

const seedExam = async function () {
    // await Exam.deleteMany();
    // for (let i = 0; i <= 5; i++) {
    //     const random2 = Math.floor(Math.random() * 1);
    //     const courses = await Course.find();
    //     // console.log(typeof courses[i]._id )
    //     const semester = examDetail.semester[random2];
    //     const endTime = examDetail.endTime[i];
    //     const startTime = examDetail.startTime[i];
    //     const room = examDetail.rooms[i];
    //     const course = courses[i]._id;
    //     const students = courses[i].students
    //     const exam = new Exam({
    //         semester,
    //         startTime,
    //         endTime,
    //         room,
    //         course,
    //         students
    //     })
    //     await exam.save();
    // }
    // const exams = await Exam.find();
    // const exam = exams[0].startTime.getTime();
    // const test = new Date("2022-10-18 08:30:00").getTime();
    // console.log(exam);
    // console.log(test);
}
// seedDb();
// seedCourse()
// const random2 = Math.floor(Math.random() * 1);
seedExam();
// console.log(random2);

