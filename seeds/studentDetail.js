// const { faker } = require("@faker-js/faker");

// const studentDetail = {
//     email: [],
//     username: [],
//     phoneNumber: [],
//     password: [],
// };

// for (let i = 0; i <= 4; i++){
//     const email = faker.internet.email().toLowerCase();
//     const username = faker.internet.userName().toLowerCase();
//     const phoneNumber = "0" + faker.random.numeric(9, { bannedDigits: ['0'] });
//     const password = faker.internet.password(5).toLowerCase();
//     studentDetail.email.push(email)
//     studentDetail.username.push(username)
//     studentDetail.phoneNumber.push(phoneNumber)
//     studentDetail.password.push(password)
// }

// console.log(studentDetail)
// // console.log(studentDetail)
module.exports = [
    {
        email: "minhhuy123@gmail.com",
        username: "huyhuy123",
        password: "huyhehe",
        phoneNumber: "0902807512",
        courses: [
            "ITIT01",
            "ITIT03",
            "ITIT04", 
            "ITIT05",
            "MAIU03",
            "MAIU02",
            "PHIU01",
        ],
    },
    {
        email: "thanhtam123@gmail.com",
        username: "tamtam123",
        password: "tamhehe",
        phoneNumber: "0902807612",
        courses: ["ITIT01", "ITIT03", "PHIU01"],
    },
    {
        email: "nam123@gmail.com",
        username: "nam123",
        password: "namhehe",
        phoneNumber: "0902807712",
        courses: ["ITIT01", "ITIT02", "ITIT05", "MAIU03", "MAIU02"],
    },
    {
        email: "vinh123@gmail.com",
        username: "vinh123",
        password: "vinhhehe",
        phoneNumber: "0902807812",
        courses: ["ITIT01", "ITIT04", "MAIU03", "MAIU02"],
    },
    {
        email: "quang123@gmail.com",
        username: "quang123",
        password: "quanghehe",
        phoneNumber: "0902808012",
        courses: ["ITIT01", "PHIU01", "ITIT05", "MAIU03", "MAIU02"],
    },
];
