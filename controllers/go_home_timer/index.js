const axios = require('axios');
const libKakaoWork = require('../../libs/kakaoWork');

option = [
	{
		text: '시',
		value: '시'
	},
	{
		text: '분',
		value: '분'
	},
	{
		text: '초',
		value: '초'
	},
	{
		text: '밀리초',
		value: '밀리초'
	}
];

exports.option = option;

exports.timer_post_request_message = {
	title: '퇴근시간 입력',
	accept: '타이머 맞추기',
	decline: '취소',
	value: 'timer_results',
	blocks: [
		{
			type: 'label',
			text: '퇴근시간을 입력하세요',
			markdown: false
		},
		{
			type: 'input',
			name: 'time',
			required: true,
			placeholder: '07시05분'
		},
		{
			type: 'select',
			name: 'time_type',
			required: true,
			text: '알림을 받고싶은 시간단위 입력(시/분/초/밀리초)',
			action_type: 'call_modal',
			options: option,
			style: 'default'
		}
	]
};

exports.timer_controller = async ({ req, res, next }) => {
	let today = new Date();
	let hours = (today.getHours() + 9) % 24; // 시
	let minutes = today.getMinutes(); // 분
	let seconds = today.getSeconds(); // 초
	let milliseconds = today.getMilliseconds();
	const { message, action_name, action_time, value } = req.body;
	ti = req.body.actions.time;
	t_t = req.body.actions.time_type;
	var remain;
	let lagging_time;
	if (t_t == '시') {
		remain = Math.floor(parseInt(ti[0]) * 10 + parseInt(ti[1]) - parseInt(hours));
		t_t += '간';
	} else if (t_t == '분') {
		remain = Math.floor(parseInt(ti[0]) * 600 + parseInt(ti[1]) * 60 - hours * 60 - minutes);
	} else if (t_t == '초') {
		remain = Math.floor(
			parseInt(ti[0]) * 36000 +
				parseInt(ti[1]) * 3600 +
				parseInt(ti[3]) * 600 +
				parseInt(ti[4]) * 60 -
				(hours * 3600 + minutes * 60 + seconds)
		);
	} else {
		remain = Math.floor(
			(parseInt(ti[0]) * 36000 + parseInt(ti[1]) * 3600 + parseInt(ti[3]) * 600 + parseInt(ti[4]) * 60) * 1000 -
				(hours * 3600 + minutes * 60 + seconds) * 1000 -
				milliseconds
		);
	}
	console.log(remain);
	remain = remain <= 0 ? 0 : remain;
	console.log(remain + t_t);
	lagging_time = Math.floor(
		parseInt(ti[0]) * 36000 +
			parseInt(ti[1]) * 3600 +
			parseInt(ti[3]) * 600 +
			parseInt(ti[4]) * 60 -
			(hours * 3600 + minutes * 60 + seconds)
	);
	await setTimeout(() => {
		libKakaoWork.sendMessage({
			conversationId: message.conversation_id,
			text: '알림이 울립니다.',
			blocks: [
				{
					type: 'text',
					text: '퇴근시간이 되었습니다.',
					markdown: true
				}
			]
		});
	}, lagging_time * 1000);
	await libKakaoWork.sendMessage({
		conversationId: message.conversation_id,
		text: '퇴근시간 알림이 등록되었습니다.',
		blocks: [
			{
				type: 'text',
				text: '퇴근시간 알림이 등록되었습니다.',
				markdown: true
			},
			{
				type: 'text',
				text: `남은시간은 ${remain}${t_t} 입니다.`,
				markdown: true
			}
		]
	});
};
