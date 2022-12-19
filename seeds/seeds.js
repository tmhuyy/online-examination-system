const mongoose = require("mongoose");
const Student = require("../models/student");
const Exam = require("../models/exam");
const Course = require("../models/course");
const Record = require("../models/record");
const Admin = require("../models/admin");

const studentDetail = require("./studentDetail");
const examDetail = require("./examDetail");
const courseDetail = require("./courseDetail");
const recordDetail = require("./recordDetail");

const mongoDB =
    "mongodb+srv://minhhuy123:Tuilahuy123@cluster0.tpopnup.mongodb.net/onlineExamSystem?retryWrites=true&w=majority";
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

    // for (let i = 0; i <= courseDetail.length - 1; i++) {
    //     let students = [];
    //     const _id = courseDetail[i]._id;
    //     const name = courseDetail[i].name;
    //     const credit = courseDetail[i].credit;
    //     for (let j = 0; j <= studentList.length - 1; j++) {
    //         if (studentList[j].courses.includes(_id)) {
    //             console.log("hello");
    //             students.push(studentList[j]._id);
    //         } else {
    //             console.log("hi");
    //         }
    //     }

    //     const course = new Course({
    //         name,
    //         _id,
    //         credit,
    //         students,
    //     });
    //     await course.save();
    // }
};

const seedExam = async function () {
    const courseList = await Course.find();
    await Exam.deleteMany();
    // for (let i = 0; i <= examDetail.length - 1; i++) {
    //     const endTime = examDetail[i].endTime;
    //     const startTime = examDetail[i].startTime;
    //     const room = examDetail[i].room;
    //     const course = examDetail[i].course;
    //     const students = courseList.filter((e) => e._id === course)[0].students;
    //     // const score = Math.floor(Math.random() * 101);
    //     const exam = new Exam({
    //         startTime,
    //         endTime,
    //         room,
    //         course,
    //         students,
    //         // score
    //     });
    //     await exam.save();
    // }
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

const seedRecord = async function () {
    await Record.deleteMany();
    for (let i = 0; i <= recordDetail.length - 1; i++) {
        const studentID = recordDetail[i].studentID;
        const courseID = recordDetail[i].courseID;
        const score = recordDetail[i].score;
        const record = new Record({
            studentID,
            courseID,
            score,
        });
        await record.save();
        // console.log(recordDetail[i])
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
const addnew = async () => {
    const student = new Student({
        email: "admin123@gmail.com",
        username: "tumap123",
        phoneNumber: "0793526726",
    });
    const password = "tu123";
    const newStudent = await Student.register(student, password);
};
// seedStudent();
// seedDb();
// const random2 = Math.floor(Math.random() * 1);
// seedExam();
// seedRecord();
const addAdmin = async () => {
    const admin = new Admin({
        email: "admin123@gmail.com",
        username: "admin123",
        password: "admin123",
    });
    // const password = "admin123";

    const newAdmin = new Admin(admin);
    await newAdmin.save();
};
// addAdmin()

// const newExam = async () => {
//     const exam = new Exam({
//         course: "6380cc4dbafbc7e424b382b9",
//         semester: 1,
//         room: "A2.002",
//         students: ["6380cadbbafbc7e424b38234"],
//     });
//     await exam.save();
// };



// const isValidExamDate = function (initExam, newExam) {
//     if (newExam.startTime.getTime() < initExam.startTime.getTime()) {
//         if (newExam.endTime.getTime() > initExam.startTime.getTime()) {
//             return 0;
//         } else {
//             return 1;
//         }
//     } else if (newExam.startTime.getTime() > initExam.startTime.getTime()) {
//         if (newExam.startTime.getTime() < initExam.endTime.getTime()) {
//             return 0;
//         } else {
//             return 1;
//         }
//     }
// };

const exam = {
    name: "pdm",
    startTime: new Date("2022-11-25 03:30:00"),
    endTime: new Date("2022-11-25 03:45:00"),
    room: "A202",
};

const newExam = async () => {
    const exam = new Exam({
        course: "638ca30c897712bdf48d9da0",
        // startTime: new Date("2022-11-25 03:30:00"),
        // endTime: new Date("2022-11-25 05:00:00"),
        semester: 1,
        room: "A1.111",
        students: ["6382d612093253be55d5d786"],
    });
    await exam.save();
};
// http://localhost:5050/admin/resources/Exam/records/6380ff09c1a78e8aebf0f4da/show
// const testValidate = async () => {
//     const exams = await Exam.find();
//     for (let exam of exams) {
//         console.log(isValidExamDate(exam, newExam));
//     }
// };

// testValidate().then(() => {
//     mongoose.connection.close();
// });
// console.log(random2);


seedExam().then(() => {
    mongoose.connection.close();
});