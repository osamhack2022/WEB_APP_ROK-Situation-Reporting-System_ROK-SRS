const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
	password: {
		type: String,
		maxlength: 50
	},
	username: { // 성명
		type: String,
		maxlength: 50
	},
	role: { // 역할, 권한 (관리자, 수정가능 등.)
		type: Number
	},
	militaryRank: { // 계급 (example 1:이등병, 2:일병, 3:상병, 4:병장, 5:하사, 5.5:하사(진), 6:중사 .... 군무원, 전문인력 등)
		type: Number
	},
	serviceNumber: { // 군번
		type: String,
		maxlength: 50,
		unique: 1
	},
	battalion: { // 대대
		type: String,
		maxlength: 50
	},
	company: { // 중대
		type: String,
		maxlength: 50
	},
	platoon: { // 소대
		type: String,
		maxlength: 50
	},
	squad: { // 분대
		type: String,
		maxlength: 50
	},
	department: { // 부서
		type: String,
		maxlength: 50
	},
	position: { // 직책
		type: String,
		maxlength: 50
	},
	phoneNumber: { // 전화번호(민)
		type: String,
		maxlength: 50
	},
	voipNumber: { // VoIP번호(군)
		type: String,
		maxlength: 50
	},
	email: { // 이메일
		type: String,
		trim: true,
		unique: 1
	},
	token: {
		type: String
	},
	tokenExp: {
		type: Number
	}
})
);

module.exports = User;
