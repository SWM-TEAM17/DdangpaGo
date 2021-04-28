exports.ddanpago_main_block = {
	conversationId: 1,
	text: '땅파고의 6가지 쓸데없는 기능',
	blocks: [
		{
			type: 'button',
			text: '마법의 소라고동',
			action_type: 'submit_action',
			action_name: 'godong_start',
			value: 'godong_start',
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
					action_type: 'call_modal',
					action_name: 'fibona_chiken',
					value: 'fibona_chiken',
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
					action_name: 'hope_menu',
					value: 'hope_menu',
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
};