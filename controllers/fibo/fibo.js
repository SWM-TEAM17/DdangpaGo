const libKakaoWork = require('../../libs/kakaoWork');
const mainBlock = require('../../blocks/main');

exports.fibo_modal = async ({ req, res, next }) => {
	const { message, value } = req.body;
	console.log("value: "+value);
	switch (value) {
		case 'fibona_chiken':
			return res.json({
				view: {
					title: '피보나치킨',
					accept: '전송',
					decline: '취소',
					value: 'fibona_chiken_results',
					blocks: [
						{
							type: 'label',
							text: '치킨을 먹을 인원수를 알려주세요',
							markdown: false,
						},
						{
							type: 'input',
							name: 'people',
							required: true,
							placeholder: '인원수를 입력해주세요',
						},
					],
				},
			});
			break;
		default:
	}
};
exports.fibo_message = async ({req, res, next}) => {
	const { message, actions, action_time, value } = req.body;
	switch (value) {
		case 'main':
			let tmpblock = mainBlock.ddanpago_main_block;
			tmpblock.conversationId = message.conversation.id;
			await libKakaoWork.sendMessage(tmpblock);
			break;
		case 'fibona_chiken_results':
			await libKakaoWork.sendMessage({
				conversationId: message.conversation_id,
				text: '최적의 치킨 수를 찾았습니다!',
				blocks: [
					{
						type: 'header',
						text: '🐓 최적의 치킨 수 🍗',
						style: 'blue',
					},
					{
						type: 'text',
						text: '*' + actions.people.replace(/[^0-9]/g,'') + ' 명*이 배부르게 먹으려면',
						markdown: true,
					},
					{
						type: 'text',
						text: '*' + fibo(actions.people) + ' 마리*를 시키세요!',
						markdown: true,
					},
					{
						type: 'image_link',
						url:
							'https://image.chosun.com/sitedata/image/201705/31/2017053100563_0.jpg',
					},
					{
						type: 'action',
						elements: [
							{
								type: 'button',
								action_type: 'call_modal',
								action_name: 'fibona_chiken',
								value: 'fibona_chiken',
								text: '다시하기',
								style: 'default',
							},
							{
								type: 'button',
								action_type: 'submit_action',
								action_name: 'menu',
								value: 'menu',
								text: '또파고⛏',
								style: 'default',
							},
						],
					},
				],
			});
			break;
		default:
	}
};

//피보나 치킨 수 구하기
function fibo(number) {
	number = number.replace(/[^0-9]/g,'');
	number *= 1;
	var d = [0, 1, 1],
		i,
		res = 0;

	for (i = 2; d[i - 1] < number; i++) {
		d[i] = d[i - 1] + d[i - 2];
	}

	for (; i && number; i--) {
		if (number >= d[i]) {
			number -= d[i];
			res += d[i - 1];
		}
	}
	return res;
}