exports.ddanpago_main_block = {
	conversationId: 1,
	text: '땅파고의 6가지 쓸데없는 스킬',
	blocks: [
		//{
		//	type: 'header',
		//	text: '⛏ 땅파고의 6가지 쓸데없는 기능',
		//	style: 'blue',
		//},
		{
			type: 'image_link',
			url: 'https://swm-chatbot-mptw3r-mxrmlo.run.goorm.io/main/ddangpaGo.jpg',
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
			action_type: 'call_modal',
			action_name: 'translator_call_modal',
			value: 'translator_call_modal',
			style: 'default',
		},
		{
			type: 'action',
			elements: [
				{
					type: 'button',
					text: '피보나치킨🍗',
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
		{
			type: 'divider',
		},
		// {
		// 	type: 'button',
		// 	text: '6가지 스킬 보기',
		// 	action_type: 'submit_action',
		// 	action_name: 'menu',
		// 	value: 'menu',
		// 	style: 'default',
		// },
		{
			type: 'context',
			content: {
				type: 'text',
				text: '[사용법 보러가기](https://github.com/SWM-TEAM17/DdangpaGo#readme)',
				markdown: true,
			},
			image: {
				type: 'image_link',
				url:
					'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Info_icon-72a7cf.svg/64px-Info_icon-72a7cf.svg.png',
			},
		},
	],
};

exports.ddanpago_intro_block = {
	conversationId: 1,
	text: '땅파고를 소개합니다',
	blocks: [
		{
			type: 'image_link',
			url: 'https://swm-chatbot-mptw3r-mxrmlo.run.goorm.io/main/ddangpaGo.jpg',
		},
		{
			type: 'description',
			term: '이름',
			content: {
				type: 'text',
				text: '땅파고 😉',
				markdown: true,
			},
			accent: false,
		},
		{
			type: 'description',
			term: '나이',
			content: {
				type: 'text',
				text: '2X살 🧑‍💻',
				markdown: false,
			},
			accent: false,
		},
		{
			type: 'description',
			term: '직업',
			content: {
				type: 'text',
				text: '취준생?? or 백수💦',
				markdown: false,
			},
			accent: false,
		},
		{
			type: 'description',
			term: '특기',
			content: {
				type: 'text',
				text: '삽질 ⛏',
				markdown: false,
			},
			accent: false,
		},
		{
			type: 'text',
			text:
				'4학년에 올라가는 땅파고는 대학 동기였던 알파고의 구글 코리아 취업소식을 듣게 된다.\n\n학창 시절 주구장창 바둑 기보만 보던 알파고의 성공에 자극을 받은 땅파고는 자신만의 스킬을 연마하기로 다짐한다. 그동안 갈고 닦았던 6가지 스킬을 자소서에 적기로 하는데... \n\n적게 일하고 많이 벌자! 무료한 주 52시간을 땅파고로 녹여보자!',
			markdown: true,
		},
		{
			type: 'button',
			action_type: 'submit_action',
			action_name: 'menu',
			text: '땅파고 스킬 보러가기',
			value: 'menu',
			style: 'default',
		},
	],
};