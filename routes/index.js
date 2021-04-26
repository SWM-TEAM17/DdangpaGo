// routes/index.js
const express = require('express');
const router = express.Router();

const libKakaoWork = require('../libs/kakaoWork');

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

	// 응답값은 자유롭게 작성하셔도 됩니다.
	res.json({
		users,
		conversations,
		messages,
	});
});

// routes/index.js
router.post('/request', async (req, res, next) => {
	const { message, value } = req.body;

	switch (value) {
		case 'ask_sora':
			// 설문조사용 모달 전송
			return res.json({
				view: {
					title: '마법의 소라고동',
					accept: '확인',
					decline: '취소',
					value: 'question_for_sora',
					blocks: [
						{
							type: 'label',
							text: '*_마법 고동님, 물어볼 게 있는데요,_*',
							markdown: true,
						},
						{
							type: 'input',
							name: 'question',
							required: false,
							placeholder: '질문을 입력해주세요.',
						},
					],
				},
			});
			break;
		default:
	}

	res.json({});
});

// routes/index.js
router.post('/callback', async (req, res, next) => {
	const { message, actions, action_time, value } = req.body; // 설문조사 결과 확인 (2)

	switch (value) {
		case 'question_for_sora':
			let answer = [
				'*_안 돼._*',
				'*_가만히 있어._*',
				'*_멈춰._*',
				'*_그럼._*',
				'*_다시 한번 물어봐._*',
			];
			let picture = [
				'https://user-images.githubusercontent.com/45932570/115988069-eeae4880-a5f2-11eb-8f6a-b4ae24311e94.jpg',
				'https://user-images.githubusercontent.com/45932570/115988103-1c938d00-a5f3-11eb-8231-b358115c061d.png',
				'https://user-images.githubusercontent.com/45932570/115987785-7dba6100-a5f1-11eb-996a-656c77a1d956.jpg',
				'https://user-images.githubusercontent.com/45932570/115988194-77c57f80-a5f3-11eb-8145-78611e1663c5.png',
				'https://user-images.githubusercontent.com/45932570/115988194-77c57f80-a5f3-11eb-8145-78611e1663c5.png',
			];
			var no = Math.floor(Math.random() * 10) % 4;

			// 설문조사 응답 결과 메세지 전송 (3)
			await libKakaoWork.sendMessage({
				conversationId: message.conversation_id,
				text: 'Push alarm message',
				blocks: [
					{
						type: 'image_link',
						url: picture[no],
					},
					{
						type: 'text',
						text: answer[no],
						markdown: true,
					},
				],
			});
			break;
			
		case 'start_sora':
			console.log("start_sora : conversation_id: " + message.conversation_id);
			await libKakaoWork.sendMessage({
				conversationId: message.conversation_id,
				text: '마법의 소라고동',
				blocks: [
					{
					  "type": "image_link",
					  "url": "https://user-images.githubusercontent.com/45932570/115987984-83fd0d00-a5f2-11eb-8a54-d6ee9d0f8085.jpg"
					},
					{
						type: 'button',
						action_type: 'call_modal',
						value: 'ask_sora',
						text: '소라고동에게 물어보기',
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