// const getStart=(()=>{return "hello world!"})();
// const arr = [1,2,3];
// const w = {};
// arr[1] = getStart;
// console.log(arr[1]);
// w.q = arr[1];
// console.log(w.q);


// const getSentence = ({subject,verb,object})=>{
//     return `${subject} ${verb} ${object}`;
// };
// const o = {subject:"I", verb:"LOVE", object:"Javascript"};
// console.log(getSentence(o));

// const addPrefix = (pre, ...words)=>{
//     const preFixedWords = [];
//     for(let i=0; i<words.length;i++){
//         preFixedWords[i] = pre + words[i];
//     }
//     return preFixedWords;
// }
// console.log(addPrefix("pre","verse","vex","cise"));


// const o = {
//     name : "wallace",
//     bark : ()=>'woof!',
// }
// console.log(o,o.bark());
// const o1 = {
//     name:"wallace1",
//     bark(){return 'woof!1';},
// }
// console.log(o1,o1.bark());

// const o = {
//     name : 'wallace',
//     speak(){return `My name is ${this.name}!`;},
// }
// console.log(o.speak());
// const speak = o.speak;
// console.log(speak());


// const v = {
//     name : 'Julle',
//     greetBackWords : function(){
//         function getReverseName(){
//             let nameBackwords = '';
//             for(let i = this.name.length - 1; i>=0; i--){
//                 nameBackwords += this.name[i];
//             }
//             return nameBackwords;
//         }
//         return `${getReverseName()} si eman ym ,olleH`; 
//     },
// };
// console.log(v.greetBackWords());

// const v = {
//     name : 'Julle',
//     greetBackWords : function(){
//         const self = this;
//         let nameBackWords = '';
//         for(let i = self.name.length-1; i>=0; i--){
//             nameBackWords += self.name[i];
//         }
//         return nameBackWords;
//     },
// };
// console.log(v.greetBackWords());


// const f1 = function(){return "hello!!"};
// const f1 = ()=>"hello!!";
// const f2 = function(name){return `hello, ${name}!`};
// const f2 = (name)=>`hello, ${name}!`;

// const v = {
//     name : 'Julie',
//     greetBackWords : function(){
//         const getReverseName = ()=>{
//             let self = this;
//             let nameBackWords = '';
//             for(let i = self.name.length-1; i>=0; i--){
//                 nameBackWords += self.name[i];
//             }
//             return nameBackWords;
//         };
//         return `${getReverseName()}`;
//     },
// }
// console.log(v.greetBackWords());


// const bruce = {name:"Bruce"};
// const madeline = {name:"Madeline"};
// const zakki = {name:"Zakki"};
// function greet(){
//     return `Hello, I'm ${this.name}!`;
// }
// let bruceCall = greet.call(bruce);
// console.log(bruceCall);//Hello, I'm Bruce!
// console.log(bruce);//{ name: 'Bruce' }
// function update(birthYear, occupation){
//     this.birthYear = birthYear;
//     this.occupation = occupation;
// };
// update.call(madeline,1945,'singer');
// console.log(madeline);//{ name: 'Madeline', birthYear: 1945, occupation: 'singer' }
// update.apply(bruce,[1999,'dancer']);
// console.log(bruce);//{ name: 'Bruce', birthYear: 1999, occupation: 'dancer' }
// let bb = update.call(bruce,2005,'racer');
// console.log(bruce);//{ name: 'Bruce', birthYear: 2005, occupation: 'racer' }  처음의 call은 바뀐다.
// const aa = update.bind(bruce,2002,'teacher');
// console.log(aa);//[Function: bound update]
// aa(madeline,4000,'lame');
// console.log(bruce);//{ name: 'Bruce', birthYear: 2002, occupation: 'teacher' }  call로 바꾼 bind는 안바뀐다.
// console.log(bb);//undefined     call 메서드를 사용하고 변수에 넣어도 그 변수는 아무것도 없다.
// console.log('///////////////////////////////////////');
// const bindbruce = update.bind(bruce,2000,"test");
// console.log(bruce);//{ name: 'Bruce', birthYear: 2005, occupation: 'racer' }
// console.log('///////////////////////////////////////');
// const bindzakki = update.bind(zakki);
// bindzakki(2000,"teacher");
// console.log(zakki);//{ name: 'Zakki', birthYear: 2000, occupation: 'teacher' }

// const bindzakki1 = update.bind(zakki,2001);
// bindzakki1("teacher","racer");
// console.log(zakki);//{ name: 'Zakki', birthYear: 2001, occupation: 'teacher' }
// bindzakki1.call(bruce,3000,"student");  //teacher와 racer를 썻지만 teacher만 들어간다.
// console.log(zakki);//{ name: 'Zakki', birthYear: 2001, occupation: 3000 } bruce,300,student 를 넣었지만..
// //bind(zakki,2001) 했으므로 여기에 call을 붙여서 bruce,3000,"student" 데이터를 붙여도 3000만 들어간다.student 짤림

// const arr = [2,3,-5,15,7];
// console.log(Math.min.apply(null,arr));//-5
// console.log(Math.max.apply(null,arr));//15



// ///////////////////////////////////////////////(아래부분은 다시해보기)
// //call 과 this의 이해   화살표 함수는 call, applay, bind 메소드를 사용하여 this를 변경할 수 없다.!!!!
// function getSentence1(subject, verb, object){
//     this.subject = subject;
//     this.verb = verb;
//     this.object = object;
//    // return `${this.subject} ${this.verb} ${this.object}`;
// };
// const o = {subject:"I", verb:"LOVE", object:"Javascript"};
// const ZZ = {a:"I hate you"};
// getSentence1.call(ZZ,'yo','yep','ze');   //이렇게 call을 쓰려면.. this를 활용해야한다.
// console.log(ZZ);

// let getSentence = (subject, verb, object)=>{    
//     this.subject = subject;
//     this.verb = verb;
//     this.object = object;
// }
// const aa = {a:"I hate you"};
// getSentence.call(aa,'yo','yep','ze');
// console.log(aa);

// //@@@화살표 함수는 call, applay, bind 메소드를 사용하여 this를 변경할 수 없다.!!!! (아래가 결과이다!!!)
// // { a: 'I hate you', subject: 'yo', verb: 'yep', object: 'ze' }
// // { a: 'I hate you' }