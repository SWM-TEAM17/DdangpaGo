// routes/index.js
const express = require('express');
const Config = require('config');
const router = express.Router();
const libKakaoWork = require('../libs/kakaoWork');
const mainBlock = require('../blocks/main');
const mainController = require('../controllers/main');
const hopeController = require('../controllers/hope');
const transController = require('../controllers/translator/translator.js');
const fiboController = require('../controllers/fibo/fibo.js');
const mongoose = require('mongoose');
const { User } = require('../models/user');

router.get('/', async (req, res, next) => {
	// 유저 목록 검색 (1)
	const users = await libKakaoWork.getUserList();

	// 검색된 모든 유저에게 각각 채팅방 생성 (2)
	const conversations = await Promise.all(
		users.map((user) => libKakaoWork.openConversations({ userId: user.id }))
	);

	console.log(conversations);
	// 생성된 채팅방에 메세지 전송 (3)
	const messages = await Promise.all([
		conversations.map((conversation) => {
			let tmpblock = mainBlock.ddanpago_main_block;
			tmpblock.conversationId = conversation.id;
			libKakaoWork.sendMessage(tmpblock);
		}),
	]);

	// 응답값은 자유롭게 작성하셔도 됩니다.
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
				await transController.trans_modal({ req, res, next });
				break;
			case 'fibo':
				await fiboController.fibo_modal({req, res, next});
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
				await transController.trans_message({ req, res, next });
				break;
			case 'fibo':
				await fiboController.fibo_message({ req, res, next});
				break;
			default:
		}
	} catch (e) {
		console.log(e);
	}

	res.json({ result: true });
});

module.exports = router;