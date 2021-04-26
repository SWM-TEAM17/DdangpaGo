

const express = require('express');
const router = express.Router();

const libKakaoWork = require('../libs/kakaoWork');

router.get('/', async (req, res, next) => {
  // 유저 목록 검색 (1)
  const users = await libKakaoWork.getUserList();

  // 검색된 모든 유저에게 각각 채팅방 생성 (2)
  const conversations = await Promise.all(
    users.map((user) => libKakaoWork.openConversations({ userId: user.id }))
  );
 
	
	const messages = await Promise.all([
		conversations.map((conversation) =>
			libKakaoWork.sendMessage({
				conversationId: conversation.id,
				text: "땅파고 메시지",
  				blocks: [
    			{
      				type: "header",
      				text: "땅파고👷",
      				style: "blue"
    			},
    			{
      				type: "button",
      				text: "마법의 소라고동",
      				style: "default"
    			},
    			{
					type: "button",
					text: "한국인만 알아볼수 있는 번역기",
					action_type: 'call_modal',
            		value: 'korean_translator',
					style: "default"
				},
				{
					type: "button",
					text: "피보나치킨",
					style: "default"
				},
				{
					type: "button",
					text: "퇴근시간 타이머",
					action_type: 'call_modal',
					value: 'timer',
					style: "default"
				},
				{
					type: "button",
					text: "기원",
					style: "default"
				},
				{
					type: "button",
					text: "운세 뽑기",
					style: "default"
				}
			],
		  })
		),
	]);
	// 응답값은 자유롭게 작성하셔도 됩니다.
	res.json({
		result: true,
	});

	/*
  res.json({
    users,
    conversations,
    messages,
  });
  
  */

});


router.post('/request', async (req, res, next) => {
	
  const { message, value } = req.body;
  //console.log(req.body);
  switch (value) {
    case 'timer':
      //모달 전송
	  option = [
		  {
			  "text":"시",
			  "value":"시"
		  },
		  {
			  "text":"분",
			  "value":"분"
		  },
		  {
			  "text":"초",
			  "value":"초"
		  },
		  {
			  "text":"밀리초",
			  "value":"밀리초"
		  }
	  ]
	  
      return res.json({
        view: {
          title: '퇴근시간 입력',
          accept: '타이머 맞추기',
          decline: '취소',
          value: 'timer_results',
          blocks: [
            {
              type: 'label',
              text: '퇴근시간을 입력하세요',
              markdown: false,
            },
            {
              type: 'input',
              name: 'time',
              required: true,
              placeholder: '07시05분',
            },
			{
				type: 'select',
				name: 'time_type',
				required: true,
				text: "알림을 받고싶은 시간단위 입력(시/분/초/밀리초)",
				action_type: 'call_modal',
				options: option,
				style: "default"
			},
			
          ],
        },
      });
      break;
    default:
  }

  res.json({});
});

router.post('/callback', async (req, res, next) => {
  let today = new Date();   
  let hours = (today.getHours()+9)%24; // 시
  let minutes = today.getMinutes();  // 분
  let seconds = today.getSeconds();  // 초
  let milliseconds = today.getMilliseconds(); 
  //console.log(req.body);
  const { message, actions, action_time, value } = req.body; 
  
  switch (value) {
    case 'timer_results':
	  console.log(req.body.actions.time);
	  ti = req.body.actions.time;
	  t_t = req.body.actions.time_type;
	  var remain;
	  let lagging_time;
	  if(t_t == '시'){
		  remain = Math.floor(parseInt(ti[0])*10+parseInt(ti[1])-parseInt(hours));
	  }else if(t_t == '분'){
		  remain = Math.floor((parseInt(ti[0])*600+parseInt(ti[1]))*60 - hours*60 - minutes);
	  }else if(t_t == '초'){
		  remain = Math.floor((parseInt(ti[0])*36000+parseInt(ti[1])*3600+parseInt(ti[3])*600+parseInt(ti[4])*60) - (hours*3600+minutes*60+seconds));
	  }else{
		  remain = Math.floor((parseInt(ti[0])*36000+parseInt(ti[1])*3600+parseInt(ti[3])*600+parseInt(ti[4])*60)*1000 - (hours*3600+minutes*60+seconds)*1000-milliseconds);
	  }
	  console.log(remain);
	  remain = (remain <= 0? 0: remain);
	  console.log(remain+t_t);
	  lagging_time = Math.floor((parseInt(ti[0])*36000+parseInt(ti[1])*3600+parseInt(ti[3])*600+parseInt(ti[4])*60) - (hours*3600+minutes*60+seconds));
	  await setTimeout(()=>{
		  libKakaoWork.sendMessage({
        	conversationId: message.conversation_id,
        	text: '알림이 울립니다.',
        	blocks: [
            	{
              		type: 'text',
              		text: '퇴근시간이 되었습니다.',
             		 markdown: true,
            	}
        	]
      });
	  },lagging_time*1000);
      await libKakaoWork.sendMessage({
        conversationId: message.conversation_id,
        text: '퇴근시간 알림이 등록되었습니다.',
        blocks: [
            {
              type: 'text',
              text: '퇴근시간 알림이 등록되었습니다.',
              markdown: true,
            },
			{
				type: 'text',
              	text: `남은시간은 ${remain}${t_t} 입니다.`,
                markdown: true,
			}
        ]
      });
      break;
    default:
  }

  res.json({ result: true });
});


module.exports = router;

