// const o1 = {apple:1, xochitl:2, ballon:3, guitar:4, xylophone:5,};
// Object.keys(o1).filter(x=>x.match(/^x/)).forEach(y=>console.log(`${y} : ${o1[y]}`));
// // xochitl : 2
// // xylophone : 5

/////////////////////////////////////////
// class Car{
//     constructor(make,model){
//         this.make = make;
//         this.model = model;
//         this.userGear = ['P','N','R','D'];
//         this._userGear = this.userGear[0];
//     }
//     shift(gear){
//         if(this.userGear.indexOf(gear)<0){
//             throw new Error(`잘못된 값 입력 :${gear}`)
//         }
//         this._userGear = gear;
//     }
// }
// let car1 = new Car("honda","mazda");
// console.log(car1);
// // Car {
// //     make: 'honda',
// //     model: 'mazda',
// //     userGear: [ 'P', 'N', 'R', 'D' ],
// //     _userGear: 'P' }
// car1.shift("D");
// console.log(car1._userGear); //D

// const weakMapCar = (function(){
//     const carSecurity = new WeakMap();
//     class Car{
//         constructor(make, model){
//             this.make = make;
//             this.model = model;
//             this._userGear = ['P','N','R','D'];
//             carSecurity.set(this,{userGear:this._userGear[0]});
//         }
//         get userGear(){return carSecurity.get(this).userGear};
//         set userGear(value){
//             if(this._userGear.indexOf(value)<0){
//                 throw new Error(`입력한 값은 없다. ${value}`)
//             }
//             carSecurity.get(this).userGear = value;
//         }
//         shift(value){this.userGear = value};
//     }
//     return Car;
// })();
// let wcar = new weakMapCar("Benz","C class");
// console.log(wcar);
// // Car {
// //     make: 'Benz',
// //     model: 'C class',
// //     _userGear: [ 'P', 'N', 'R', 'D' ] }
// console.log(wcar.userGear); //P
// wcar.shift("D");
// //wcar.userGear("D");    wcar.userGear is not a function 에러 발생.
// console.log(wcar.userGear); //D


/////////////////////////////////////////////////////
// function Job(name){
//     this.name = name;
// }
// Job.prototype.work = function(){
//     console.log(this.name + " 일을 합니다.");
// }
// function Developer(){
//     Job.call(this,'프로그래머');
// }
// Developer.prototype = Object.create(Job.prototype);
// Developer.prototype.constructor = Developer;
// Developer.prototype.coding = function(){
//     console.log('코딩을 합니다.');
// }
// var itjob = new Developer();
// itjob.work();//프로그래머 일을 합니다.
// itjob.coding();//코딩을 합니다
// console.log(itjob);//Developer { name: '프로그래머' }

// class Jobclass{
//     constructor(name){
//         this.name = name;
//     }
//     work(){
//         console.log(`${this.name} 일을 합니다.`);
//     }
// }
// class Developerclass extends Jobclass{
//     constructor(){
//         super('프로그래머');
//     }
//     coding(){
//         console.log('코딩을 합니다.');
//     }
// }
// var itjobclass = new Developerclass();
// itjobclass.work();//프로그래머 일을 합니다.
// itjobclass.coding();//코딩을 합니다.
// console.log(itjobclass);//Developerclass { name: '프로그래머' }

////////////////////////////////////////////

// var calculatorMixin = function(Base){
//     return class extends Base{
//         calc(){return console.log('test');}
//     };
// }
// var randomizerMixin = function(Base){
//     return class extends Base{
//         randomize(){return console.log('test1');}
//     };
// }
// class MixinBuilder{
//     constructor(superclass){
//         this.superclass = superclass;
//     }
//     with(...mixins){
//         return mixins.reduce((c, mixin) => mixin(c), this.superclass);
//     }
// }

// let mix = (superclass) => new MixinBuilder(superclass);
// class Foo{}
// class MyClass extends mix(Foo).with(calculatorMixin, randomizerMixin) {}
// var mixtest = new MyClass();
// mixtest.calc();
// mixtest.randomize();