const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	T_no:{ type: Number, required: true},
	UserName: { type: String, required: true },
	password: { type: String, required: true }
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const Login = mongoose.model("login", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		T_no: Joi.required().label("T_no"),
		UserName: Joi.string().required().label("user Name"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = { Login, validate };
