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
    for (let i = 0; i <= 4; i++) {
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

const seedStudent = async function () {
    await Student.deleteMany();
    for (let i = 0; i <= studentDetail.length - 1; i++) {
        const username = studentDetail[i].username;
        const password = studentDetail[i].password;
        const email = studentDetail[i].email;
        const phoneNumber = studentDetail[i].phoneNumber;
        const courses = studentDetail[i].courses;
        const student = new Student({
            username,
            password,
            email,
            phoneNumber,
            courses
        });
        const newStudent = await Student.register(student, password);
    }
}

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

// Course.insertMany(
//     [{ name: "Calculus 2", _id: "MAIU02" },
//     { name: "Introdution To Computing", _id: "ITIT01"},
//     { name: "Calculus 3", _id: "MAIU02", },
//     { name: "Computer Network", _id: "ITIT02",  },
//     { name: "Physic 1", _id: "PHIU01", },
//     { name: "Software Enginnering", _id: "ITIT03", },
//     { name: "Operating System", _id: "ITIT04", },]
// ).then(() => console.log("success")).catch((err) => console.log(err))
// Student.deleteMany()'


seedStudent();
// seedDb();
// const random2 = Math.floor(Math.random() * 1);
// seedExam();
// console.log(random2);
