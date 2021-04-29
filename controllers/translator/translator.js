const libKakaoWork = require('../../libs/kakaoWork');
const blocks = require('../../blocks/translator');
const mainBlock = require('../../blocks/main');

exports.translator_modal = async ({ req, res, next }) => {
	const { message, value } = req.body;
	
	let response = {};

	response = blocks.ask_modal;

	response.conversationId = message.conversation_id;
	res.json(response);
	return;
}

exports.translator_message = async ({req, res, next}) => {
	const { message, actions, action_time, value } = req.body;
	switch (value) {
		case 'main':
			let tmpblock = mainBlock.ddanpago_main_block;
			tmpblock.conversationId = message.conversation.id;
			await libKakaoWork.sendMessage(tmpblock);
			break;
    	case 'trans_ask_message':
			
			await libKakaoWork.sendMessage({
        		conversationId: message.conversation_id,
        		text: '한국인만 알아볼 수 있는 번역 완료!',
        		blocks: [
          		{
            		type: 'text',
            		text: '*🤷야민정음 번역기*',
            		markdown: true,
          		},
				{
					type: 'image_link',
					url: 'https://swm-chatbot-mptw3r-mxrmlo.run.goorm.io/translator/Sejong.jpg',
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
            		text:translation(actions.before_translate, actions.translate_option),
            		markdown: false,
          		},
		  		{
		    		type: "action",
      	    		elements: [
          			{
          				type: "button",
          				text: "한 번 더 하기",
						action_type: 'call_modal',
            			value: 'trans_ask_message',
          				style: "primary"
          			},
          			{
						type: 'button',
						action_type: 'submit_action',
						action_name: 'menu',
						value: 'menu',
						text: '또과고⛏',
						style: 'default',
          			}
	  				]
				}	
        		],
      		});
        break;	
    	default:
			break;
    }
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


//초성과 중성, 중성을 시프트 키 누른 것처럼 요상하게 변경
var transShiftEffect = function(korean){
	
	var ret = '';
	for(var i = 0 ; i < korean.length; i++){

		//'가'보다 작거나 '힣'보다 큰 유니코드는 분리X
		if(korean[i].charCodeAt(0) < 44032 || korean[i].charCodeAt(0) > 55203){
			ret +=korean[i];
			continue;
		}
		
		//초성 중성 종성 분리
		var seperatedChar = seperate(korean[i]);
		
		//초성변경
		switch(seperatedChar.first){
			case "ㄱ":
				seperatedChar.first = 'ㄲ';
			break;
			case "ㄷ":
				seperatedChar.first = 'ㄸ';
			break; 
			case "ㅂ":
				seperatedChar.first = 'ㅃ';
			break;
			case "ㅅ":
				seperatedChar.first = 'ㅆ';
			break;
			case "ㅈ":
				seperatedChar.first = 'ㅉ';
			break;
			default:
			break;
		}
		
		//중성변경
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
			break;
			default:
			break;
		}
		
		//종성변경
		switch(seperatedChar.third){
			case "":
				if(Math.random() > 0.7)
					seperatedChar.third = fin[Math.floor(Math.random() * 28)];
			break;
			case "ㄱ":
				seperatedChar.third = "ㄲ";
			break;
			case "ㄲ":
				seperatedChar.third = "ㄳ";
			break;
			case "ㄴ":
				seperatedChar.third = "ㄵ";
			break;
			case "ㄵ":
				seperatedChar.third = "ㄴ";
			break;
			case "ㄶ":
				seperatedChar.third = "ㄴ";
			break;
			case "ㄶ":
				seperatedChar.third = "ㄴ";
			break;
			case "ㄹ":
				seperatedChar.third = "ㄾ";
			break;
			case "ㅂ":
				seperatedChar.third = "ㅄ";
			break;
			case "ㅅ":
				seperatedChar.third = "ㅆ";
			break;
			default:
			break;
		}
		
		//초성 중성 종성 병합
		ret += mergeChar(seperatedChar);
	}
	return ret;
};

//'캠릿브지'처럼 가운데 두 글자 바꾸기 
var transCambridge = function(korean){
	
	var ret = '';
	var words = korean.split(' ');	//단어를 기준으로 나누기

	for(var i = 0 ; i < words.length; i++){
		//길이가 4이하인 단어는 변경 안 함
		if(words[i].length < 4){
			ret += words[i]+' ';
			continue;
		}
		
		//단어 안의 두 번째, 세 번째 문자 swap
		var temp = words[i][2];
		words[i] = words[i].replace(words[i][2], words[i][1]);
		words[i] = words[i].replace(words[i][1], temp);
		
		ret += words[i]+' ';
	}
	return ret.slice(0,-1);	//마지막 공백 문자 제거
};

var transYamin = function(korean){
	
	var ret = '';
	for(var i = 0 ; i < korean.length; i++){

		//'가'보다 작거나 '힣'보다 큰 유니코드는 분리X
		if(korean[i].charCodeAt(0) < 44032 || korean[i].charCodeAt(0) > 55203){
			ret +=korean[i];
			continue;
		}
		
		//초성 중성 종성 분리
		var seperatedChar = seperate(korean[i]);
		
		//https://namu.wiki/w/%EC%95%BC%EB%AF%BC%EC%A0%95%EC%9D%8C#s-3.1 참고
		if(seperatedChar.first == 'ㄷ' && seperatedChar.second =='ㅐ'){
			seperatedChar.first ='ㅁ';
			seperatedChar.second ='ㅓ';
		}
		else if(seperatedChar.first=='ㅁ' && seperatedChar.second =='ㅓ'){
			seperatedChar.first ='ㄷ';
			seperatedChar.second='ㅐ';
		}
		else if(seperatedChar.first == 'ㅁ' && seperatedChar.second =='ㅕ'){
			seperatedChar.first ='ㄸ';
			seperatedChar.second ='ㅣ';
		}
		else if(seperatedChar.first=='ㄸ' && seperatedChar.second =='ㅣ'){
			seperatedChar.first ='ㅁ';
			seperatedChar.second='ㅕ';
		}
		else if(seperatedChar.first=='ㄱ' && seperatedChar.second =='ㅟ'){
			seperatedChar.first ='ㅋ';
			seperatedChar.second='ㅓ';
		}
		else if(seperatedChar.first=='ㅋ' && seperatedChar.second =='ㅓ'){
			seperatedChar.first ='ㄱ';
			seperatedChar.second='ㅟ';
		}
		else if(seperatedChar.first=='ㅍ' && seperatedChar.second =='ㅏ'){
			seperatedChar.first ='ㄱ';
			seperatedChar.second='ㅘ';
		}
		else if(seperatedChar.first=='ㄱ' && seperatedChar.second =='ㅘ'){
			seperatedChar.first ='ㅍ';
			seperatedChar.second='ㅏ';
		}		
		else if(seperatedChar.first=='ㅍ' && seperatedChar.second =='ㅣ'){
			seperatedChar.first ='ㄲ';
			seperatedChar.second='ㅢ';
		}
		else if(seperatedChar.first=='ㅂ' && seperatedChar.second =='ㅣ'){
			seperatedChar.first ='ㄴ';
			seperatedChar.second='ㅔ';
		}
		else if(seperatedChar.first=='ㄴ' && seperatedChar.second =='ㅔ'){
			seperatedChar.first ='ㅂ';
			seperatedChar.second='ㅣ';
		}
		else if(seperatedChar.first=='ㅇ' && seperatedChar.second =='ㅠ' && seperatedChar.third==''){
			seperatedChar.first ='ㅇ';
			seperatedChar.second='ㅡ';
			seperatedChar.third='ㄲ';
		}
		else if(seperatedChar.first=='ㅇ' && seperatedChar.second =='ㅡ' && seperatedChar.third=='ㄲ'){
			seperatedChar.first ='ㅇ';
			seperatedChar.second='ㅠ';
			seperatedChar.third='';
		}
		else if(seperatedChar.first=='ㅃ' && seperatedChar.second =='ㅣ'){
			seperatedChar.first ='ㅂ';
			seperatedChar.second='ㅖ';
		}
		else if(seperatedChar.first=='ㅂ' && seperatedChar.second =='ㅖ' ){
			seperatedChar.first ='ㅃ';
			seperatedChar.second='ㅣ';
		}
		else if(seperatedChar.first=='ㅇ' && seperatedChar.second =='ㅟ' && seperatedChar.third==''){
			seperatedChar.first ='ㅇ';
			seperatedChar.second='ㅣ';
			seperatedChar.third='ㄲ';
		}
		else if(seperatedChar.first=='ㅇ' && seperatedChar.second =='ㅣ' && seperatedChar.third=='ㄲ'){
			seperatedChar.first ='ㅇ';
			seperatedChar.second='ㅟ';
			seperatedChar.third='';
		}
		
		//초성 중성 종성 병합
		ret += mergeChar(seperatedChar);
	}
	return ret;
};



var translation = function(korean, option){
	switch(option){
		
		//자음 모음 변경
		case "1":
			return transShiftEffect(korean);
		
		//캠브릿지 연구 결과
		case "2":
			return transCambridge(korean);
		
		//야민정음
		case "3":
			return transYamin(korean);
	}
	
}