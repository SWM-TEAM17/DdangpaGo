const Config = require('config');

const axios = require('axios');
const kakaoInstance = axios.create({
	baseURL: 'https://api.kakaowork.com',
	headers: {
		Authorization: `Bearer ${Config.keys.kakaoWork.bot}`,
	},
});

exports.getUserList = async () => {
	let res = await kakaoInstance.get('/v1/users.list?limit=100');
	let cursor = res.data.cursor;
	let users = res.data.users;

	while (cursor != null) {
		let tmp = await kakaoInstance.get(`/v1/users.list?cursor=${cursor}`);
		cursor = tmp.data.cursor;	
		users = users.concat(tmp.data.users);
	}

	console.log(users.length);
	return users;
};

exports.openConversations = async ({ userId }) => {
	const data = {
		user_id: userId,
	};
	const res = await kakaoInstance.post('/v1/conversations.open', data);
	return res.data.conversation;
};

exports.sendMessage = async ({ conversationId, text, blocks }) => {
	const data = {
		conversation_id: conversationId,
		text,
		...(blocks && { blocks }),
	};
	const res = await kakaoInstance.post('/v1/messages.send', data);
	return res.data.message;
};

exports.getUser = async (user_id) => {
	const res = await kakaoInstance.get(`/v1/users.info?user_id=${user_id}`);
	return res.data.user;
};