// // ES5까지 키와 값을 연결하려면 객체를 사용해야했다. 하지만 객체를 사용할때 아래와 같은 문제점이 생긴다.
// //1. 프로토타입 체인으로 의도하지 않은 연결이 생길 수 있다.
// //2. 객체 안에 연결된 키와 값이 몇개나 되는지 쉽게 알수 있는 방법이 없다.
// //3. 객체에서의 키는 반드시 문자열, Symbol이어야 한다. 그래서 객체를 키로 써서 값을 연결할 수 없다.
// //4. 객체는 프로퍼티 순서를 전혀보장하지 않는다. (스마트미러에서 remote 부분이 막나온게 그런이유이다.)
// //맵은 이런 부분을 해결했다. 아래의 예를 보자
const u1 = {name : 'Cynthia'};
const u2 = {name : 'Jackson'};
const u3 = {name : 'Olive'};
const u4 = {name : 'James'};

// //아래와 같이 맵을 만든다.
// const userRoles = new Map();
// console.log(userRoles); //Map {}
// //맵의 set()메서드를 써서 사용자 역할을 할당한다.
// userRoles.set(u1, 'User');
// userRoles.set(u2, 'User');
// userRoles.set(u3, 'Admin');
// //set()메서드는 체인으로 연결할 수 있어서 타이핑하는 수고를 덜어준다.
// userRoles.set(u1, 'User')
//          .set(u2, 'User')
//          .set(u3, 'Admin');

// /////////////////////////////////////
// //생성자에 배열의 배열을 넘기는 형태로 사용해도 된다.
// const userRoles = new Map([
//     [u1, 'User'],
//     [u2, 'User'],
//     [u3, 'Admin'],
// ]);

// //get()메서드를 통해서 값을 가져온다.
// console.log(userRoles.get(u2)); //User

// //맵에 존재하지 않는 키에 get을 호출하면 undfined를 반환한다.
// //has() 메서드는 맵에 키가 존재하는지 확인한다.
// console.log(userRoles.has(u1)); //true
// console.log(userRoles.get(u1)); //User
// console.log(userRoles.has(u4)); //false
// console.log(userRoles.get(u4)); //undefined

// //set()메서드는 맵에 이미 존재하는 키값을 교체한다 (key,value) 값을 같이 줘야한다.
// console.log(userRoles.get(u1)); //User
// userRoles.set(u1, 'Admin');
// console.log(userRoles.get(u1)); //Admin

// //size프로퍼티는 맵의 요소수를 가져온다.
// console.log(userRoles.size); //3
// console.log(userRoles);
// //아래에서 Map의 구조를 보자 (이터러블 객체이다)
// // Map {
// //     { name: 'Cynthia' } => 'Admin',
// //     { name: 'Jackson' } => 'User',
// //     { name: 'Olive' } => 'Admin' }
// //저걸 찍으면 저렇게 나오는데 보면 map의 객체 안에 name을 프로퍼티로 하는 객체가 있고, 
// //그 객체를 요소로 'Admin'을 리턴값으로 가져온다.

// //**keys() 메서드는 맵의 키를
// //**values() 메서드는 맵의 값을
// //**entries() 메서드는 첫번째요소는 키, 두번째 요소는 값인 배열을 반환한다.
// //메서드가 배열을 반환하고 배열은 이터러블의 객체이다. 때문에 for of 루프를 사용할 수 있다.
// for(let u of userRoles.keys()){
//     console.log(u.name);
// // Cynthia
// // Jackson
// // Olive
// }
// for(let r of userRoles.values()){
//     console.log(r);
// // Admin
// // User
// // Admin
// }
// for(let ur of userRoles.entries()){
//     console.log(`${ur[0].name} : ${ur[1]}`);
// // Cynthia : Admin
// // Jackson : User
// // Olive : Admin
// }
// //맵도 분해(distruct) 할 수 있다.
// //분해하면 좀 더 자연스러운 코드가 된다.
// for(let[u,r] of userRoles.entries()){
//     console.log(`${u.name} : ${r}`);
// // Cynthia : Admin
// // Jackson : User
// // Olive : Admin
// }
// //**entries()메서드는 맵의 기본 이터레이터이다.(for of 루프 사용가능)
// //위 코드는 다음과 같이 단축해서 쓸 수 있다.
// for(let [u,r] of userRoles){
//     console.log(`${u.name} : ${r}`);
// //Cynthia : Admin
// //Jackson : User
// //Olive : Admin
// }
// //이터러블 객체보다 배열이 필요하면 확산연산자(spead operator)를 쓰자
// console.log([...userRoles.values()]); //[ 'Admin', 'User', 'Admin' ]
// //맵의 요소를 지울때 delete() 메서드를 사용한다.
// console.log(userRoles);
// // Map {
// //     { name: 'Cynthia' } => 'Admin',
// //     { name: 'Jackson' } => 'User',
// //     { name: 'Olive' } => 'Admin' }
// userRoles.delete(u2);
// console.log(userRoles);
// // Map { { name: 'Cynthia' } => 'Admin',
// // { name: 'Olive' } => 'Admin' }
// console.log(userRoles.size); //2
// //맵의 요소를 모두 지울때 clear() 메서드를 사용한다.
// userRoles.clear();
// console.log(userRoles); //Map {}


// ////////////////////////////////
// //위크맵**
// //WeakMap은 아래의 차이점을 제외하면 Map과 같다
// //1. 키는 반드시 객체여야한다.
// //2. WeakMap의 키는 가비지 콜렉션에 포함될 수 있다.
// //3. WeakMap은 이터러블이 아니고 clear() 메서드도 없다.
// //**보통 자바스크립트는 코드 어딘가 객체를 참조하는 한 그 객체를 메모리에 계속 유지한다!
// //예를 들면 Map의 키인 객체o가 있다면, 자바스크르립트는 Map이 존재하는 한 o를 메모리에 계속 유지한다.
// //WeakMap은 그렇지 않다. 그러므로 WeakMap은 이터러블이 될 수 없다. 
// //가비지컬렉션 중인 객체를 노출할 수 있기 때문이다.
// //WeakMap의 이런특징은 private변수를 사용하는데 좋다.
// const SecretsHolder = (function(){
//     const secrets = new WeakMap(); //객체를 키로 설정함.
//     return class{
//         setSecret(secret){
//             secrets.set(this, secret);
//         }
//         getSecret(){
//             return secrets.get(this);
//         }
//     }
// })();
// //위의 예제에서 WeakMap과 위크맵을 사용하는 IIFE를 넣었다.
// //IIFE 외부에서는 그 인스턴스에 비밀스런 내용을 저장할 수 있는 SecretHolder 클래스를 얻게 된다.
// //private 값을 저장할때는 setSecret()을 써야하고 볼때는 getSecret()을 써야한다.
// const a = new SecretsHolder();
// const b = new SecretsHolder();
// a.setSecret('secret A');
// b.setSecret('secret B');
// console.log(a.getSecret()); //secret A
// console.log(b.getSecret()); //secret B
// //위의 코드에서 생성한 SecretHolder클래스가 아닌 기존의 Map을 써도 되지만 그렇게 하면 SecretHolder
// //인스턴스에 저장한 내용이 가비지컬랙션에 포함되지 않는다.



// ///////////////////////////
// //셋
// //셋은 중복을 허용하지 않는 데이터 집합이다. 

// //Set 인스턴스를 만든다.
// const roles = new Set();
// //add메서드로 추가한다.
// roles.add("User"); 
// console.log(roles); //Set { 'User' }
// roles.add("Admin");
// console.log(roles); //Set { 'User', 'Admin' }
// console.log(roles.size); //2
// //*셋의 장점은 값을 추가할 때 이미 있는지 확인하고, 이미 있으면 아무것도 일어나지 않는다.
// roles.add("User");
// console.log(roles); //Set { 'User', 'Admin' }
// //delete()로 값을 제거하고 제거할 값이 있다면 제거 후 true값 반환 
// //없으면 false 반환
// console.log(roles.delete("Admin")); //true
// console.log(roles); //Set { 'User' }
// console.log(roles.delete("Admin")); //false


// //위크셋(WeakSet)
// //객체만 포함될 수 있고, 객체들은 가비지컬랙터 대상이 된다.
// //WeakMap처럼 WeakSet도 이터러블이 아니므로 용도는 매우 적다. 
// //사용용도는 해당 객체가 셋안에 존재하는지 알아보는것이다.

// //산타클로스가 naughty라는 WeakSet을 가지고 어떤 아이가 우는 아이인지 확인해서
// //선물대신 석탄을 놓고 간다를 코드로 옮겨보자
// const naughty = new WeakSet();

// const children = [
//     {name : "Suzy"},
//     {name : "Derek"},
// ];

// naughty.add(children[1]);

// for(let child of children){
//     if(naughty.has(child)){
//         console.log(`Coal for ${child.name}!`)
//     }else{
//         console.log(`presents for ${child.name}!`)
//     }
// }
// // presents for Suzy!
// // Coal for Derek!