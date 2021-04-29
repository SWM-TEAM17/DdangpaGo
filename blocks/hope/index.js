exports.hope_ranking_block = {
	view: {
		title: '퇴사 기원 랭킹',
		accept: '확인',
		decline: '취소',
		value: 'blank',
		blocks: [],
	},
};

exports.hope_problem_solve_pass_block = {
	view: {
		title: 'modal title',
		accept: '확인',
		decline: '취소',
		value: 'hope_problem',
		blocks: [
			{
				type: 'label',
				text: 'dump',
				markdown: true,
			},
			{
				type: 'label',
				text: '사직서 던지는 그날까지! 오늘도 퇴사를 기원하세요',
			},
			{
				type: 'select',
				name: 'answer',
				options: [
					{
						text: '네',
						value: '네',
					},
					{
						text: '그럼요',
						value: '그럼요',
					},
					{
						text: '당연하죠',
						value: '당연하죠',
					},
				],
				required: true,
				placeholder: '퇴사하고 싶으신가요?',
			},
		],
	},
};

exports.hope_problem_solve_reject_block = {
	view: {
		title: '퇴사 기원하기',
		accept: '확인',
		decline: '취소',
		value: 'unhopable',
		blocks: [
			{
				type: 'label',
				text: '*오늘은 이미 기원하셨습니다.* 🛑',
				markdown: true,
			},
			{
				type: 'label',
				text: '퇴사 기원은 하루에 한번만 가능합니다',
				markdown: true,
			},
		],
	},
};

exports.hope_menu_block = {
	conversationId: 1,
	text: 'Push alarm message',
	blocks: [
		{
			type: 'header',
			text: '퇴사 기원하기',
			style: 'blue',
		},
		{
			type: 'text',
			text: '원하시는 메뉴를 선택해주세요',
			markdown: true,
		},
		{
			type: 'button',
			text: '퇴사 기원하기',
			action_type: 'call_modal',
			value: 'hope_problem_solve',
			style: 'default',
		},
		{
			type: 'button',
			text: '기원 랭킹 보기',
			action_type: 'call_modal',
			value: 'hope_ranking',
			style: 'default',
		},
		{
			type: 'divider',
		},
		{
			type: 'button',
			text: '또파고⛏',
			action_type: 'submit_action',
			action_name: 'menu',
			value: 'menu',
			style: 'default',
		},
	],
};

exports.hope_problem_block = {
	conversationId: 1,
	text: 'Push alarm message',
	blocks: [
		{
			type: 'text',
			text: '🙏 퇴사 기원을 시도하였습니다',
			markdown: true,
		},
		{
			type: 'text',
			text: '*답변 내용*',
			markdown: true,
		},
		{
			type: 'description',
			term: '선택',
			content: {
				type: 'text',
				text: 'dump',
				markdown: false,
			},
			accent: true,
		},
		{
			type: 'text',
			text: '퇴사 기원에 성공하였습니다! 🎉',
			markdown: true,
		},
		{
			type: 'text',
			text: 'dunp',
			markdown: true,
		},
	],
};