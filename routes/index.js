// routes/index.js
const express = require('express');
const router = express.Router();

const libKakaoWork = require('../libs/kakaoWork');

const godongController = require('../controllers/godong');
const blocks = require('../blocks/main');
//const godong = require('../godong');

router.get('/', async (req, res, next) => {
	// 유저 목록 검색 (1)
	const users = await libKakaoWork.getUserList();

	// 검색된 모든 유저에게 각각 채팅방 생성 (2)
	const conversations = await Promise.all(
		users.map((user) => libKakaoWork.openConversations({ userId: user.id }))
	);

	// 생성된 채팅방에 메세지 전송 (3)
	const messages = await Promise.all([
		conversations.map((conversation) =>
				libKakaoWork.sendMessage(main_block_to(conversation.id)))
	]);

	res.json({
		users,
		conversations,
		messages,
	});
});

router.post('/request', async (req, res, next) => {
	const { message, value } = req.body;

	switch (value) {
		case 'ask_godong':
			try {
				return godongController.request_controller({req, res, next});
			} catch (e) {
				console.log(e);
				return res.json({});
			}
			break;
		default:
	}
});

router.post('/callback', async (req, res, next) => {
	const { message, actions, action_time, value } = req.body;

	switch (value) {
		case 'question_for_godong':			
		case 'start_godong':
			try {
				let _ = await godongController.callback_controller({req, res, next});
			} catch (e) {
				console.log(e);
				res.json({});
			}
			break;
		case 'start_ddangpago':
			await libKakaoWork.sendMessage(main_block_to(message.conversation_id));
			break;
		default:
	}
});

function main_block_to(conversation_id) {
	let main_block = blocks.ddanpago_main_block;
	main_block.conversationId = conversation_id;
	return main_block;
}

module.exports = router;