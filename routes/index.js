// routes/index.js
const express = require('express');
const Config = require('config');
const router = express.Router();

const go_home_timerController = require('../controllers/go_home_timer');

const libKakaoWork = require('../libs/kakaoWork');
const unsaeController = require('../controllers/unsae');
const mainBlock = require('../blocks/main');
const mainController = require('../controllers/main');
const hopeController = require('../controllers/hope');
const transController = require('../controllers/translator/translator.js');
const fiboController = require('../controllers/fibo/fibo.js');
const mongoose = require('mongoose');
const { User } = require('../models/user');

const godongController = require('../controllers/godong');
const blocks = require('../blocks/main');
//const godong = require('../godong');

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
				await hopeController.hope_modal({ req, res, next });
				break;
			case 'tran':
				await transController.trans_modal({ req, res, next });
<<<<<<< HEAD
				break;
			case 'fibo':
				await fiboController.fibo_modal({ req, res, next });
=======
>>>>>>> 42a40786e1611478da2c9bff2f4092b346f54a07
				break;
      case 'time':
			  option = go_home_timerController.option;
			  return res.json({
				  view: go_home_timerController.timer_post_request_message
			  });
			  break;
      case 'ask_':
        await godongController.request_controller({req, res, next});
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
<<<<<<< HEAD
			case 'fibo':
				await fiboController.fibo_message({ req, res, next });
				break;
=======
      case 'unsa':
        await unsaeController.taro_controller({req, res, next});	
        break;
      case 'time':
			  await go_home_timerController.timer_controller({ req, res, next });
			  break;
      case 'question_for_godong':	
		  case 'start_godong':
				await godongController.callback_controller({req, res, next});
        break;
>>>>>>> 42a40786e1611478da2c9bff2f4092b346f54a07
			default:
		}
	} catch (e) {
		console.log(e);
	}

});

module.exports = router;
