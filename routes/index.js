// routes/index.js
const express = require('express');
const Config = require('config');
const router = express.Router();
const libKakaoWork = require('../libs/kakaoWork');
const unsaeController = require('../controllers/unsae');
const mainBlock = require('../blocks/main');
const mainController = require('../controllers/main');
const hopeController = require('../controllers/hope');
const transController = require('../controllers/translator/translator.js');
const mongoose = require('mongoose');
const { User } = require('../models/user');

router.get('/', async (req, res, next) => {
	
	const users = await libKakaoWork.getUserList();

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
				let _ = await hopeController.hope_modal({ req, res, next });
				break;
			case 'tran':
				let _1 = await transController.trans_modal({ req, res, next });
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
      case 'unsae':
        await unsaeController.taro_controller({req, res, next});	
        break;
			default:
		}
	} catch (e) {
		console.log(e);
	}

});

module.exports = router;