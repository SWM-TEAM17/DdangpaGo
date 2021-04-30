const libKakaoWork = require('../../libs/kakaoWork');
const hopeBlock = require('../../blocks/hope');
const axios = require('axios');
const Config = require('config');
const mongoose = require('mongoose');
const { User } = require('../../models/user');
const hopeImageArray = ['hope.gif', 'hope2.jpg', 'hope3.jpg'];

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
			const time_last = user.last_hope ? user.last_hope.split('T') : false;
			const time_now = action_time.split('T');

			let hopable = false;
			if (!time_last) {
				hopable = true;
			} else {
				const date_last = Number(time_last[0].split('-')[2]);
				const date_now = Number(time_now[0].split('-')[2]);

				if (date_last < date_now) {
					hopable = true;
				}
			}

			// 기원 문제 풀기 전송
			if (true) {
				// ** 중요 잠시 테스트 때문에 true로 바꿔둠
				response = hopeBlock.hope_problem_solve_pass_block;
				response.view.blocks[0].text = `*${user.name}*님의 ${user.hope_val}번째 퇴사 기원 입니다.`;
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
					text: `${i+1}등. *${users[i].hope_val}점* - ${users[i].name}`,
					markdown: true,
				});
			}
			console.log(response);

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
			const image = hopeImageArray[Math.floor(Math.random() * hopeImageArray.length)];

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
			response.blocks[2].text = `${actions.answer}! 당장이라도 퇴사하고 싶어요`;
			response.blocks[3].text = `*${user.name}*님의 ${user.hope_val + 1}번째 퇴사 기원`;
			response.blocks[4].url = `https://swm-chatbot-mptw3r-mxrmlo.run.goorm.io/hope/${image}`
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