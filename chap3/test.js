var user = (function(){

    var password = 12345;

    return {

        get : function(){

            return password; },

        set : function(newPassword){

            return password = newPassword; },

};

})(); //

console.log(user); //{ get: [Function: get], set: [Function: set] }

console.log(user.password); //undefined (이는 function 안의 var password가 아님)

console.log(user.get()); //12345

user.set(112233);

console.log(user.get()); //112233