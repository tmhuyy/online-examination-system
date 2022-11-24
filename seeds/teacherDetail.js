const { faker } = require("@faker-js/faker");

const teacherDetail = {
    name: [],
    email: [],
    phoneNumber: [],
};

for (let i = 0; i <= 6; i++){
    const email = faker.internet.email().toLowerCase();
    const name = faker.name.fullName();
    const phoneNumber = "0" + faker.random.numeric(9, { bannedDigits: ['0'] });
    teacherDetail.email.push(email)
    teacherDetail.name.push(name)
    teacherDetail.phoneNumber.push(phoneNumber)
}

// console.log(teacherDetail)
module.exports = teacherDetail;
