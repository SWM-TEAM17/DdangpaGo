const express = require('express');
const router = express.Router();
const go_home_timerController = require('../controllers/go_home_timer');

const libKakaoWork = require('../libs/kakaoWork');

router.get('/', async (req, res, next) => {
	// 유저 목록 검색 (1)
	const users = await libKakaoWork.getUserList();

	// 검색된 모든 유저에게 각각 채팅방 생성 (2)
	const conversations = await Promise.all(users.map((user) => libKakaoWork.openConversations({ userId: user.id })));

	const messages = await Promise.all([
		conversations.map((conversation) =>
			libKakaoWork.sendMessage({
				conversationId: conversation.id,
				text: '땅파고 메시지',
				blocks: [
					{
						type: 'header',
						text: '땅파고👷',
						style: 'blue'
					},
					{
						type: 'button',
						text: '마법의 소라고동',
						style: 'default'
					},
					{
						type: 'button',
						text: '한국인만 알아볼수 있는 번역기',
						action_type: 'call_modal',
						value: 'korean_translator',
						style: 'default'
					},
					{
						type: 'button',
						text: '피보나치킨',
						style: 'default'
					},
					{
						type: 'button',
						text: '퇴근시간 타이머',
						action_type: 'call_modal',
						value: 'timer',
						style: 'default'
					},
					{
						type: 'button',
						text: '기원',
						style: 'default'
					},
					{
						type: 'button',
						text: '운세 뽑기',
						style: 'default'
					}
				]
			})
		)
	]);
	// 응답값은 자유롭게 작성하셔도 됩니다.
	res.json({
		result: true
	});

	/*
  res.json({
    users,
    conversations,
    messages,
  });
  
  */
});

router.post('/request', async (req, res, next) => {
	const { message, value } = req.body;
	//console.log(req.body);
	switch (value) {
		case 'timer':
			//모달 전송
			option = go_home_timerController.option;

			return res.json({
				view: go_home_timerController.timer_post_request_message
			});
			break;
		default:
	}

	res.json({});
});

router.post('/callback', async (req, res, next) => {
	const { message, actions, action_time, value } = req.body;

	switch (value) {
		case 'timer_results':
			await go_home_timerController.timer_controller({ req, res, next });
			break;
		default:
	}

	res.json({ result: true });
});

module.exports = router;
