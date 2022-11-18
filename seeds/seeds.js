const mongoose = require("mongoose");
const Student = require("../models/student");
const Exam = require("../models/exam");
const Course = require("../models/course");
const Teacher = require("../models/teacher");
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
            courses,
        });
        const newStudent = await Student.register(student, password);
    }
};

const seedCourse = async function () {
    const studentList = await Student.find();
    await Course.deleteMany();
    
    for (let i = 0; i <= courseDetail.length - 1; i++) {
        let students = [];
        const _id = courseDetail[i]._id;
        const name = courseDetail[i].name;

        for (let j = 0; j <= (studentList.length - 1); j++) {
            
            if (studentList[j].courses.includes(_id)) {
                console.log("hello")
                students.push(studentList[j]._id);
            } else {
                console.log("hi")
            }
        }

        const course = new Course({
            name,
            _id,
            students,
        });
        await course.save();
    }
};

const seedExam = async function () {
    const courseList = await Course.find();
    await Exam.deleteMany();
    for (let i = 0; i <= examDetail.length - 1; i++) {
        const endTime = examDetail[i].endTime;
        const startTime = examDetail[i].startTime;
        const room = examDetail[i].room;
        const course = examDetail[i].course;
        const students = courseList.filter((e) => e._id === course)[0].students;

        const exam = new Exam({
            startTime,
            endTime,
            room,
            course,
            students,
        });
        await exam.save();
    }
    // const exams = await Exam.find();
    // const exam = exams[0].startTime.getTime();
    // const test = new Date("2022-10-18 08:30:00").getTime();
    // console.log(exam);
    // console.log(test);
};
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
        await teacher.save();
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

// seedCourse();

// seedStudent();
// seedDb();
// const random2 = Math.floor(Math.random() * 1);
seedExam();
// console.log(random2);
