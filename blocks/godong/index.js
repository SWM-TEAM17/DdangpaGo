exports.ask_modal = {
	view: {
			title: '마법의 소라고동',
			accept: '확인',
			decline: '취소',
			value: 'question_for_godong',
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
};

exports.start_message = {
	conversationId: 1,
	text: '마법의 소라고동',
	blocks: [
		{
		  "type": "image_link",
		  "url": "https://ddangpago-test-vrzpe.run.goorm.io/godong/start.jpg",
		},
		{
			type: 'button',
			action_type: 'call_modal',
			value: 'ask_godong',
			text: '소라고동에게 물어보기',
			style: 'default',
		},
	],
}

exports.answer_message = {
	conversationId: 1,
	text: '',
	blocks: [
		{
			type: 'image_link',
			url: '',
		},
		{
			type: 'text',
			text: '',
			markdown: true,
		},
		{
			type: "divider"
		},
		{
			type: 'action',
			elements: [
				{
					type: 'button',
					action_type: 'call_modal',
					value: 'ask_godong',
					text: '다시 물어보기',
					style: 'default',
				},
				{
					type: 'button',
					action_type: 'submit_action',
					action_name: 'start_ddangpago',
					value: 'start_ddangpago',
					text: '땅파고 기능 더보기',
					style: 'default',
				},
			],
		},
	],
}