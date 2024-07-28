const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobileNo: {
        type: Number,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    createdate: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
});

const Employee = mongoose.model("Employee",employeeSchema);


module.exports = Employee;