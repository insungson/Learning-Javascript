// const o1 = {apple:1, xochitl:2, ballon:3, guitar:4, xylophone:5,};
// Object.keys(o1).filter(x=>x.match(/^x/)).forEach(y=>console.log(`${y} : ${o1[y]}`));


// class Car{
//     constructor(make,model){
//         this.make = make;
//         this.model = model;
//         this.userGear = ['P','N','R','D'];
//         this._userGear = this.userGear[0];
//     }
//     shift(gear){
//         if(this.userGear.indexOf(gear)<0){
//             throw new Error(`입력한 ${gear}는 없는 입력값입니다.`);
//         }
//         this._userGear = gear;
//     }
// }
// let car1 = new Car('Honda','mazda');
// console.log(car1);



// const weakMapCar = function(){
//     const secureCar = new WeakMap();
//     class Car{
//         constructor(make,model){
//             this.make = make;
//             this.model = model;
//             this._userGear = ['P','N','R','D'];
//             secureCar.set(this,{userGear:this._userGear[0]});
//         }
//         get userGear(){return secureCar.get(this).userGear};
//         set userGear(value){secureCar.get(this).userGear = value};
//         shift(gear){
//             if(this._userGear.indexOf(gear)<0){
//                 throw new Error(`입력한 ${gear}값은 목록에 없습니다.`);
//             }
//             this.userGear = gear;
//         }
//     }
//     return Car;
// }()
// wcar1 = new weakMapCar('Benz','C class');
// console.log(wcar1);
// console.log(wcar1.userGear);
// wcar1.shift("D");
// console.log(wcar1.userGear);



// function Job(name){
//     this.name = name;
// }
// Job.prototype.work = function(){
//     console.log(this.name + '일을 합니다.');
// }
// function Developer(){
//     Job.call(this,'프로그래머');
// }
// Developer.prototype = Object.create(Job.prototype);
// Developer.prototype.constructor = Developer;
// Developer.prototype.coding = function(){
//     console.log(this.name + '는 코딩을 합니다.');
// }
// var itjob = new Developer();
// itjob.work();
// itjob.coding();


// class Jobclass{
//     constructor(name){
//         this.name = name;
//     }
//     work(){
//         console.log(`${this.name}일을 합니다.`);
//     }
// }
// class Developer1 extends Jobclass{
//     constructor(){
//         super('프로그래머');
//     }
//     coding(){
//         console.log(`${this.name}는 코딩을 합니다.`);
//     }
// }
// let itjob1 = new Developer1('프로그래머');
// itjob1.work();
// itjob1.coding();



// class MixinBuilder{
//     constructor(superclass){
//         this.superclass = superclass;
//     }
//     with(...mixins){
//         return mixins.reduce((c,mixin)=>mixin(c),this.superclass);
//     }
// }
// let calculatorMixin = function(Base){
//     return class extends Base{
//         calc(){return console.log('clac()함수를 추가할 수 있는 인터페이스 작업');}
//     }
// }
// let randomizeMixin = function(Base){
//     return class extends Base{
//         randomize(){return console.log('randomize()함수를 추가할 수 있는 인터페이스 작업');}
//     }
// }
// let mix = function(superclass){
//     return new MixinBuilder(superclass);
// }
// class Foo{}
// class MyClass extends mix(Foo).with(calculatorMixin,randomizeMixin){}
// let mixTest = new MyClass();
// mixTest.calc();
// mixTest.randomize();
// // clac()함수를 추가할 수 있는 인터페이스 작업
// // randomize()함수를 추가할 수 있는 인터페이스 작업


