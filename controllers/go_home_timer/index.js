const axios = require('axios');
const libKakaoWork = require('../../libs/kakaoWork');

const gohomeImageArray = ['go_home.jpg', 'go_home2.jpg', 'go_home3.jpg'];
const blocks = require('../../blocks/go_home_timer');

exports.timer_controller = async ({ req, res, next }) => {
	let today = new Date();
	let hours = (today.getHours() + 9) % 24; // 시
	let minutes = today.getMinutes(); // 분
	let seconds = today.getSeconds(); // 초
	let milliseconds = today.getMilliseconds();
	const { message, actions, action_time, value } = req.body;
	offHour = actions.hour;
	offMinute = actions.minute;
	t_t = actions.time_type;
	var remain;
	let lagging_time;
	
	if (wrong_input(offHour, offMinute)) {
		send_error_message(message.conversation_id);
		return;
	}
	
	if (t_t == '시') {
		remain = Math.floor(parseInt(offHour) - parseInt(hours));
		t_t += '간';
	} else if (t_t == '분') {
		remain = Math.floor(parseInt(offHour) * 60 - hours * 60 - minutes);
	} else if (t_t == '초') {
		remain = Math.floor(
			parseInt(offHour) * 3600 +
			parseInt(offMinute) * 60 -
			(hours * 3600 + minutes * 60 + seconds)
		);
	} else {
		remain = Math.floor(
			(parseInt(offHour) * 3600 + parseInt(offMinute) * 60) * 1000 -
				(hours * 3600 + minutes * 60 + seconds) * 1000 -
				milliseconds
		);
	}

	if (remain < 0) {
		send_already_home(message.conversation_id);
		return;
	}

	lagging_time = Math.floor(
		parseInt(offHour) * 3600 +
		parseInt(offMinute) * 60 -
		(hours * 3600 + minutes * 60 + seconds)
	);
	
	await libKakaoWork.sendMessage({
		conversationId: message.conversation_id,
		text: '퇴근시간 알림이 등록되었습니다.',
		blocks: [
			{
				type: 'text',
				text: `🎉 퇴근시간: ${offHour}시 ${offMinute}분 🎉\n\n퇴근시간 알림이 등록되었습니다.\n남은 시간은 ${remain}${t_t} 입니다.`,
				markdown: true
			},
			{
			type: 'divider',
			},
			{
				type: 'action',
				elements: [
					{
						type: 'button',
						action_type: 'call_modal',
						value: 'timer',
						text: '다시 알람맞추기',
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
		]
	});
	
	await setTimeout(() => {
		const image = gohomeImageArray[Math.floor(Math.random() * gohomeImageArray.length)];
		libKakaoWork.sendMessage({
			conversationId: message.conversation_id,
			text: '퇴근시간이 되었습니다.',
			blocks: [
				{
					type: 'text',
					text: '퇴근시간이 되었습니다.',
					markdown: true
				},
				{
					type: 'image_link',
					url: `https://swm-chatbot-mptw3r-mxrmlo.run.goorm.io/gohome/${image}`
				},
				{
					type: 'divider',
				},
				{
					type: 'action',
					elements: [
						{
							type: 'button',
							action_type: 'call_modal',
							value: 'timer',
							text: '다시 알람맞추기',
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
			]
		});
	}, lagging_time * 1000);
};

function wrong_input(hour, minute) {
	if (not_number(hour) || not_number(minute) || hour_out_of_range(hour) || minute_out_of_range(minute)) {
		return true;
	}
	return false;
}

function not_number(str) {
	return isNaN(str);
}

function hour_out_of_range(hour) {
	if (hour < 0 || 24 < hour) return true;
	return false;
}

function minute_out_of_range(minute) {
	if (minute < 0 || 60 < minute) return true;
	return false;
}

async function send_error_message(conversationId) {
	message = blocks.error;
	message.conversationId = conversationId;
	await libKakaoWork.sendMessage(message);
}

async function send_already_home(conversationId) {
	message = blocks.already_home;
	message.conversationId = conversationId;
	await libKakaoWork.sendMessage(message);
}