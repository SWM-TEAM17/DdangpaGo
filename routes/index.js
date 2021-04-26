// routes/index.js
const express = require('express');
const router = express.Router();

const libKakaoWork = require('../libs/kakaoWork');

const sora = require('../sora');

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
			libKakaoWork.sendMessage({
				conversationId: conversation.id,
				text: '땅파고 메시지',
				blocks: [
					{
						type: 'header',
						text: '땅파고👷',
						style: 'yellow',
					},
					{
						type: 'button',
						text: '마법의 소라고동',
						action_type: 'submit_action',
						action_name: 'start_sora',
						value: 'start_sora',
						style: 'default',
					},
					{
						type: 'button',
						text: '한국인만 알아볼수 있는 번역기',
						action_type: 'call_modal',
						value: 'korean_translator',
						style: 'default',
					},
					{
						type: 'button',
						text: '피보나치킨',
						style: 'default',
					},
					{
						type: 'button',
						text: '퇴근시간 타이머',
						style: 'default',
					},
					{
						type: 'button',
						text: '기원',
						style: 'default',
					},
					{
						type: 'button',
						text: '운세 뽑기',
						style: 'default',
					},
				],
			})
		),
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
		case 'ask_sora':
			return res.json(sora.ask_sora_modal);
			break;
		default:
	}

	res.json({});
});

router.post('/callback', async (req, res, next) => {
	const { message, actions, action_time, value } = req.body;

	switch (value) {
		case 'question_for_sora':
			await libKakaoWork.sendMessage(sora.from_sora(actions.question, message.conversation_id));
			break;
			
		case 'start_sora':
			await libKakaoWork.sendMessage(sora.start_sora(message.conversation_id));
			break;
			
		case 'start_ddangpago':
			await libKakaoWork.sendMessage({
				conversationId: message.conversation_id,
				text: '땅파고 메시지',
				blocks: [
					{
						type: 'header',
						text: '땅파고👷',
						style: 'yellow',
					},
					{
						type: 'button',
						text: '마법의 소라고동',
						action_type: 'submit_action',
						action_name: 'start_sora',
						value: 'start_sora',
						style: 'default',
					},
					{
						type: 'button',
						text: '한국인만 알아볼수 있는 번역기',
						action_type: 'call_modal',
						value: 'korean_translator',
						style: 'default',
					},
					{
						type: 'button',
						text: '피보나치킨',
						style: 'default',
					},
					{
						type: 'button',
						text: '퇴근시간 타이머',
						style: 'default',
					},
					{
						type: 'button',
						text: '기원',
						style: 'default',
					},
					{
						type: 'button',
						text: '운세 뽑기',
						style: 'default',
					},
				],
			});
			break;
		default:
	}

	res.json({ result: true });
});

module.exports = router;