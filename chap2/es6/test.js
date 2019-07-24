'use strict'
//es6 기능: 블록 스코프 변수 선언
const sentences = [
    {subject: 'javascript', verb:'is', object:'great'},
    {subject: 'Son', verb:'is', object:'comming'}
];
//Es6기능 : 객체 분해
function say({subject, verb, object}){
    //es6 : 탬플릿 문자열
    //아래의 것은 탭위의 백틱`
    console.log(`${subject} ${verb} ${object}`);
}
//es6: for...of
for(let s of sentences){
    say(s);
}