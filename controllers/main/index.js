const libKakaoWork = require('../../libs/kakaoWork');
const mainBlock = require('../../blocks/main');
const axios = require('axios');

exports.main_message = async ({ req, res, next }) => {
	const { message, actions, action_name, react_user_id, action_time, value } = req.body;
	let response = {};

	switch (value) {
		case 'menu':
			response = mainBlock.ddanpago_main_block;
			break;
		default:
	}

	response.conversationId = message.conversation_id;

	try {
		await libKakaoWork.sendMessage(response);
	} catch (error) {
		console.log(error);
	}
	return;
};