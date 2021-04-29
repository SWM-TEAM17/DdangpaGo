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

exports.timer_post_request_message = {
	title: '퇴근시간 입력',
	accept: '타이머 맞추기',
	decline: '취소',
	value: 'timer_results',
	blocks: [
		{
			type: 'label',
			text: '퇴근시간을 입력하세요(24시간제)',
			markdown: false
		},
		{
			type: 'label',
			text: "'시'를 입력하세요.",
			markdown: false
		},
		{
			type: 'input',
			name: 'hour',
			required: true,
			placeholder: 'ex) 19'
		},
		{
			type: 'label',
			text: "'분'을 입력하세요.",
			markdown: false
		},
		{
			type: 'input',
			name: 'minute',
			required: true,
			placeholder: 'ex) 15'
		},
		{
			type: 'select',
			name: 'time_type',
			required: true,
			text: '알림을 받고싶은 시간단위 입력(시/분/초/밀리초)',
			action_type: 'call_modal',
			options: option,
			placeholder: '알림을 받고싶은 시간단위 입력(시/분/초/밀리초)',
			style: 'default'
		}
	]
};

exports.error = {
	conversationId: 1,
	text: '잘못된 입력입니다.',
	blocks: [
		{
			type: 'text',
			text: "잘못된 입력입니다.\n적절한 시간을 입력해주세요.",
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
};

exports.already_home = {
	conversationId: 1,
	text: '이미 퇴근하셨습니다.',
	blocks: [
		{
			type: 'text',
			text: "이미 퇴근하셨습니다.",
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
}