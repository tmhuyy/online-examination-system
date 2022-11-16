const { faker } = require("@faker-js/faker");

const courseDetail = {
    name: [],
    email: [],
    phoneNumber: [],
};

for (let i = 0; i <= 6; i++){
    const email = faker.internet.email().toLowerCase();
    const name = faker.name.fullName();
    const phoneNumber = "0" + faker.random.numeric(9, { bannedDigits: ['0'] });
    courseDetail.email.push(email)
    courseDetail.name.push(name)
    courseDetail.phoneNumber.push(phoneNumber)
}

// console.log(courseDetail)
module.exports = courseDetail;
