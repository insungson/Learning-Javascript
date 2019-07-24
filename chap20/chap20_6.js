const debug = require('debug')('main'); //모듈이 반환하는 함수를 즉시 호출할 수 있다.

console.log(debug("starting")); // 디버그가 활성화되어 있으면 "main starting +0ms" 라는 로그가 생긴다.

//debug 모듈은 함수를 반환하는 것을 알 수 있고, 최종적으로 반환된 함수는 첫번째 함수에 넘긴 문자열을 '기억'
//한다는 것을 알 수 있다.  아래의 예제에서 main이란 문자열을 사용하도록 debug 모듈을 커스터마이즈 할 것이다.

let lastMessage;
module.exports = function(prefix){
    return function (message) {
        //let lastMessage; //*chap20_7.js에서 독립적인 디버그 로그를 여러개 기록하고 싶으면 이걸 여기 넣으면
                            // 서로 다른 타임스템프를 유지하므로 디버그 로그 역시 독립적으로 운영할 수 있다.
        const now = Date.now();
        const sinceLastMessage = now -(lastMessage || now);
        console.log(`${prefix} ${message} +${sinceLastMessage}ms`);
        lastMessage = now;
      }
}

//lastMessage를 함수 바깥에 지정하면 debug1에서 한번 사용하고 값이 