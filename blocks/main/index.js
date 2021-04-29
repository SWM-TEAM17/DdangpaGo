exports.ddanpago_main_block = {
	conversationId: 1,
	text: '땅파고의 6가지 쓸데없는 기능',
	blocks: [
		{
			type: 'header',
			text: '⛏ 땅파고의 6가지 쓸데없는 기능',
			style: 'blue',
		},
		{
			type: 'divider',
		},
		{
			type: 'button',
			text: '마법의 소라고동🐚',
			action_type: 'submit_action',
			action_name: 'godong_start',
			value: 'godong_start',
			style: 'default',
		},
		{
			type: 'button',
			text: '야민정음 번역기💬',
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
					text: '피보나치킨🐓',
					action_type: 'call_modal',
					action_name: 'fibona_chiken',
					value: 'fibona_chiken',
					style: 'default',
				},
				{
					type: 'button',
					text: '퇴근알람⏰',
					action_type: 'call_modal',
					action_name: 'go_home_timer',
					value: 'timer',
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
					action_name: 'hope_menu',
					value: 'hope_menu',
					text: '퇴사기원🙏',
					style: 'default',
				},
				{
					type: 'button',
					text: '타로뽑기🔯',
					style: 'default',
					action_type: 'submit_action',
					action_name: 'show_taro',
					value: 'unsae',
				},
			],
		},
	],
};