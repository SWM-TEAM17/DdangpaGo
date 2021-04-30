// routes/index.js
const express = require('express');
const Config = require('config');
const router = express.Router();

const libKakaoWork = require('../libs/kakaoWork');
const mainBlock = require('../blocks/main');
const goHomeBlock = require('../blocks/go_home_timer');
const mainController = require('../controllers/main');
const unsaeController = require('../controllers/unsae');
const hopeController = require('../controllers/hope');
const transController = require('../controllers/translator/translator.js');
const fiboController = require('../controllers/fibo/fibo.js');
const go_home_timerController = require('../controllers/go_home_timer');
const godongController = require('../controllers/godong');

const mongoose = require('mongoose');
const { User } = require('../models/user');


router.post('/chatbot', async (req, res, next) => {
	const users = await libKakaoWork.getUserList();
	// console.log(users);
	
	const conversations = await Promise.all(
		users.map((user) => libKakaoWork.openConversations({ userId: user.id }))
	);

	// 생성된 채팅방에 메세지 전송 (3)
	const messages = await Promise.all([
		conversations.map((conversation) => {
			let tmpblock = mainBlock.ddanpago_intro_block;
			tmpblock.conversationId = conversation.id;
			libKakaoWork.sendMessage(tmpblock);
		}),
	]);

	res.json({
		users,
		conversations,
		messages,
	});
});

// routes/index.js 모달
router.post('/request', async (req, res, next) => {
	const { message, action_time, react_user_id, value } = req.body;
	console.log(req.body);

	try {
		switch (value.slice(0, 4)) {
			case 'hope':
				await hopeController.hope_modal({ req, res, next });
				break;
			case 'tran':
				await transController.translator_modal({ req, res, next });
				break;
			case 'fibo':
				await fiboController.fibo_modal({ req, res, next });
				break;
			case 'time':
				option = goHomeBlock.option;
				return res.json({
					view: goHomeBlock.timer_post_request_message,
				});
				break;
			case 'godo':
				await godongController.request_controller({ req, res, next });
				break;
			default:
		}
	} catch (e) {
		console.log(e);
	}

	return;
});

// routes/index.js
router.post('/callback', async (req, res, next) => {
	const { message, actions, action_time, react_user_id, value } = req.body; // 설문조사 결과 확인 (2)
	console.log(req.body);

	try {
		switch (value.slice(0, 4)) {
			case 'menu':
				await mainController.main_message({ req, res, next });
				break;
			case 'hope':
				await hopeController.hope_message({ req, res, next });
				break;
			case 'tran':
				await transController.translator_message({ req, res, next });
				break;
			case 'fibo':
				await fiboController.fibo_message({ req, res, next });
				break;
			case 'unsa':
				await unsaeController.taro_controller({ req, res, next });
				break;
			case 'time':
				await go_home_timerController.timer_controller({ req, res, next });
				break;
			case 'godo':
				await godongController.callback_controller({ req, res, next });
				break;
			default:
		}
	} catch (e) {
		console.log(e);
	}

	res.json({ result: true });
});

module.exports = router;