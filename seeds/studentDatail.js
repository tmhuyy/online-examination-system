const { faker } = require("@faker-js/faker");

const studentDetail = {
    email: [],
    username: [],
    phoneNumber: [],
    password: [],
};

for (let i = 0; i <= 20; i++){
    const email = faker.internet.email().toLowerCase();
    const username = faker.internet.userName().toLowerCase();
    const phoneNumber = "0" + faker.random.numeric(9, { bannedDigits: ['0'] });
    const password = faker.internet.password().toLowerCase();
    studentDetail.email.push(email)
    studentDetail.username.push(username)
    studentDetail.phoneNumber.push(phoneNumber)
    studentDetail.password.push(password)
}

// console.log(studentDetail)
module.exports = studentDetail;
