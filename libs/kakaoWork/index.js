const Config = require('config');

const axios = require('axios');
const kakaoInstance = axios.create({
	baseURL: 'https://api.kakaowork.com',
	headers: {
		Authorization: `Bearer ${Config.keys.kakaoWork.bot}`,
	},
});

exports.getUserList = async () => {
	const res = await kakaoInstance.get('/v1/users.list');
	return res.data.users;
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