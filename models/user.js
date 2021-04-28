const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	user_id: {
		type: String,
		required: true,
		maxlength: 50,
	},
	name: {
		type: String,
		required: true,
		maxlength: 50,
	},
	hope_val: {
		type: Number,
		required: true,
	},
	last_hope: {
		type: String,
		maxlength: 50,
	}
});

const User = mongoose.model('User', userSchema);

module.exports = { User };