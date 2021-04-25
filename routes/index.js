const express = require('express');
const router = express.Router();
const libKakaoWork = require('../libs/kakaoWork');
const unsaeController = require('../controllers/unsae');

router.get('/', async (req, res, next) => {
	
	const users = await libKakaoWork.getUserList();

	const conversations = await Promise.all(
		users.map((user) => libKakaoWork.openConversations({ userId: user.id }))
	);

	const messages = await Promise.all([
		conversations.map((conversation) =>
			libKakaoWork.sendMessage({
				conversationId: conversation.id,
				text: '땅파고의 6가지 쓸데없는 기능',
				blocks: [
					{
						type: 'button',
						text: '마법의 소라고동',
						action_type: 'submit_action',
						action_name: 'magic_godong',
						value: 'magic_godong',
						style: 'default',
					},
					{
						type: 'button',
						text: '한국인만 알아볼수 있는 번역기',
						action_type: 'submit_action',
						action_name: 'only_korean_tr',
						value: 'only_korean_tr',
						style: 'default',
					},
					{
						type: 'action',
						elements: [
							{
								type: 'button',
								text: '피보나치킨',
								action_type: 'submit_action',
								action_name: 'pibonachicken',
								value: 'pibonachicken',
								style: 'default',
							},
							{
								type: 'button',
								text: '퇴근시간 타이머',
								action_type: 'submit_action',
								action_name: 'go_home_timer',
								value: 'go_home_timer',
								style: 'default',
							},
						],
					},
					{
						type: 'action',
						elements: [
							{
								type: 'button',
								action_type: 'submit_action',
								action_name: 'giwon',
								value: 'giwon',
								text: '기원',
								style: 'default',
							},
							{
								type: 'button',
								text: '운세 뽑기',
								style: 'default',
								action_type: 'submit_action',
								action_name: 'show_taro',
								value: 'unsae',
							},
						],
					},
				],
			})
		)
	]);
	
	res.json({
		users,
		conversations,
		messages,
	});
});


router.post('/request', async (req, res, next) => {
	
	res.json({});
});


router.post('/callback', async (req, res, next) => {
	
	try {
		let _ = await unsaeController.taro_controller({req, res, next});	
	} catch (e) {
		console.log(e);
		res.json({ result: true });
	}

});

module.exports = router;