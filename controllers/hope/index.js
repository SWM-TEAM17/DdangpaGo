const libKakaoWork = require('../../libs/kakaoWork');
const hopeBlock = require('../../blocks/hope');
const mainBlock = require('../../blocks/main');
const axios = require('axios');
const Config = require('config');
const mongoose = require('mongoose');
const { User } = require('../../models/user');

mongoose
	.connect(
		`mongodb+srv://MYS:${Config.keys.mongodb.key}@cluster0.8ka5z.mongodb.net/swm?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		}
	)
	.then(() => console.log('MongoDB connected...'))
	.catch((error) => console.log(error));

exports.hope_modal = async ({ req, res, next }) => {
	const { message, action_name, action_time, react_user_id, value } = req.body;
	let response = {};

	switch (value) {
		case 'hope_problem_solve':
			// 사용자 정보 가져오기
			const user = await User.findOne({ user_id: react_user_id });
			// 문제 정보 가져오기

			// 지금 기원할 수 있는지 판단
			const time_last = user.last_hope ? user.last_hope.split('T') : [];
			const time_now = action_time.split('T');

			console.log(`last hope time of ${user.name} is ${user.last_hope}, ${time_last}`);
			let hopable = false;
			if (time_last == []) {
				hopable = true;
			} else {
				const date_last = Number(time_last[0].split('-')[2]);
				const date_now = Number(time_now[0].split('-')[2]);

				if (date_last < date_now) {
					hopable = true;
				}
			}

			// 기원 문제 풀기 전송
			if (hopable) {
				response = hopeBlock.hope_problem_solve_pass_block;
				response.view.blocks[0].text = `*${user.name}*님은 퇴사 기원 ${user.hope_val}일차 입니다.`;
			} else {
				response = hopeBlock.hope_problem_solve_reject_block;
			}
			break;
		case 'hope_ranking':
			const users = await User.find({}).sort({ hope_val: -1 });
			response = hopeBlock.hope_ranking_block;
			response.view.blocks = [];
			for (let i = 0; i < users.length && i < 10; i++) {
				response.view.blocks.push({
					type: 'label',
					text: `*${users[i].hope_val}점* - ${users[i].name}`,
					markdown: true,
				});
			}

			break;
		default:
	}

	response.conversationId = message.conversation_id;

	return res.json(response);
};

exports.hope_message = async ({ req, res, next }) => {
	const { message, actions, action_name, react_user_id, action_time, value } = req.body;
	let response = {};

	switch (value) {
		case 'menu':
			response = mainBlock.ddanpago_main_block;
			break;
		case 'hope_menu':
			// 데이터베이스에 없으면 새로 등록
			const found = await User.findOne({ user_id: react_user_id });

			if (!found) {
				console.log('[+] new user');
				const user_info = await libKakaoWork.getUser(react_user_id);

				const new_user = new User({
					user_id: react_user_id,
					name: user_info.name,
					hope_val: 0,
				});

				await new_user.save((err, userInfo) => {});
			}

			response = hopeBlock.hope_menu_block;
			break;
		case 'hope_problem':
			const user = await User.findOne({ user_id: react_user_id });

			await User.replaceOne(
				{ user_id: user.user_id },
				{
					user_id: user.user_id,
					name: user.name,
					hope_val: user.hope_val + 1,
					last_hope: action_time,
				}
			);

			response = hopeBlock.hope_problem_block;
			response.blocks[2].content.text = `${actions.answer}`;
			response.blocks[4].text = `*${user.name}* 퇴사 기원 ${user.hope_val + 1}일째`;
			break;
		default:
	}

	response.conversationId = message.conversation_id;

	try {
		await libKakaoWork.sendMessage(response);
	} catch (error) {
		console.log(error);
	}
	return;
};