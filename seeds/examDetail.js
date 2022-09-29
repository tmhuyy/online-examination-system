// const { faker } = require("@faker-js/faker");

const examDetail = {
    name: [
        "Software Enginnering",
        "Computer Network",
        "Digital Logic Design",
        "Operating System",
        "Introdution To Computing",
        "Calculus 3",
    ],
  rooms: ["A2.601", "A1.104", "A2.304", "A1.402", "A2.511", "A1.201"],
  startTime: [
    new Date("2022-10-18 08:30:00"),
    new Date("2022-10-19 08:00:00"),
    new Date("2022-10-20 15:30:00"),
    new Date("2022-10-17 08:30:00"),
    new Date("2022-10-16 13:00:00"),
    new Date("2022-10-17 11:00:00"),
  ], 
  endTime: [
    new Date("2022-10-18 10:00:00"),
    new Date("2022-10-19 09:30:00"),
    new Date("2022-10-20 17:00:00"),
    new Date("2022-10-17 11:00:00"),
    new Date("2022-10-16 15:00:00"),
    new Date("2022-10-17 13:30:00"),
  ], 
  semester: [1, 2]
};

for (let i = 0; i <= 6; i++) {
    // const email = faker.internet.email().toLowerCase();
    // const username = faker.internet.userName().toLowerCase();
    // const phoneNumber = "0" + faker.random.numeric(9, { bannedDigits: ['0'] });
    // const password = faker.internet.password().toLowerCase();
    // studentDetail.email.push(email)
    // studentDetail.username.push(username)
    // studentDetail.phoneNumber.push(phoneNumber)
    // studentDetail.password.push(password)
}

// console.log(studentDetail)
module.exports = examDetail;
