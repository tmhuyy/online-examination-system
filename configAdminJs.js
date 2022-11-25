const AdminJS = require("adminjs");
const AdminJSMongoose = require("@adminjs/mongoose");

const Student = require("./models/student");
const Admin = require("./models/admin");
const Exam = require("./models/exam");
const Course = require("./models/course");
const Record = require("./models/record");

const { ValidationError } = require("adminjs");

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
AdminJS.registerAdapter(AdminJSMongoose);

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
                                        throw new ValidationError(
                                            {
                                                name: {
                                                    message:
                                                        "OH Boy!!! Overlap Exam Time",
                                                },
                                            },
                                            {
                                                message: `OH Boy!!! Overlap exam time with examID: ${exam._id}. Please check again`,
                                            }
                                        );
                                    }
                                }
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

module.exports = adminJs