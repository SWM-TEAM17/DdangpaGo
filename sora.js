exports.ask_sora_modal = {
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
};

exports.from_sora = function(conversation_id) {
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

	return {
				conversationId: conversation_id,
				text: answer[no],
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
			};
};

exports.start_sora = function(conversation_id) {
	return {
				conversationId: conversation_id,
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
			};
};