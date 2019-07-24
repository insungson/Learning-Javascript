// module.exports = {
//     geometricSum(a,x,n){
//         if(x === 1) return a*n;
//         return a*(1-Math.pow(x,n))/(1-x);
//     },
//     arithmeticSum(n){
//         return (n+1)*n/2;
//     },
//     quadraticFormula(a,b,c){
//         const D = Math.sqrt(b*b - 4*a*c);
//         return [(-b+D)/(2*a), (-b-D)/(2*a)];
//     }
// }

//아래 같이 써도 된다.
exports.geometricSum = function(a,x,n){
    if(x === 1) return a*n;
    return a*(1-Math.pow(x,n))/(1-x);
};
exports.arithmeticSum = function(n){
    return (n+1)*n/2;
};
exports.quadraticFormula = function(a,b,c){
    const D = Math.sqrt(b*b - 4*a*c);
    return [(-b+D)/(2*a), (-b-D)/(2*a)];
};

//exports를 사용한 단축 문법은 객체를 내보낼 때만 쓸 수 있다.
//함수나 기타 다른 값을 내보낼 때는 반드시 module.exports를 써야한다.
//또한, 두 문법을 섞어 쓸 수도 없다. 모듈 하나에 한가지 문법만 써야한다.