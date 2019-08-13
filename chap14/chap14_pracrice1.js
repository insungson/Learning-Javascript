// const startTime = new Date();
// let i = 0;
// const intervalid = setInterval(function(){
//     let nowTime = new Date();
//     if(nowTime.getMinutes() !== startTime.getMinutes() || ++i>10){
//         return clearInterval(intervalid);
//     }
//     console.log(`${i} : ${nowTime}`);
// },5*1000)


// function countdown(){
//     for(let i=5;i>=0;i--){
//         setTimeout(function(){
//             console.log(i === 0 ? 'Go' : i);
//         },(5-i)*1000);
//     }
// }
// countdown();



// function countdown(seconds){
//     return new Promise(function(resolve,reject){
//         for(let i = seconds; i>=0; i--){
//             setTimeout(function(){
//                 if(i>0){console.log(`${i}...`)}
//                 else{resolve(console.log('Go!'))}
//             },(seconds-i)*1000)
//         }
//     });
// }
// countdown(5)
// .then(function(){
//     console.log('countdown successfully!');
// })
// .catch(function(err){console.log(err.message)});




// function newCountdown(seconds){
//     return new Promise(function(resolve,reject){
//         for(let i = seconds; i>=0; i--){
//             setTimeout(function(){
//                 if(i === 4){reject(new Error('에러발생!'))}
//                 if(i>0){console.log(`${i}...`)}
//                 else{resolve(console.log('Go!'))}
//             },(seconds-i)*1000)
//         }
//     });
// }
// newCountdown(5)
// .then(function(){console.log('countdown successfully')})
// .catch(function(err){console.error(err)});



// const EventEmitter = require('events').EventEmitter;
// class CountDown extends EventEmitter{
//     constructor(seconds,choice){
//         super();
//         this.seconds = seconds;
//         this.choice = choice;
//     }
//     go(){
//         let countdown = this;
//         return new Promise(function(resolve,reject){
//             for(let i=countdown.seconds; i>=0; i--){
//                 setTimeout(function(){
//                     if(i === 4 && countdown.choice){reject(new Error('에러발생'))}
//                     else if(i>0){countdown.emit('tick',i)}
//                     else{resolve(console.log('Go!'))}
//                 },(countdown.seconds-i)*1000)
//             }
//         });
//     }
// }
// const countdownTest = new CountDown(5,true).on('tick',function(a){console.log(a + '....')});
// countdownTest.go()
// .then(function(){console.log('countdown successfully!')})
// .catch(function(err){console.error(err)});



// const EventEmitter = require('events').EventEmitter;
// class CountDown extends EventEmitter{
//     constructor(seconds, choice){
//         super();
//         this.seconds = seconds;
//         this.choice = choice;
//     }
//     go(){
//         const countdown = this;
//         const timeId = [];
//         return new Promise(function(resolve, reject){
//             for(let i = countdown.seconds; i>=0; i--){
//                 timeId.push(setTimeout(function(){
//                     if(i === 4 && countdown.choice){
//                         reject(new Error('에러발생'));
//                         timeId.forEach(clearTimeout);
//                     }
//                     else if(i>0){countdown.emit('tick',i)}
//                     else {resolve(console.log('GO!'))}
//                 },(countdown.seconds-i)*1000))
//             }
//         });
//     }
// }
// function launch(){
//     return new Promise(function(resolve,reject){
//         console.log('Lift off!!');
//         setTimeout(function(){
//             resolve("In Orbit!!")
//         },2*1000);
//     });
// }
// const countdownTest = new CountDown(3,true).on('tick',function(a){console.log(a+'...')});
// countdownTest.go()
// .then(launch)
// .then(function(a){console.log(`${a}`)})
// .catch(function(err){console.error(err)});




// const EventEmitter = require('events').EventEmitter;
// class CountDown extends EventEmitter{
//     constructor(seconds,choice){
//         super();
//         this.seconds = seconds;
//         this.choice = choice;
//     }
//     go(){
//         let countdown = this;
//         let timeId = [];
//         return new Promise(function(resolve,reject){
//             for(let i=countdown.seconds; i>=0; i--){
//                 timeId.push(setTimeout(function(){
//                     if(i === 4 && countdown.choice){
//                         reject(new Error('첫번째 에러발생'));
//                         timeId.forEach(clearInterval);
//                     }
//                     else if(i>0){countdown.emit('tick',i)}
//                     else {resolve(console.log('Go!'))}
//                 },(countdown.seconds-i)*1000))
//             }
//         });
//     }
// }
// function launch(){
//     return new Promise(function(resolve,reject){
//         if(Math.random()<0.5)
//         console.log("Liff Off!");
//         setTimeout(function(){
//             resolve('Orbit!');
//         },2*1000)
//     });
// }
// function addTimeout(fn,timeout){
//     if(timeout === undefined)timeout = 1000;
//     return function(...args){
//         return new Promise(function(resolve,reject){
//             const tid = setTimeout(reject,timeout,new Error('프로미스 timeout'));
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
// let countdownTest = new CountDown(5,true).on('tick',function(a){console.log(a+'....')});
// countdownTest.go()
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
//         let timeId = [];
//         return new Promise(function(resolve,reject){
//             for(let i=countdown.seconds; i>=0; i--){
//                 timeId.push(setTimeout(function(){
//                     if(i === 4 && countdown.choice){
//                         timeId.forEach(clearInterval);
//                         return reject(new Error('첫번째 에러발생'));
//                     }
//                     else if(i>0){countdown.emit('tick',i)}
//                     else {resolve(console.log("GO!!"))}
//                 },(countdown.seconds-i)*1000));
//             }
//         });
//     }
// }
// function launch(){
//     return new Promise(function(resolve,reject){
//         if(Math.random()<0.5){
//             console.log('Lift Off!');
//             setTimeout(function(){
//                 resolve('Orbit!!');
//             },2*1000);
//         }
//     });
// }
// function addTimeout(fn,timeout){
//     if(timeout === undefined){timeout = 1000}
//     return function fn(...args){
//         return new Promise(function(resolve,reject){
//             const tid = setTimeout(reject,timeout,new Error('promise timed out'));
//             fn(...args).then(function(result){
//                 clearTimeout(tid);
//                 resolve(...args);
//             }).catch(function(err){
//                 clearTimeout(tid);
//                 reject(...args);
//             });
//         });
//     };
// }
// const countdownTest = new CountDown(5,true).on('tick',function(a){console.log(a+'...')});
// countdownTest.go()
// .then(addTimeout(launch,2000))
// .then(function(a){console.log(a)})
// .catch(function(err){console.error(err.message+' 두번째 에러발생')});





// function create(){
//     return new Promise(function(resolve,reject){
//         resolve();
//         console.log("Step1");
//     })
// };
// create().then(function(){
//     console.log("Step3-succed");
// }).catch(function(err){console.error(err)});
// console.log('step2');




// function dubbleAfter2seconds(x){
//     console.log('value : ' + x);
//     return new Promise(function(resolve,reject){
//         setTimeout(function(){
//             resolve(x*2);
//         },2*1000)
//     });
// }
// async function addAsync(x){
//     const a = await dubbleAfter2seconds(10);
//     const b = await dubbleAfter2seconds(20);
//     const c = await dubbleAfter2seconds(30);
//     return a + b + c + x ;
// }
// addAsync(10)
// .then(function(a){console.log('result : ' + a)})
// .catch(function(err){console.error(err)});





function makeRequest(){
    try{
        getJSON()
        .then(function(result){
            const data = JSON.parse(result);
            console.log(data);
        });
    }catch(err){console.error(err)}
}

async function makeRequest(){
    try{
        const data = JSON.parse(await getJSON());
    }catch(err){
        console.error(err);
    }
}