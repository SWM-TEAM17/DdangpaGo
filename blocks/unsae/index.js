exports.taro_selection_block = {
	conversationId: 1,
	text: '오늘의 타로 운세',
	blocks: [
		{
			type: 'header',
			text: '오늘의 타로 운세',
			style: 'blue',
		},
		{
			type: 'text',
			text:
				'잠시 눈을 감고 집중하신 후, 22장의 타로 카드 중에 원하는 카드 한 장을 신중하게 선택해주세요!',
			markdown: true,
		},
		{
			type: 'action',
			elements: [
				{
					type: 'button',
					text: '1번',
					action_type: 'submit_action',
					action_name: 'select_taro',
					value: 'unsae',
					style: 'primary',
				},
				{
					type: 'button',
					text: '2번',
					action_type: 'submit_action',
					action_name: 'select_taro',
					value: 'unsae',
					style: 'primary',
				},
				{
					type: 'button',
					text: '3번',
					action_type: 'submit_action',
					action_name: 'select_taro',
					value: 'unsae',
					style: 'primary',
				},
			],
		},
		{
			type: 'action',
			elements: [
				{
					type: 'button',
					text: '4번',
					action_type: 'submit_action',
					action_name: 'select_taro',
					value: 'unsae',
					style: 'primary',
				},
				{
					type: 'button',
					text: '5번',
					action_type: 'submit_action',
					action_name: 'select_taro',
					value: 'unsae',
					style: 'primary',
				},
				{
					type: 'button',
					text: '6번',
					action_type: 'submit_action',
					action_name: 'select_taro',
					value: 'unsae',
					style: 'primary',
				},
			],
		},
		{
			type: 'action',
			elements: [
				{
					type: 'button',
					text: '7번',
					action_type: 'submit_action',
					action_name: 'select_taro',
					value: 'unsae',
					style: 'primary',
				},
				{
					type: 'button',
					text: '8번',
					action_type: 'submit_action',
					action_name: 'select_taro',
					value: 'unsae',
					style: 'primary',
				},
				{
					type: 'button',
					text: '9번',
					action_type: 'submit_action',
					action_name: 'select_taro',
					value: 'unsae',
					style: 'primary',
				},
			],
		},
		{
			type: 'action',
			elements: [
				{
					type: 'button',
					text: '10번',
					action_type: 'submit_action',
					action_name: 'select_taro',
					value: 'unsae',
					style: 'primary',
				},
				{
					type: 'button',
					text: '11번',
					action_type: 'submit_action',
					action_name: 'select_taro',
					value: 'unsae',
					style: 'primary',
				},
				{
					type: 'button',
					text: '12번',
					action_type: 'submit_action',
					action_name: 'select_taro',
					value: 'unsae',
					style: 'primary',
				},
			],
		},
		{
			type: 'action',
			elements: [
				{
					type: 'button',
					text: '13번',
					action_type: 'submit_action',
					action_name: 'select_taro',
					value: 'unsae',
					style: 'primary',
				},
				{
					type: 'button',
					text: '14번',
					action_type: 'submit_action',
					action_name: 'select_taro',
					value: 'unsae',
					style: 'primary',
				},
				{
					type: 'button',
					text: '15번',
					action_type: 'submit_action',
					action_name: 'select_taro',
					value: 'unsae',
					style: 'primary',
				},
			],
		},
		{
			type: 'action',
			elements: [
				{
					type: 'button',
					text: '16번',
					action_type: 'submit_action',
					action_name: 'select_taro',
					value: 'unsae',
					style: 'primary',
				},
				{
					type: 'button',
					text: '17번',
					action_type: 'submit_action',
					action_name: 'select_taro',
					value: 'unsae',
					style: 'primary',
				},
				{
					type: 'button',
					text: '18번',
					action_type: 'submit_action',
					action_name: 'select_taro',
					value: 'unsae',
					style: 'primary',
				},
			],
		},
		{
			type: 'action',
			elements: [
				{
					type: 'button',
					text: '19번',
					action_type: 'submit_action',
					action_name: 'select_taro',
					value: 'unsae',
					style: 'primary',
				},
				{
					type: 'button',
					text: '20번',
					action_type: 'submit_action',
					action_name: 'select_taro',
					value: 'unsae',
					style: 'primary',
				},
				{
					type: 'button',
					text: '21번',
					action_type: 'submit_action',
					action_name: 'select_taro',
					value: 'unsae',
					style: 'primary',
				},
			],
		},
		{
			type: 'action',
			elements: [
				{
					type: 'button',
					text: '22번',
					action_type: 'submit_action',
					action_name: 'select_taro',
					value: 'unsae',
					style: 'primary',
				},
				{
					type: 'button',
					text: '없음',
					style: 'default',
				},
				{
					type: 'button',
					text: '없음',
					style: 'default',
				},
			],
		},
	],
};

exports.taro_result_block = {
	conversationId: 1,
	text: '오늘의 타로 카드를 소개해드립니다',
	blocks: [
		{
			type: 'text',
			text: '🔯 여황제 🔯',
			markdown: true,
		},
		{
			type: 'text',
			text: '다산. 풍요. 아름다움. 사치. 교만',
			markdown: true,
		},
		{
			type: 'text',
			text:
				'내가 원하는 모든 것을 얻을 수 있다. 욕심이 과하면 희생을 요구하는 법이니 내가 원하는 것을 잘 정해야 한다. 얻을 것은 더욱 많지만 그건 나의 행동과 처신에 달려있다.',
			markdown: true,
		},
		{
			type: 'divider',
		},
		{
			type: 'text',
			text:
				'풍요를 상징하는 3번 카드를 뽑으셨습니다. 매력과 풍요 그리고 확장을 상징하지요. 마음에 여유가 느껴지는 하루가 될 것입니다. 이 카드의 본연적 의미는 임신을 상징합니다. 고전적 의미는 임신을 통한 생산력의 확대를 상징하게 되는 것입니다. 돈이 들어올 수도 있고 선물을 받을 수도 있으며 마음에 드는 사람에게 실속 있는 선물을 하게 되는 경우도 있습니다. 물질의 의미가 강한 카드여서 물질적으로 좋은 느낌을 갖게 됩니다. 매력이 있는 카드이니 새로운 사람을 만나게 되면 즐거운 자리를 가질 수 있습니다. 내가 있었으면 하는 자리가 생길 겁니다. 즐거운 일들이 생길 것이며 내가 돋보이는 하루가 될 것입니다. 새로운 계획을 세우는 것이 좋으며 지루하게 보내기에는 아까운 하루가 될 것입니다. 어느 자리에 참여해도 충분히 유쾌한 일들이 일어날 것입니다.',
			markdown: true,
		},
		{
			type: 'image_link',
			url: 'https://img.daily.co.kr/www.daily.co.kr/unse/tarot/img_card00.png',
		},
		{
		    type: 'button',
		    text: '타로카드 다시 뽑기',
			action_type: 'submit_action',
			action_name: 'show_taro',
			value: 'unsae',
		    style: 'default'
		},
		{
		    type: 'button',
		    text: '또파고⛏',
			action_type: 'submit_action',
			action_name: 'menu',
			value: 'menu',
		  style: 'default'
		}
	],
};