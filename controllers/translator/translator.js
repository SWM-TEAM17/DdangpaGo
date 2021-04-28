const libKakaoWork = require('../../libs/kakaoWork');
const axios = require('axios');
const Config = require('config');
const { User } = require('../../models/user');


exports.trans_modal = async ({ req, res, next }) => {
	const { message, value } = req.body;

	switch (value) {
		case 'korean_translator':
			// 설문조사용 모달 전송 (3)
			return res.json({
				view: {
					title: '한국인만 알아볼 수 있는 번역기',
					accept: '번역하기',
					decline: '취소',
					value: 'korean_translator_results',
					blocks: [
					{
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
						required: false,
						placeholder: 'ex) 이 편지는 영국에서부터 시작되어 일년에 한 바퀴를 돌며 사람들에게 행운을 주었고...',
					},
					],
				},
			});
			break;
		default:
	}

	res.json({});
};

exports.trans_message = async (req, res, next) => {
	const { message, actions, action_time, value } = req.body;
	console.log(req);
	switch (value) {
	case 'callStartScreen':
	await libKakaoWork.sendMessage({
	conversationId: message.conversation_id,
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
			]})
	
      
	break;		
			
    case 'korean_translator_results':
			
	//console.log(req.body);
      // 설문조사 응답 결과 메세지 전송 (3)
      await libKakaoWork.sendMessage({
        conversationId: message.conversation_id,
        text: '한국인만 알아볼 수 있는 번역 완료!',
        blocks: [
          {
            type: 'text',
            text: '*🤷한국인만 알아볼 수 있는 번역기 *',
            markdown: true,
          },
          {
            type: 'text',
            text: '*입력한 내용*',
            markdown: true,
          },
		  {
            type: 'text',
            text: actions.before_translate,
            markdown: false,
          },
		  {
            type: 'text',
            text: '*번역 결과!*',
            markdown: true,
          },
		  {
            type: 'text',
            text: translation(actions.before_translate, actions.translate_option),
            markdown: false,
          },
		  {
		    type: "action",
      	    elements: [
          {
          	type: "button",
          	text: "한 번 더 하기",
			action_type: 'call_modal',
            value: 'korean_translator',
          	style: "primary"
          },
          {
          	type: "button",
          	text: "땅파고 기능 더보기",
			action_type: 'submit_action',
			value: 'callStartScreen',
          	style: "default"
          }
        ]	
	  }	
        ],
      });
      break;
    default:
  }

  res.json({ result: true });
};


//초성 19개
const init = [ "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ",
                "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ","ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ" ]
//중성 21개
const mid = [ "ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ",
                 "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ" ];
//종성 28개(종성이 없는 것 포함)
const fin = [ "", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ",
                 "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ","ㅄ", "ㅅ", "ㅆ",
                 "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ","ㅍ", "ㅎ" ];



//문자 하나를 입력 받아 초성 중성 종성을 반환
var seperate = function(Char){
	//'가'로부터 떨어진 크기
	var offset = Char.charCodeAt(0) - 44032;
	
	//초성 중성 종성 값 생성
	var _first = parseInt(offset / 588); //초성은 offset 588 마다 변한다.
	var _second = parseInt((offset / 28) % 21);	//중성은 offset 28 마다 변한다.
	var _third = parseInt(offset % 28); //종성은 매 offset 마다 변한다.
	return {
		first: init[_first],
		second: mid[_second],
		third: fin[_third],
	}
}


//초성 중성 종성 병합
var mergeChar = function(_seperatedChar){
	var _first = init.findIndex(function(element) {
		if(element == _seperatedChar.first) return true;
	});
	var _second = mid.findIndex(function(element) {
		if(element == _seperatedChar.second) return true;
	});
	var _third = fin.findIndex(function(element) {
		if(element == _seperatedChar.third) return true;
	});

	var uniVal = 44032 + _first*588 + _second*28 + _third;
	
	return String.fromCharCode(uniVal);
}


//문자열 번역
var translation = function(korean){
	
	var ret = '';
	for(var i = 0 ; i < korean.length; i++){

		//'가'보다 작거나 '힣'보다 큰 유니코드는 분리X
		if(korean[i].charCodeAt(0) < 44032 || korean[i].charCodeAt(0) > 55203){
			ret +=korean[i];
			continue;
		}
		
		//초성 중성 종성 분리
		var seperatedChar = seperate(korean[i]);
		
		//중성 모음을 변경
		switch(seperatedChar.second){
			case "ㅏ":
				seperatedChar.second = 'ㅑ';
			break;
			case "ㅐ":
				seperatedChar.second = 'ㅒ';
			break; 
			case "ㅑ":
				seperatedChar.second = 'ㅏ';
			break;
			case "ㅒ":
				seperatedChar.second = 'ㅐ';
			break;
			case "ㅓ":
				seperatedChar.second = 'ㅕ';
			break;
			case "ㅔ":
				seperatedChar.second = 'ㅖ';
			break;
			case "ㅕ":
				seperatedChar.second = 'ㅓ';
			break;
			case "ㅖ":
				seperatedChar.second = 'ㅔ';
			break;
			case "ㅗ":
				seperatedChar.second = 'ㅛ';
			break;
			case "ㅘ":
			break;
			case "ㅙ":
				seperatedChar.second = 'ㅚ';
			break;
			case "ㅚ":
				seperatedChar.second = 'ㅙ';
			break;
			case "ㅛ":
				seperatedChar.second = 'ㅗ';
			break;
			case "ㅜ":
				seperatedChar.second = 'ㅠ';
			break;
			case "ㅝ":
				seperatedChar.second = 'ㅞ';
			break;
			case "ㅞ":
			break;
			case "ㅟ":
			break;
			case "ㅠ":
				seperatedChar.second = 'ㅜ';
			break;
			case "ㅡ":
			break;
			case "ㅢ":
			break;
			case "ㅣ":
			break;
		}
		
		//초성 중성 종성 병합
		ret += mergeChar(seperatedChar);
	}
//	console.log(ret);
	return ret;
};


//translation('이 편지는 영국에서 시작되어');
module.exports = translation;