const Exam = require("../models/exam");
const Record = require("../models/record");
const Student = require("../models/student");

module.exports.renderExamSchedule = async (req, res) => {
    const exams = await Exam.find().populate({ path: "course" });
    const studentID = req.session?.student?._id;
    const examsOfStudent = exams.filter((el) => el.students.includes(studentID));
    res.render("exams/schedule", {examsOfStudent});
};

module.exports.renderExamScore = async (req, res) => {
    const exams = await Exam.find();
    const record = await Record.find().populate({ path: "courseID" });
    const student = req.student;
    const recordOfStudent = record.filter(el => el.studentID.toString() === student.toString())
    const examsOfStudent = exams.filter((el) => el.students.includes(student));
    // console.log(recordOfStudent)
    // console.log(examsOfStudent.includes)
    // res.send(recordOfStudent)
    res.render("exams/score", {recordOfStudent});
};
