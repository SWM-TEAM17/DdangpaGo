exports.ask_modal = {
	view: {
		title: '야민정음 번역기',
		accept: '번역하기',
		decline: '취소',
		value: 'trans_ask_message',
		blocks: [
		{
			required: true,
			type: "select",
			name: "translate_option",
			options: [
			{
			  text: "유튜쁘 떘끌 외쿸인뜰이 몼알아뽀꼐 하끼",
			  value: "1"
			},
			{
			  text: "캠릿브지 대학의 연결구과에 따르면",
			  value: "2"
			},
			{
			  text: "야민정음",
			  value: "3"
			},     
			],
			placeholder: "사용 목적을 말해주세요."
		},
		{
			type: 'label',
			text: '번역하고자 하는 문장을 입력하세요.',
			markdown: false,
		},
		{
			type: 'input',
			name: 'before_translate',
			required: true,
			placeholder: 'ex) 머전팡역시 띵문 머학교 머전머학교에 다니는 윾재석을 닮은 앵귀리지 한인회 출신 머대리 괴꺼솟...',
		},
		],
	},
};
