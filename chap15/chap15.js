// // 날짜와 시간
// // 자바스크립트에서 moment.js 가  날짜와 시간에 관련된 기능을 제공한다.
// const d = new Date();
// console.log(d);             //타임존이 들어간 그레고리력 날짜
// console.log(d.valueOf());   //유닉스 타임스탬프
// //2019-04-17T08:28:30.215Z   //현재 시간 오후 5시 28분임
// //1555489710215


// //Date 객체만들기
// //아래 결과는 해당 지역의 표준시에 따라 다를 수 있습니다.
// new Date();     //현재 날짜

// //*자바스크립트의 월은 0부터 시작한다! 즉 0은 1월이고, 1은 2월이다!!
// const a = new Date(2015, 0);             //2015년 1월 1일 0시
// console.log(a); //2014-12-31T15:00:00.000Z
// const b = new Date(2015, 1);             //2015년 2월 1일 0시
// console.log(b); //2015-01-31T15:00:00.000Z
// const c = new Date(2015, 1, 14);         //2015년 2월 14일 0시
// console.log(c); //2015-02-13T15:00:00.000Z
// const d = new Date(2015, 1, 14, 13);     //2015년 2월 14일 오후1시
// console.log(d); //2015-02-14T04:00:00.000Z
// const e = new Date(2015,1,14,13,30);     //2015년 2월 14일 오후1시 30분
// console.log(e); //2015-02-14T04:30:00.000Z
// const f = new Date(2015,1,14,13,30,5);   //2015년 2월 14일 오후1시 30분 5초
// console.log(f); //2015-02-14T04:30:05.000Z
// const g = new Date(2015,1,14,13,30,5,500);//2015년 2월 14일 오후 1시 30분 5.5초
// console.log(g); //2015-02-14T04:30:05.500Z

// //유닉스 타임스탬프로 날짜 생성
// console.log(new Date(0)); //1970-01-01T00:00:00.000Z
// console.log(new Date(1000)); //1970-01-01T00:00:01.000Z
// console.log(new Date(1463443200000)); //2016-05-17T00:00:00.000Z

// //유닉스 시간 원점 이전의 날짜를 구할 때
// console.log(new Date(-365*24*60*60*1000)); //1969-01-01T00:00:00.000Z

// //날씨 문자열 해석(표준시를 기준으로 한다.)
// console.log(new Date('June 14, 1903'));          //1903-06-13T15:00:00.000Z
// console.log(new Date('June 14, 1903 GMT-0000')); //1903-06-14T00:00:00.000Z


// //Moment.js
// const moment = require('moment-timezone');
// //https://momentjs.com/  
// //위의 사이트에 들어가면 자세하게 알 수 있다.

// console.log(new Date(Date.UTC(2016,4,27)));
// //2016-05-27T00:00:00.000Z

// //Moment.js에 넘기는 배열은 자바스크립트의 Date 생성자에 넘기는 매개변수와 같고,
// //월은 0으로 시작한다.
// //toDate() 메서드는 Moment.js 객체를 자바스크립트 Date 객체로 변환한다.
// console.log(moment.tz([2016,3,27,9,19], 'America/Los_Angeles').toDate());
// console.log(moment.tz([2016,3,27,9,19], 'Asia/Seoul').toDate());
// // 2016-04-27T16:19:00.000Z
// // 2016-04-27T00:19:00.000Z


// /////////////////////
// //날짜 데이터 전송하기
// //서버 <--> 브라우저  이렇게 날짜 데이터를 주고 받을때 Json을 사용한다.
// const before = {d: new Date()};
// console.log(before.d instanceof Date); //true
// const json = JSON.stringify(before);
// const after = JSON.parse(json);
// console.log(after.d instanceof Date); //false
// console.log(typeof after.d);          //string


// after.d = new Date(after.d);
// console.log(after.d instanceof Date); //true


// const before = {d : new Date().valueOf()};
// console.log(before.d, typeof before.d); //1555492539781(할때마다다름) number
// const json = JSON.stringify(before); //문자로 바꿔준다.
// console.log(typeof json); //string
// const after = JSON.parse(json); //객체타입의 JSON 형태로 바꿔준다.
// console.log(typeof after, typeof after.d); //object number
// console.log(new Date(after.d)); //2019-04-17T09:11:11.746Z
// // 자바스크립트에서는 JSON으로 인코드된 날짜 문자열을 일관되게 처리하지만, 
// //다른 언어나 운영체제에서 제공하는 JSON 라이브러리는 그렇지 않다.
// //NET JSON 직렬화기는 JSON으로 인코드된 날짜 객체를 자신만의 형식으로 
// //감싸버린다(wrap) 따라서 자바스크립트가 아닌 다른 시스템과 날짜 데이터를 
// //주고 받을때는 그 시스템에서 날짜를 어떻게 직렬화하는지 알아둬야 한다.
// //이런 상황에서는 유닉스 타임스탬프를 주고받는편이 더 안전하다. 
// //하지만 유닉스 타임스탬프를 주고 받을때도 한가지 조심할 것이 있다.
// //숫자형 값을 밀리초가 아니라 초 기준으로 해석하는 라이브러리도 많다.


// /////////////////////////////////

// const moment = require('moment-timezone');
// const d = new Date(Date.UTC(1930,4,10));
// //다음 결과는 로스앤젤리스에 사는 사람 기준이다.
// console.log(d.toLocaleDateString()); //1930-5-10
// console.log(d.toLocaleTimeString()); //09:00:00
// console.log(d.toTimeString()); //09:00:00 GMT+0900 (대한민국 표준시)
// console.log(d.toUTCString()); //Sat, 10 May 1930 00:00:00 GMT

// console.log(moment(d).format("YYYY-MM-DD")); //1930-05-10
// console.log(moment(d).format("YYYY-MM-DD HH:mm")); //1930-05-10 09:00
// console.log(moment(d).format("YYYY-MM-DD HH:mm Z")); //1930-05-10 09:00 +09:00
// console.log(moment(d).format("YYYY-MM-DD HH:mm [UTF]Z")); //1930-05-10 09:00 UTF+09:00
// console.log(moment(d).format("YYYY년 M월 D일 HH:mm")); //1930년 5월 10일 09:00

// console.log(moment(d).format("dddd, MMMM [the] Do, YYYY")); //Saturday, May the 10th, 1930

// console.log(moment(d).format("h:mm a")); //9:00 am
// //M -> MM -> MMM -> MMMM 으로 바꾸면 
// //1,2,3 -> 01,02,03 -> Jan, Feb, Mar -> January, February, March
// //소문자"o"는 서수로 바뀐다. 즉"Do"는 1st, 2nd, 3rd로 바뀐다.
// //M이나 o등을 있는 그대로 표시하려면 대괄호 안에 넣으면 된다.
// // "[M]M" 은 M1. M2 처럼 나온다.



// ///////////
// //날짜 구성 요소
// const d = new Date(Date.UTC(1815,9,10));

// console.log(d.getFullYear()); //1815
// console.log(d.getMonth());    //9  //10월을 의미
// console.log(d.getDate());     //10
// console.log(d.getDay());      //2 요일 값의 범위는 일요일(0) 부터 토요일(6)
// console.log(d.getHours());    //9
// console.log(d.getSeconds());  //0
// console.log(d.getMinutes());  //0
// console.log(d.getMilliseconds());//0

// console.log(d.getUTCFullYear());//1815
// console.log(d.getUTCMonth());   //9
// console.log(d.getUTCDate());    //10



// ///////////////////////
// //날짜 비교
// const d1 = new Date(1996,2,1);
// const d2 = new Date(2009,4,27);
// console.log(d1>d2); //false
// console.log(d1<d2); //true

// //날짜 연산**
// const msDiff = d2 - d1;
// console.log(msDiff); //417744000000
// const daysDiff = msDiff/1000/60/60/24;
// console.log(daysDiff); //4835 일수 차이


// //Array.prototype.sort를 써서 날짜를 정렬할 수 있다.
// const dates = [];
// //랜덤한 날짜를 몇 개 만든다.
// const min = new Date(2017,0,1).valueOf();
// const delta = new Date(2020,0,1).valueOf() - min;
// for(let i=0; i<10; i++){
//     dates.push(new Date(min+delta*Math.random()));
// }
// console.log(dates);
// // [ 2017-12-07T20:39:02.128Z,
// //     2017-12-18T05:22:51.300Z,
// //     2019-02-22T11:17:25.394Z,
// //     2018-08-11T10:18:09.061Z,
// //     2017-12-10T06:44:09.618Z,
// //     2017-09-21T18:28:10.344Z,
// //     2018-12-04T02:17:10.743Z,
// //     2019-12-01T10:07:26.199Z,
// //     2019-05-23T14:40:45.931Z,
// //     2018-12-08T08:49:14.302Z ]

// //dates 배열은 랜덤을 만들었으므로 뒤죽박죽이다.
// //아래와 같이 역순으로 정렬할 수 있다.
// dates.sort((a,b) => b-a);
// console.log(dates);
// // [ 2019-12-01T10:07:26.199Z,
// //     2019-05-23T14:40:45.931Z,
// //     2019-02-22T11:17:25.394Z,
// //     2018-12-08T08:49:14.302Z,
// //     2018-12-04T02:17:10.743Z,
// //     2018-08-11T10:18:09.061Z,
// //     2017-12-18T05:22:51.300Z,
// //     2017-12-10T06:44:09.618Z,
// //     2017-12-07T20:39:02.128Z,
// //     2017-09-21T18:28:10.344Z ]
// //날짜 순으로 정렬할 수 있다.
// dates.sort((a,b) => a-b);
// console.log(dates);
// // [ 2017-09-21T18:28:10.344Z,
// //     2017-12-07T20:39:02.128Z,
// //     2017-12-10T06:44:09.618Z,
// //     2017-12-18T05:22:51.300Z,
// //     2018-08-11T10:18:09.061Z,
// //     2018-12-04T02:17:10.743Z,
// //     2018-12-08T08:49:14.302Z,
// //     2019-02-22T11:17:25.394Z,
// //     2019-05-23T14:40:45.931Z,
// //     2019-12-01T10:07:26.199Z ]


// //moment.js도 날짜를 빼거나 더하는데 유용한 메서드가 많다. **
// const moment = require('moment-timezone');

// let m = moment(); //현재
// console.log(m);  //moment("2019-04-17T19:32:19.968")
// m.add(3, 'days'); //m은 현재에서 3일 뒤이다.
// console.log(m);  //moment("2019-04-20T19:32:19.968")
// m.subtract(2,'years'); //m은 이제 2년전으로 부터 3일이 지난 날짜이다.
// console.log(m); //moment("2017-04-20T19:32:19.968")

// m = moment();   //다시 현재로 리셋
// console.log(m); //moment("2019-04-17T19:32:19.977")
// m.startOf('year'); //m은 올해의 1월 1일이다.
// console.log(m); //moment("2019-01-01T00:00:00.000")
// m.endOf('month');//m은 올해의 1월 31일이다.
// console.log(m); //moment("2019-01-31T23:59:59.999")

// //아래와 같이 체인으로 연결할 수도 있다.
// let n = moment()
//         .add(10,'hours')
//         .subtract(3,'days')
//         .endOf('month');
// //m은 이제 3일 전으로 부터 10시간 뒤인 달의 마지막 순간이다.
// console.log(m); //moment("2019-01-31T23:59:59.999")
// // 그냥 그 달의 맨 마지막순간이다.....

// console.log(moment().subtract(10,'seconds').fromNow()); //a few seconds ago
// console.log(moment().subtract(44,'seconds').fromNow()); //a few seconds ago
// console.log(moment().subtract(45,'seconds').fromNow()); //a minute ago
// console.log(moment().subtract(5,'minutes').fromNow()); //5 minutes ago
// console.log(moment().subtract(44,'minutes').fromNow()); //44 minutes ago
// console.log(moment().subtract(45,'minutes').fromNow()); //an hour ago
// console.log(moment().subtract(45,'minute').fromNow()); //an hour ago
// console.log(moment().subtract(5,'hours').fromNow()); //5 hours ago
// console.log(moment().subtract(21,'hours').fromNow()); //21 hours ago
// console.log(moment().subtract(22,'hours').fromNow()); //a day ago
// console.log(moment().subtract(300,'days').fromNow()); //10 months ago
// console.log(moment().subtract(345,'days').fromNow()); //a year ago

// //moment.js는 정확한 시간보단 적당한 시간도 이렇게 제공해준다.