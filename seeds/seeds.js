const mongoose = require("mongoose");
const Student = require("../models/student");
const Exam = require("../models/exam");
const Course = require("../models/course");
const Teacher = require("../models/teacher")
const studentDetail = require("./studentDetail");
const examDetail = require("./examDetail");
const teacherDetail = require("./teacherDetail");
const courseDetail = require("./courseDetail");

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
    for (let i = 0; i <= 19; i++) {
        const username = studentDetail.username[i];
        const password = studentDetail.password[i];
        const email = studentDetail.email[i];
        const phoneNumber = studentDetail.phoneNumber[i];
        const student = new Student({
            username,
            password,
            email,
            phoneNumber,
        });
        const newStudent = await Student.register(student, password);
    }
    // const students = await Student.find();
    // console.log(students);
};

// const seedCourse = async function () {
//     const students = await Student.find();

//     await Course.deleteMany();
//     const studentStudiedCourse = [];
//     for (let i = 0; i <= 4; i++) {
//         studentStudiedCourse.push(students[i]._id);
//     }

//     for (let i = 0; i <= 5; i++) {
//         const name = examDetail.name[i];
//         const course = new Course({
//             name,
//             students: studentStudiedCourse,
//         });
//         await course.save();
//     }
// };

// const seedExam = async function () {
//     await Exam.deleteMany();
//     for (let i = 0; i <= 5; i++) {
//         const random2 = Math.round(Math.random());
//         const courses = await Course.find();
//         // console.log(typeof courses[i]._id )
//         const semester = examDetail.semester[random2];
//         const endTime = examDetail.endTime[i];
//         const startTime = examDetail.startTime[i];
//         const room = examDetail.rooms[i];
//         const course = courses[i]._id;
//         const students = courses[i].students;
//         const exam = new Exam({
//             semester,
//             startTime,
//             endTime,
//             room,
//             course,
//             students,
//         });
//         await exam.save();
//     }
//     // const exams = await Exam.find();
//     // const exam = exams[0].startTime.getTime();
//     // const test = new Date("2022-10-18 08:30:00").getTime();
//     // console.log(exam);
//     // console.log(test);
// };
const seedTeacher = async function () {
    await Teacher.deleteMany();
    for (let i = 0; i <= 5; i++) {
        const name = teacherDetail.name[i];
        const email = teacherDetail.email[i];
        const phoneNumber = teacherDetail.phoneNumber[i];
        const teacher = new Teacher({
            name,
            email,
            phoneNumber,
        });
        await teacher.save()
    }
};

Course.insertMany(
    [{ name: "Calculus 2", teacher: "6374682ea1eb939fdfdf503a" },
    { name: "Introdution To Computing", teacher: "6374682ea1eb939fdfdf503a" },
    { name: "Calculus 3", teacher: "6374682fa1eb939fdfdf503f"},
    { name: "Computer Network", teacher: "6374682fa1eb939fdfdf5041" },
    { name: "Physic 1", teacher: "6374682fa1eb939fdfdf5043" },
    { name: "Software Enginnering", teacher: "6374682fa1eb939fdfdf5045" },
        { name: "Operating System", teacher: "6374682fa1eb939fdfdf5047" },]
).then(() => console.log("success")).catch((err) => console.log(err))

// seedTeacher();
// console.log(teacherDetail)
seedDb();
// const random2 = Math.floor(Math.random() * 1);
// seedExam();
// console.log(random2);
