// const startTime = new Date();
// let i = 0;
// const intervalld = setInterval(function(){
//     let nowTime = new Date();
//     if(nowTime.getMinutes() !== startTime.getMinutes() || ++i>10){
//         return clearInterval(intervalld);
//     }
//     console.log(`${i} : ${nowTime}`);
// },5*1000);


// function countdown(){
//     //let i ;
//     console.log("CountDown : ");
//     for(let i=5; i>=0; i--){
//         setTimeout(function(){
//             console.log(i===0 ? "GO" : i);
//         },(5-i)*1000);
//     }
// }
// countdown();


// const fs = require('fs');
// fs.readFile('a.txt', function(err,dataA){
//     if(err)console.error(err);
//     fs.readFile('b.txt',function(err,dataB){
//         if(err)console.error(err);
//         fs.readFile('c.txt',function(err,dataC){
//             if(err)console.error(err);
//             setTimeout(() => {
//                 fs.readFile('d.txt',function(err,dataD){
//                     if(err)console.error(err);
//                 });
//             }, 10*1000);
//         });
//     });
// });
// function readSketchyFile(){
//     try{
//         fs.readFile('does_not_exist.txt'||'a.txt', function(err,data){
//             if(err)throw err;
//         })
//     }catch(err){
//         console.log(`${err} happen please retry!`);
//     }
// }
// readSketchyFile();
// //Error: ENOENT: no such file or directory, 
// //open 'C:\Users\son\Desktop\cording\러닝자바스크립트\chap14\does_not_exist.txt'


// function countdown(seconds){
//     return new Promise(function(resolve, reject){
//         for(let i = seconds; i>=0; i--){
//             setTimeout(() => {
//                 if(i>0)console.log(`${i}....`)
//                 else resolve(console.log('go!'))
//             }, (seconds-i)*1000);
//         }
//     });
// }
// countdown(5)
// .then(function(){
//     console.log('countdown successful!');
// })
// .catch(function(err){
//     console.log(err.mesaage);
// });
// // 5....
// // 4....
// // 3....
// // 2....
// // 1....
// // go!
// // countdown successful!


// function newCountDown(seconds){
//     return new Promise(function(resolve,reject){
//         for(let i = seconds; i>=0; i--){
//             setTimeout(function(){
//                 if(i === 4)reject(new Error("Error Occured"));
//                 else if(i>0)console.log(i + '.....');
//                 else resolve(console.log("GO!"));
//             },(seconds-i)*1000)
//         }
//     });
// }
// newCountDown(5)
// .then(function(){console.log("countdown successful")})
// .catch(function(err){console.error(err)});
// // 5.....
// // Error: Error Occured
// //     at Timeout._onTimeout (C:\Users\son\Desktop\cording\러닝자바스크립트\chap14\chap14_pratice.js:83:35)
// //     at ontimeout (timers.js:498:11)
// //     at tryOnTimeout (timers.js:323:5)
// //     at Timer.listOnTimeout (timers.js:290:5)
// // 3.....
// // 2.....
// // 1.....
// // GO!


// const EventEmitter = require('events').EventEmitter;

// class Countdown extends EventEmitter{
//     constructor(seconds, choice){
//         super();
//         this.seconds = seconds;
//         this.choice = choice;
//     }
//     go(){
//         const countdown = this;
//         return new Promise(function(resolve, reject){
//             for(let i = countdown.seconds; i>=0; i--){
//                 setTimeout(function(){
//                     if(i === 4 && countdown.choice) reject(new Error("Error Occured"));
//                     else if(i>0) countdown.emit('tick', i);
//                     else resolve(console.log("Go"));
//                 },(countdown.seconds-i)*1000);
//             }
//         });
//     }
// }
// let CountdownEx = new Countdown(5,true).on('tick',function(a){
//     console.log(a + '....');
// });
// CountdownEx.go()
// .then(function(){console.log('countdown successful')})
// .catch(function(err){
//     console.error(err);
// });


// const EventEmitter = require('events').EventEmitter;
// class CountDown extends EventEmitter{
//     constructor(seconds,choice){
//         super();
//         this.seconds = seconds;
//         this.choice = choice;
//     }
//     go(){
//         const countdown = this;
//         const TimeoutId = [];
//         return new Promise(function(resolve,reject){
//             for(let i = countdown.seconds; i>=0; i--){
//                 TimeoutId.push(setTimeout(function(){
//                     if(i === 4 && countdown.choice){
//                         TimeoutId.forEach(clearTimeout);
//                         return reject(new Error('error occured'));
//                     }
//                     else if(i>0) countdown.emit('tick',i);
//                     else resolve(console.log("GO!"));
//                 },(countdown.seconds-i)*1000));
//             }
//         });
//     }
// }
// function launch(){
//     return new Promise(function(resolve,reject){
//         console.log("Lift off!");
//         setTimeout(function(){
//             resolve("In Orbit!");
//         },2*1000);
//     });
// }
// let c = new CountDown(3,true).on('tick',function(i){
//     console.log(i + "....");
// });
// c.go()
// .then(launch)
// .then(function(a){
//     console.log(a);
// })
// .catch(function(err){
//     console.error(`${err} occuered`);
// });



// const EventEmitter = require('events').EventEmitter;
// class CountDown extends EventEmitter{
//     constructor(seconds, choice){
//         super();
//         this.seconds = seconds;
//         this.choice = choice;
//     }
//     go(){
//         let countdown = this;
//         let timeoutId = [];
//         return new Promise(function(resolve,reject){
//             for(let i = countdown.seconds; i>=0; i--){
//                 timeoutId.push(setTimeout(function(){
//                     if(countdown.choice && i === 4){
//                         timeoutId.forEach(clearInterval);
//                         return reject(new Error("OH MY GOD"));
//                     }
//                     else if(i>0) countdown.emit('tick',i);
//                     else resolve(console.log("GO!"));
//                 },(countdown.seconds-i)*1000))
//             }
//         });
//     }
// }
// function launch(){
//     return new Promise(function(resolve,reject){
//         if(Math.random()<0.5)
//         console.log('Liff off!');
//         setTimeout(function(){
//             resolve("In Orbit");
//         },2*1000);
//     });
// }
// function addTimeout(fn,timeout){
//     if(timeout === undefined)timeout = 1000;
//     return function(...args){
//         return new Promise(function(resolve,reject){
//             const tid = setTimeout(reject,timeout,new Error('promise timed out'));
//             fn(...args)
//             .then(function(...args){
//                 clearTimeout(tid);
//                 resolve(...args);
//             })
//             .catch(function(...args){
//                 clearTimeout(tid);
//                 reject(...args);
//             });
//         });
//     };
// }
// const c = new CountDown(5,true).on('tick',function(a){console.log(a+'....')});
// c.go()
// .then(addTimeout(launch,3*1000))
// .then(function(a){console.log(a)})
// .catch(function(err){console.error('Houston, we have a problem : ' + err.message)});


// const EventEmitter = require('events').EventEmitter;
// class CountDown extends EventEmitter{
//     constructor(seconds,choice){
//         super();
//         this.seconds = seconds;
//         this.choice = choice;
//     }
//     go(){
//         let countdown = this;
//         let timeoutId = [];
//         return new Promise(function(resolve, reject){
//             for(let i=countdown.seconds; i>=0; i--){
//                 timeoutId.push(setTimeout(function(){
//                     if(i === 4 && countdown.choice){
//                         timeoutId.forEach(clearInterval);
//                         return reject(new Error("OH MY GOD"));
//                     }
//                     else if(i>0) countdown.emit('tick',i);
//                     else resolve(console.log('Go!!'));
//                 },(countdown.seconds-i)*1000));
//             };
//         });
//     }
// }
// function launch(){
//     return new Promise(function(resolve,reject){
//         if(Math.random<0.5){return;}
//         console.log("Liff off!");
//         setTimeout(function(){
//             resolve('Orbit!');
//         },2*1000)
//     });
// }
// function addTimeout(fn,timeout){
//     if(timeout === undefined){ timeout = 1000}
//     return function(...args){
//         return new Promise(function(resolve,reject){
//             const tid = setTimeout(reject,timeout,new Error('promise timed out'));
//             fn(...args).then(function(result){
//                 clearTimeout(tid);
//                 resolve(...args);
//             }).catch((err) => {
//                 clearTimeout(tid);
//                 reject(...args);
//             });
//         });
//     };
// }
// let a = new CountDown(5,true).on('tick',function(i){console.log(i+'....')});
// a.go()
// .then(addTimeout(launch,3*1000))
// .then(function(mes){console.log(mes)})
// .catch(function(err){console.error('hey we are so screwed about : ' + err.message)});


// function create(){
//     return new Promise(function(resolve,reject){
//         resolve();
//         console.log("Step1");
//     })
// };
// create().then(function(){
//     console.log("Step3-succed");
// }).catch(function(err){console.error(err)});
// console.log("Step2");
// // Step1
// // Step2
// // Step3-succed



// function dubbleAfter2Seconds(x){
//     console.log('value : ' + x);
//     return new Promise(function(resolve,reject){
//         setTimeout(function(){
//             resolve(x*2);
//         },2*1000);
//     });
// }
// async function addAsync(x){
//     const a = await dubbleAfter2Seconds(10);
//     const b = await dubbleAfter2Seconds(20);
//     const c = await dubbleAfter2Seconds(30);
//     return x + a + b + c;
// }
// addAsync(10)
// .then(function(a){console.log('result : ' +a)})
// .catch(function(err){console.error(err)});


//아래의 두개는 같다. 위의 것은 promise 형태, 아래것은 async/await 형태이다.
// const makeRequest = () => {
//     try {
//       getJSON()
//         .then(result => {
//           // this parse may fail
//           const data = JSON.parse(result)
//           console.log(data)
//         })
//         // uncomment this block to handle asynchronous errors
//         // .catch((err) => {
//         //   console.log(err)
//         // })
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   const makeRequest = async () => {
//     try {
//       // this parse may fail
//       const data = JSON.parse(await getJSON())
//       console.log(data)
//     } catch (err) {
//       console.log(err)
//     }
//   }