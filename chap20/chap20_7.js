const debug1 = require('./chap20_6')('one');
const debug2 = require('./chap20_6')('two');
debug1('started first debugger!');
debug2('started second debugger!');
setTimeout(() => {
    debug1('after some time...');
    debug2('what happens?');
}, 200);

// one started first debugger! +0ms
// two started second debugger! +0ms
// one after some time... +200ms
// two what happens? +200ms
//원래는 위에처럼 나와야 하는데...

// one started first debugger! +0ms
// two started second debugger! +0ms
// one after some time... +203ms
// two what happens? +3ms
//위와 같이 나온다. 

//*노드는 노드앱을 실행할 때 어떤 모듈이든 단 한번만 임포트 한다! 
//따라서 debug 모듈을 두번 임포트 하더라도, 노드는 해당 모듈을 이미 임포트했음을 인식하고
//다시 임포트하지는 않는다. 그래서 setTimeout에서는 첫번째는 setTimeout이 걸려서 200ms 뒤에 되지만.
//두번째는 setTimeout이 적용 안되서 나오는 것이다.
//debug1,2는 서로 다른 함수지만, 둘은 chap20_6.js에서 같은 lastMessage를 참조한다.
//(만약 lastMessage를 함수 안으로 넣어서 다른 변수를 참조하면 둘다 따로 적용된다)

//위의 동작방법은 안전하고 권할만한 방법이다. 성능, 메모리 사용량, 관리편의성 등에서 모듈은 
//단 한번만 임포트하는게 낫다.