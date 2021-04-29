const libKakaoWork = require('../../libs/kakaoWork');
const blocks = require('../../blocks/godong');

exports.request_controller = async ({ req, res, next }) => {
	const { message, value } = req.body;
	let response = {};

	switch (value) {
		case 'godong_ask':
			response = blocks.ask_modal;
			break;
		default:
	}

	response.conversationId = message.conversation_id;

	res.json(response);
	return;
};

exports.callback_controller = async ({ req, res, next }) => {
	const { message, actions, action_time, value } = req.body;
	let response = {};

	switch (value) {
		case 'godong_start':
			response = blocks.start_message;
			break;
		case 'godong_question':
			response = blocks.answer_message;
			response.blocks[1].text = '나: ' + actions.question + '\n';
			set_answer(response);
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

function set_answer(response) {
	let answer = ['안 돼.', '가만히 있어.', '멈춰.', '그럼.', '다시 한 번 물어봐.', '돼.'];
	let url = 'https://swm-chatbot-mptw3r-mxrmlo.run.goorm.io/godong/answer';
	var no = Math.floor(Math.random() * 10) % 6;

	response.text = answer[no];
	response.blocks[0].url = url + no + '.jpg';
	response.blocks[1].text += '고동: ' + add_markdown(answer[no]);
}

function add_markdown(str) {
	return '*_' + str + '_*';
}