const libKakaoWork = require('../../libs/kakaoWork');
const unsaeBlock = require('../../blocks/unsae');
const mainBlock = require('../../blocks/main');
const axios = require('axios');

exports.taro_controller = async ({ req, res, next }) => {
	const { message, action_name, action_time, value } = req.body;
	let response = {};

	switch (action_name) {
		case 'show_taro':
			response = unsaeBlock.taro_selection_block;
			break;
		case 'select_taro':
			const selected_num = select_random_num({ min: 1, max: 22 });
			const zero_padded_num = get_zero_padded_num({ num: String(selected_num) });
			const taro_img_url = `https://img.daily.co.kr/www.daily.co.kr/unse/tarot/img_card${zero_padded_num}.png`;
			const day = get_day_from_server_time({ action_time });
			const taro_result = await get_taro_result({ selected_num, day });

			response = unsaeBlock.taro_result_block;
			response.blocks[0].text = `🔯 ${taro_result.tarotcardname_lang} 🔯`;
			response.blocks[1].text = taro_result.keyword;
			response.blocks[2].text = taro_result.define;
			response.blocks[4].text = taro_result.cons;
			response.blocks[5].url = taro_img_url;	
			break;
		case 'back_to_main':
			response = mainBlock.ddanpago_main_block;
			break;
		default:
			break;
	}

	response.conversationId = message.conversation_id;
	
	console.log(response);
	try {
		await libKakaoWork.sendMessage(response);
	} catch (error) {
		console.log(error);
	}

	return;
};

const get_day_from_server_time = ({ action_time }) => {
	const year_day_date = action_time.split('T')[0];
	const year_day_date_array = year_day_date.split('-');
	return year_day_date_array.join('');
};

const get_zero_padded_num = ({ num }) => {
	return num.padStart(2, '0');
};

const select_random_num = ({ min, max }) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
};

const get_taro_result = async ({ selected_num, day }) => {
	let taro_result = {};
	console.log('시도중....');
	const response = await axios({
		url: 'https://unse.daily.co.kr',
		method: 'get',
		responseType: 'json',
		params: { p: 'tarot', taroSelectedNum: selected_num, day: day },
	});
	let data = response.data;
	if (data[data.length - 1] === ')') {
		// data[data.length - 1] = ''
		data = data.substring(0, data.length - 1);
	}
	if (data[0] === '(') {
		// data[0] = ''
		data = data.substring(1, data.length);
	}
	taro_result = JSON.parse(data);
	// console.log(taro_result);
	return taro_result;
};