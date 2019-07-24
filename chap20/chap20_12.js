const os = require('os');

console.log("Hostname : " + os.hostname());
console.log("OS type : " + os.type());
console.log("OS platform : " + os.platform());
console.log("OS release : " + os.release());
console.log("OS uptime : " + (os.uptime()/60/60/24).toFixed(1) + "days");
console.log("CPU architecture : " + os.arch());
console.log("Number of CPUs : " + os.cpus().length);
console.log("Total memory : " + (os.freemem()/1e6).toFixed(1) + " MB");
// Hostname : son-PC
// OS type : Windows_NT
// OS platform : win32
// OS release : 10.0.17763
// OS uptime : 21.2days
// CPU architecture : x64
// Number of CPUs : 4
// Total memory : 11504.2 MB

//위와 같이 결과가 나온다.
