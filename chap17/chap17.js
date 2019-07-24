// //https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/%EC%A0%95%EA%B7%9C%EC%8B%9D
// //위의 사이트에서 찾으면서 보자
// //정규표현식
// //정교한 문자열 매칭 기능을 제공한다. 
// //String.prototype 메서드의 검색과 교체 기능에 한계가 있지만 그 한계에서도 쓸만하다.
// //아래의 예를 보자
// const input = "As I was going to Saint Ives";
// console.log(input.startsWith("As")); //true
// console.log(input.endsWith("Ives")); //true
// console.log(input.startsWith("going", 9)); //true -- 인덱스 9에서시작한다.
// console.log(input.endsWith("going", 14)); //treu -- 인덱스 14를 문자열의 끝으로 간주한다.
// console.log(input.includes("going", 10)); //false -- 인덱스 10에서 시작하면 going은 없다.
// console.log(input.indexOf("going")); //9
// console.log(input.indexOf("going", 10)); //-1   존재하지 않으면 -1로 리턴함.
// console.log(input.indexOf("nope")); //-1
// //위의 문자 비교는 대문자 소문자를 구분하지만 아래와 같이 바꾸면 소문자도 가능하다.
// console.log(input.toLowerCase().startsWith("as")); //true
// //String.prototype.replace는 문자열을 교체해준다.
// //그런데 이건 원래의 문자열을 그대로 두고 새문자열을 반환한다.
// console.log(input); //As I was going to Saint Ives
// const output = input.replace("going", "walking");
// console.log(output); //As I was walking to Saint Ives


// ////////////////////////////////
// //정규식 만들기
// //특정 문자열을 검색하는것으로 시작하자
// //자바스크립트의 정규식은 RegExp 클래스이다. 
// //RegExp 생성자로도 정규식을 만들수 있지만 간편한 리터럴 문법도 있다.
// //*정규식 리터럴은 슬래시로 감싼 형태이다!
// const re1 = /going/; //단어 "going"을 찾을 수 있는 정규식
// const re2 = new RegExp("going"); //생성자를 사용했지만 결과는 같다.


// //정규식 검색
// //위에서 정규식을 만들었으면 다양한 옵션으로 문자열을 검색할 수 있다.
// //아래에서 예재로 사용할 정규식은 /\w{3, }/ig 이다.
// // /\w{3, }/ig : 세글자 이상인 단어로 대소문자 구분없이 전체에서 찾는다.
// const input = "As I was going to Saint Ives";
// const re = /\w{3,}/ig;
// //문자열(input)의 메서드를 사용할때
// console.log(input.match(re)); //[ 'was', 'going', 'Saint', 'Ives' ]
// console.log(input.search(re)); //5 (세 글자 이상으로 이뤄진 첫 단어의 인덱스는 5이다.)
// //정규식(re)의 메서드를 사용할 때
// console.log(re.exec(input)); //[ 'was', index: 5, input: 'As I was going to Saint Ives' ] 
//                              //(처음일치하는것)
// console.log(re.exec(input)); //[ 'going', index: 9, input: 'As I was going to Saint Ives' ]
//                              //(exec는 마지막 위치를 '기억'한다.)
// console.log(re.exec(input)); //[ 'Saint', index: 18, input: 'As I was going to Saint Ives' ]
// console.log(re.exec(input)); //[ 'Ives', index: 24, input: 'As I was going to Saint Ives' ]
// console.log(re.exec(input)); //null -- 일치하는 것이 더는 없다.
// console.log(re.test(input)); //true 
//                              //(test는 현재 문자열에 해당 패턴이 존재하는지 아닌지 확인후 boolean형으로 리턴한다.)

// //exec 는 정규표현식과 일치하는 문자열들을 배열에 담아 그 배열을 리턴한다.(일치하는게 없을땐 null리턴)
// //문자열에 정규표현식과 일치하는 문자가 있는지 없는지를 체크하기를 원한다면 test 메소드나 search 메소드를 사용.
// //정규표현식으로 탐색할 필요가 없을 경우는 string object의 indexOf 메소드나 lastIndexOf 메소드를 사용.

// //정규식 리터럴을 그대로 써도 된다.
// console.log(input.match(/\w{3,}/ig)); //[ 'was', 'going', 'Saint', 'Ives' ]
// console.log(input.search(/\w{3,}/ig)); //5
// console.log(/\w{3,}/ig.test(input)); //true
// console.log(/\w{3,}/ig.exec(input)); //[ 'was', index: 5, input: 'As I was going to Saint Ives' ]

// //앞에서 사용한 String.prototype.replace 메서드를 이용하여 네글자 이상의 단어를 교체해보자
// const input1 = "As I was going to Saint Ives";
// console.log(input1); //As I was going to Saint Ives
// const output = input1.replace(/\w{4,}/ig, '****');
// console.log(output); //As I was **** to **** ****



/////////////////////////////
//입력소비
//정규식을 '큰 문자열에서 부분 문자열을 찾는 방법' 이라고만 생각해서는 안된다.
//좀더 나은 개념이 정규식은 입력 문자열을 소비하는 패턴이라고 생각하는 것이다.
//찾아낸 부분 문자열은 그렇게 소비한 결과로 만들어진 부산물이다.

//정규식 소비패턴 사진 참조 3개전부

//정규식이 문자열을 '소비'할때 사용하는 알고리즘을 간단히 살펴보자
//1. 문자열 외쪽에서 오른쪽으로 진행한다.
//2. 일단 소비한 글자에 다시 돌아오는 일은 없다.
//3. 한번에 한 글자씩 움직이며 일치하는 것이 있는지 확인한다.
//4. 일치하는 것을 찾으면 해당하는 글자를 한꺼번에 소비한 후 다음 글자로 진행한다.
//(정규식에 /g 플래그를 써서 전역으로 검색할 때에 해당한다.)


// ///////
// //대체
// //HTML 페이지를 문자열에 담았다고 가정할 때  이 문자열에서 외부 자원을 가르키는 태그
// //<a>, <area>, <link>, <script>, <source>, <meta>를 모두 찾고 싶다고 가정해보자
// //만약 위의 문자열에 예외적으로 <Area>, <LINK> 같은 태그도 포함이 되었을때 대체(alternation)
// //를 써서 해결해 보자
// const html = 'HTML with <a herf = "/one">one link</a>, and some JavaScript.' + 
//             '<script src = "stuff.js">';
// const matches = html.match(/area|a|link|script|source/ig);
// console.log(matches); //[ 'a', 'link', 'a', 'a', 'a', 'a', 'Script', 'script' ]

// //위에서 area는 반드시 a 보다 먼저 써야한다.  -> 순서로 찾기 때문에 a를 먼저 찾는다면 
// //area는 찾을 수 없다.

// //**파이프(|) : 대체를 뜻하는 메타문자이다.
// //i : 대소문자를 가리지 않고 찾는다. (ignore case)
// //g : 전체를 검색한다는 뜻이다. (globally) g플래그가 없으면 일치하는 것 중 첫번째 것만 반환한다.


// ///////////////
// //HTML 찾기
// //정규식은 HTML을 분석할 수 없다.
// //무언가를 분석하려면 각 구성요소를 완전히 분해할 수 있어야 하는데, 정규식은 간단한 언어만
// //분석이 가능하다. 물론 정규식으로도 복잡한 언어를 분석하는 사례가 있지만 정규식의 한계를
// //이해하고 상황에 맞게 더 알맞은 방법을 찾아야 한다. (전용파서를 찾아서 그걸로 하면된다.)
// const html = '<br> [!CDATA[[<br>]]';
// const matches = html.match(/<br>/ig);
// console.log(matches); //[ '<br>', '<br>' ]
// //위의 예에서 정규식은 두번 일치하지만, 이예제에서 <br>은 하나이다. 
// //다른건 글자데이터(CDATA)이다. 
// //이렇게 정규식은 <p>태그안에 <a>태그가 존재하는 계층적 구조에 매우 취약하다.
// //(전용파서로 찾자)


// ///////////////////////
// //문자셋
// //문자셋은 글자 하나를 다른 것으로 대체(alternation)하는 방법을 간단하게 줄인 것이다.

// //예를 들어 문자열에 있는 숫자를 모두 찾고 싶다고 하자. 대체를 사용한다면 다음과 같이 한다.
// const beer99 = "99 bottles of beer on the wall " + 
//                 "take 1 down and pass it around -- " +
//                 "98 bottles of beer on the wall.";
// const matches = beer99.match(/0|1|2|3|4|5|6|7|8|9/g);
// console.log(matches); //[ '9', '9', '1', '9', '8' ]
// //아래와 같이 범위로 찾으면 더 간단하게 찾을 수 있다.
// const m1 = beer99.match(/[0123456789]/g);
// console.log(m1); //[ '9', '9', '1', '9', '8' ]
// const m2 = beer99.match(/[0-9]/g);
// console.log(m2); //[ '9', '9', '1', '9', '8' ]
// //범위를 결합하는 것도 가능하다.
// //다음 정규식은 문자열에서 글자와 숫자, 기타 구두점을 찾는다.(공백만 빼고 다 찾는다.)
// const match = beer99.match(/[\-0-9a-z.]/g);
// console.log(match); //** /[\-0-9a-z.]/g 여기에서 0앞에 -를 빼면 문자열의 --부분이 안나온다!!
// // [ '9',
// //   '9',
// //   'b',
// //   .이런식으로 전부 불러오게 됨.
// //   .
// //   'l',
// //   'l',
// //   '.' ]
// const match1 = beer99.match(/[^\-0-9a-z.]/);
// console.log(match1);
// // [ ' ',
// //   index: 2,
// //   input: '99 bottles of beer on the wall take 1 down and pass it around --
// //    98 bottles of beer on the wall.' ]

// // ** ^ 은 선택한 문자열을 제외하고 전부 찾는 것이기 때문에 공백을 찾는다.



// /////////////////
// //자주쓰는 문자셋
// // \d : [0-9]
// // \D : [^0-9]         숫자를 제외한 모든 문자
// // \s : [ \t\v\n\r]    스페이스, 탭, 세로탭, 줄바꿈 전부 포함
// // \S : [^ \t\v\n\r]   
// // \w : [a-zA-Z_]      하이픈과 마침표는 포함되지 않았으므로 이 문자셋으로
// //                      도메인 이름이나 CSS 클래스 등을 찾을 수 없다. (단어를 찾는다.)
// // \W : [^a-zA-Z_]

// const stuff = 
// 'hight:     9\n' + 
// 'medium:    5\n' +
// 'low:       2\n';
// const levels = stuff.match(/:\s*[0-9]/g);
// console.log(levels); //[ ':     9', ':    5', ':       2' ]
// // 여기서 숫자는 무조껀 찾고 앞에 (: 공백) 이 있어도 같이 찾아서 붙여 넣는다.

// //* : 앞의 표현식이 0회 이상 연속으로 반복되는 부분과 대응됩니다. {0,} 와 같은 의미입니다.
// //예를 들어, /bo*/ 는 "A ghost booooed" 의 'boooo' 와 대응되고, 
// //"A bird warbled" 의 'b'에 대응되지만 "A goat grunted" 내의 어느 부분과도 대응되지 않습니다.

// // \D 는 전화번호를 정리할때 편리하다.
// const messyPhone = '(505) 555-1515';
// const meatPhone = messyPhone.replace(/\D/g,'');
// console.log(meatPhone); //5055551515

// // \S 는 문자열에 공백이 있는지 없는지 확인할 때 쓰인다.
// const field = '    something    ';
// const valid = /\S/.test(field);
// console.log(valid); //true


// ///////////////
// //반복
// //숫자나 문자를 여러개 찾는 경우엔 어떻게 해야할까?
// const beer99 = "99 bottles of beer on the wall " + 
//                 "take 1 down and pass it around -- " +
//                 "98 bottles of beer on the wall.";

// const match = beer99.match(/[0-9][0-9][0-9][0-9][0-9][0-9]/);
// console.log(match); //null

// //반복 메타 문자는 5가지가 있다.
// // {n} : 앞 표현식이 n번 나타나는 부분에 대응된다. N은 반드시 양의 정수여야 한다.
// // 예를 들어)) /a{2}/는 "candy,"의 'a'에는 대응되지 않지만, 
// // "caandy,"의 모든 a 와, "caaandy."의 첫 두 a 에는 대응된다.   

// // {n,} : 최소한 n번 이상 나타나는 부분에 대응된다.

// // {n,m} : n과 m은 양의 정수이고, n <= m를 만족해야 합니다.
// // 앞 문자가 최소 n개, 최대 m개가 나타나는 부분에 대응됩니다. m이 생략된다면, m은 ∞로 취급됩니다.
// //예를 들어)) /a{1,3}/는 "cndy"에서 아무것에도 대응되지 않지만, 
// //"caandy,"의 첫 두 a 와 "caaaaaaandy"의 첫 세 a 에 대응됩니다. 
// //"caaaaaaandy"에서 더 많은 a 들이 있지만, "aaa"에만 대응된다는 점에 주목하세요.

// // ? : 앞의 표현식이 0 또는 1회 등장하는 부분과 대응됩니다. {0,1} 와 같은 의미입니다.
// //예를 들어))  /e?le?/ 는 "angel"의 'el' 에 대응되고, ()(e만 들어간것도 포함)
// //"angle"의 'le' 에 대응되고 또한 "oslo" 의 'l'에도 대응됩니다.
// //만약 수량자 *, +, ?, {} 바로 뒤에 사용하면, 기본적으로 탐욕스럽던(가능한 한 많이 대응시킴) 
// //수량자를 탐욕스럽지 않게(가능한 가장 적은 문자들에 대응시킴) 만듭니다. 
// //예를 들어, /\d+/를 "123abc"에 적용시키면 "123"과 대응됩니다. 
// //그러나 /\d+?/를 같은 문자열에 적용시키면 오직 "1"과만 대응됩니다.
// //또한 이 문자는 x(?=y) 와 x(?!y) 항목에서 설명하는 바와 같이 
// //사전 검증(lookahead assertion)을 위해서도 쓰입니다.

// // + : 앞의 표현식이 1회 이상 연속으로 반복되는 부분과 대응됩니다. {1,} 와 같은 의미입니다.
// //예를 들어)) /a+/ 는 "candy"의 'a'에 대응되고 "caaaaaaandy" 의 모든 'a'들에 대응되지만, 
// //"cndy" 내의 어느 부분과도 대응되지 않습니다.


// //////////////
// // 마침표와 이스케이프

// const input = "Address: 333 Main St., Anywhere, NY, 55532.  Phone: 555-555-2525.";
// const match = input.match(/\d{5}.*/g); //뒤에 *이 붙고 검색한 뒤부터 전부 다 붙었다.)
// console.log(match); //[ '55532.  Phone: 555-555-2525.' ] 
// const match1 = input.match(/\d{5}./g); //*을 빼면 우편번호만 얻을 수 있다.
// console.log(match1); //[ '55532.' ]

// const equation = "(2+3.5)*7";
// const match2 = equation.match(/\d\+\d\.\d\)\*\d/);
// console.log(match2); //[ '2+3.5)*7', index: 1, input: '(2+3.5)*7' ]
// const match4 = equation.match(/\+\d\.\d\)\*\d/);
// console.log(match4); //'+3.5)*7', index: 2, input: '(2+3.5)*7' ]
// const match3 = equation.match(/\(\d\+\d\.\d\)\*\d/);
// console.log(match3); //'(2+3.5)*7', index: 0, input: '(2+3.5)*7' ]
// //인풋값은 같은데(equation을 넣어서 그렇다.)... 인덱스가 다르다... 인풋문자열과 다른 갯수을 말하는것 같다.


// /////////////////////
// // 그룹
// // 지금까지 문자 단 한개레 일치하는 것들을 주로 봤지만.. 반복을 사용하여 여러 문자를
// // 합쳐서 볼 수 있지만 그룹을 사용하면 하위 표현식을 만들고 단위 하나로 취급할 수 있다.
// // 그룹을 사용하면 그 그룹에 일치하는 결과를 나중에 쓸 수 있도록 캡처(capture)를 할 수 있다.
// // 캡처가 기본값이지만 캡처하지 않는 그룹도 만들 수 있다.
// // 이 책 저자는 캡처하지 않는걸 추천한다.
// // **그룹은 그냥 [] 를 하면 된다.
// // **캡처를 하지 않는 그룹은 (?:[subexpression])  이고 [subexpression]이 일치시키려는 패턴이다.
// // 아래의 예를 보자
// const text = "Visit oreilly.com today";
// const match = text.match(/[a-z]+(?:\.com|\.org|\.edu)/i);
// console.log(match); //[ 'oreilly.com', index: 6, input: 'Visit oreilly.com today' ]

// const html = '<link rel="stylesheet" herf="http://insecure.com/stuff.css">\n' + 
//             '<link rel="stylesheet" href="https://secure.com/securestuff.css">\n' +
//             '<link rel="stylesheet" href="//anything.com/flexible.css">';
// const matches = html.match(/(?:https?)?\/\/[a-z][a-z0-9]+/ig);
// console.log(matches); //[ '//insecure', '//secure', '//anything' ]
// //https? 는 s에 대한 옵션이다. https?)? 의 두번째 ?는 왼쪽 전체의 옵션이다.
// //처음 ?는 http https 구분이고 두번째 ?는 첫번째가 있던지 없던지에 대한 것이다.



// /////////////////////////////
// //소극적일치(lazy) VS 적극적일치(greedy)
// //정규식은 기본적으로 적극적일치를 따른다. 아래의 예를 통해 자세히 알아보자
// const input = "Regex pros the difference between\n" + 
//                 "<i>greedy</i> and <i>lazy</i> matching.";
// const repla = input.replace(/<i>(.*)<\/i>/ig, '<strong>$1</strong>');
// //* 교체문자열에 있는 $1은 .*그룹에 일치하는 문자열로 바뀐다.
// console.log(repla);
// // Regex pros the difference between
// // <strong>greedy</i> and <i>lazy</strong> matching.

// //**우리가 생각한것과 다른 결과가 나온다.. 이유는
// //정규식 엔진은 일치할 가능성이 있는 동안은 문자를 소비하지 않고 계속 넘어간다.
// //그리고 그 과정을 적극적으로 진행한다. 원래 문자열에는 </i>가 2개가 있으므로,
// //정규식은 첫 번째 것을 무시하고 두번째 것에서 일치한다고 판단된다.
// //그렇다면 아래에서 반복 메타문자 *를 소극적으로 바꾸는 방법을 알아보자
// //*뒤에 ?를 붙이면 소극적일치로 바뀐다.(? 는 {0,1}이므로 그런것일수도 있다.)
// const repla1 = input.replace(/<i>(.*?)<\/i>/ig, '<strong>$1</Strong>');//() 로 $1 그룹을 구분한다.
// console.log(repla1);
// // Regex pros the difference between
// // <strong>greedy</Strong> and <strong>lazy</Strong> matching.

// //위에서 처럼 다 바뀐 것을 확인할 수 있다.
// //?를 붙여서 소극적으로 바꾸면 정규식엔진은 </i>를 보는 즉시 일치하는 것을 
// //찾았다고 판단한다. 따라서 </i>를 찾을 때마다 찾은 것을 소비하고, 일치하는 
// //범위를 넒히려고 하지 않는다.



// ///////////
// //역참조(backreference)
// //그룹을 사용ㅎ면 역참조라는 테크닉을 쓸 수 있다. 많이 사용하진 않지만 유용하게
// //쓰이는 경우가 있다.  

// // 예를 들어 XYYX 형태의 밴드 이름을 찾고싶다고 생각해보자  PJJP, GOOG, ANNA등이 있다.
// //역참조는 이럴때 유용하게 쓰인다. 
// //숫자는 맨 왼쪽이 1번으로 시작해 오른쪽으로 갈 수록 1씩 늘어난다.
// // 역슬래시 뒤에 숫자를 써서 이 그룹을 참조할 수 있다.  즉\1은 맨 처음 일치한 그룹이다.
// const promo = "Openinf for XAAX is the dynamic GOOG! At the box office now!";
// const bands = promo.match(/([A-Z])([A-Z])\2\1/g);
// console.log(bands); //[ 'XAAX', 'GOOG' ]

// //정규식을 왼쪽에서 오른쪽으로 읽으면 그룹이 두 개 있고, 그 다음에 \2\1이 있다.
// //첫번째 그룹이 X에 일치하고, 두번째 그룹이 A에 일치하면 \2이 A이고, \1은 X이다.
// //**1,2그룹을 나누는 것은 () 이다!!!!!@@

// //실무에서는 HTML에서 태그의 속성값에 따라 쉽게 이용할 수 있다.
// //아래의 예를 보자
// //작은 따옴표와 큰따옴표를 모두 썼으므로 백틱으로 문자열 경계를 나타냈다.
// const html = `<img alt='A "simple" example.'>` +
//             `<img alt="Don't abuse it!">`;
// const mathces2 = html.match(/<img alt=(['"]).*?/g);
// console.log(mathces2);
// //[ '<img alt=\'', '<img alt="' ]
// const matches = html.match(/<img alt=(['"]).*?\1/g); //이게 책의 예제 
// console.log(matches);                            //나머지 2개는 내가 만든거
// // [ '<img alt=\'A "simple" example.\'',
// //   '<img alt="Don\'t abuse it!"' ]
// const matches1 = html.match(/<img alt=(['"]).*\1/g);
// console.log(matches1);
// //[ '<img alt=\'A "simple" example.\'><img alt="Don\'' ]

// //2번째예제(책의 예제)
// //우선 위의 예제들은 다른 속성이 alt 속성보다 앞에 있거나 alt 앞에 공백이 2개 이상이면
// //위의 정규식으로는 아무것도 찾지 못한다. 
// // 첫번째 그룹은 따옴표 뒤에 0개 이상의 문자를 찾는다.(물음표를 썻으므로 소극적으로 일치하여
// //, 두번째 <img>까지 진행하는 일은 없다.) 그다음에 있는 \1은 앞에서 찾은 따옴포의 짝이다.

// //참고로 3번째 예제에서 ?를 지우고 적극적일치로 바꾸게 되면 "'가 되는 부분인 Don'에서 끝이
// //나는 것이다. 소극적으로 바꾸면 (?는 {0,1}과 같으므로 "것만도 진행이 되므로 다 읽히는 것이다.)

// //. : 개행 문자를 제외한 모든 단일 문자와 대응됩니다.(줄 바꿈을 제외한 모든문자)
// //예를 들어, /.n/는 "nay, an apple is on the tree"에서 
// //'an'과 'on'에 대응되지만, 'nay' 에는 대응되지 않습니다.

// //? : 	1)앞의 표현식이 0 또는 1회 등장하는 부분과 대응됩니다. {0,1} 와 같은 의미입니다.
// //예를 들어, /e?le?/ 는 "angel"의 'el' 에 대응되고, "angle"의 'le' 에 대응되고 또한 
// //"oslo" 의 'l'에도 대응됩니다.
// //       2)만약 수량자 *, +, ?, {} 바로 뒤에 사용하면, 기본적으로 탐욕스럽던(가능한 한 많이 대응시킴) 
// //         수량자를 탐욕스럽지 않게(가능한 가장 적은 문자들에 대응시킴) 만듭니다. 
// //예를 들어, /\d+/를 "123abc"에 적용시키면 "123"과 대응됩니다. 
// //그러나 /\d+?/를 같은 문자열에 적용시키면 오직 "1"과만 대응됩니다.

// //* : 앞의 표현식이 0회 이상 연속으로 반복되는 부분과 대응됩니다. {0,} 와 같은 의미입니다.
// //예를 들어, /bo*/ 는 "A ghost booooed" 의 'boooo' 와 대응되고, "A bird warbled" 의 
// //'b'에 대응되지만 "A goat grunted" 내의 어느 부분과도 대응되지 않습니다.

// //[xyz] : 문자셋(Character set) 입니다. 
// //이 패턴 타입은 괄호 안의 어떤 문자(이스케이프 시퀀스까지 포함)와도 대응됩니다. 
// //점(.) 이나 별표 (*) 같은 특수 문자는 문자셋 내부에서는 특수 문자가 아닙니다. 
// //따라서 이스케이프시킬 필요가 없습니다. 하이픈을 이용하여 문자의 범위를 지정해줄 수 있습니다.
// //예를 들어, 패턴 [a-d] 는 패턴 [abcd] 와 똑같이 동작하며, "brisket"의 'b' 에 일치하고,
// // "city"의 'c' 에 일치합니다. 패턴 /[a-z.]+/ 와 /[\w.]+/ 는 "test.i.ng" 전체 문자열이 일치합니다.




// /////////////////////
// //그룹교체
// //그룹을 사용하면 문자열 교체도 더 다양한 방법으로 할 수 있다.
// // <a>태그에서 href가 아닌 속성을 전부 제거하고 싶다고 하자.
// let html = '<a class="nope" href="/yep">Yep</a>';
// html = html.replace(/<a.*?(href=".*?").*?/, '<a $1>');
// console.log(html); //<a href="/yep">>Yep</a>
// //앞에서 배운 역참조와 마찬가지로 모든 그룹은 1로 시작하는 숫자를 할당 받는다.
// //정규식에서 첫번째 그룹은 \1이고. 교체할 문자열에서는 $1이 첫번째 그룹에 해당한다.
// //이번에도 소극적 일치(?붙이는것)를 써서 다른 <a>태그까지 검색이 확장되는 것을 막았다.
// //이 정규식은 href 속성의 값에 큰 따옴표가 아니라 작은 따옴표를 쓴 문자열에서는 
// //아무것도 찾지 못한다.

// //좀더 복잡한 예제를 보자 
// //class 속성과 href속성을 남기고 나머지는 모두 없애는 예제를 보자
// let html1 = '<a class="yep" href="/yep" id="nope">Yep</a>';
// html1 = html1.replace(/<a .*?(class=".*?").*?(href=".*?").*?>/, '<a $2 $1>');
// console.log(html1); //<a href="/yep" class="yep">Yep</a>
// //위의 정규식에서 class와 href의 순서를 바꾸므로 결과 문자열에서는 href가 먼저 나온다.
// //이 정규식은 class뒤에 href가 있어야 동작하고, 앞에서와 마찬가지로 속성값에 작은 
// //따옴표를 쓰면 동작하지 않는다. 
// // **$1 $2 에서 숫자는 번호인데 이 구분은 ()로 한다.
// // 즉, (class=".*?") 는 1번이고,  (href=".*?") 는 2번이다.

// //$` : 앞에 있는 전부를 참조한다.
// //$& : 일치하는 것 자체
// //$' : 뒤에 있는 전부를 참조한다.
// //$$ : $뒤에 있는 문자를 사용할때 쓴다.
// const input = "One two three";
// let ex1 = input.replace(/two/, '($`)');
// console.log(ex1); //One (One ) three
// let ex2 = input.replace(/two/, '($&)');
// console.log(ex2); //One (two) three
// let ex3 = input.replace(/two/, "($')");
// console.log(ex3); //One ( three) three
// let ex4 = input.replace(/two/, '($$)');
// console.log(ex4); //One ($) three


// ////////////////////////
// //함수를 이용한 교체
// //아래의 예제에서 <a>태그 안에 class id href 속성은 허용하지만 나머지
// //속성은 모두 제거한다. 
// const html = `<a class="foo" href="/foo" id="foo">Foo</a>\n` +
//             `<A href='/bar' Class="bar">Bar</a>\n` +
//             `<a href="/baz">Baz</a>\n` +
//             `<a onclick="javascript:alert('qux!')" href="/qux">Qux</a>`;
// //위의 문자열을 <a>태그만 인식하는 정규식, 그리고 <a>태그의 속성중에서 필요한
// //것만 남기는 정규식 두 개를 쓰면 간단해진다.
// //아래의 함수에서 String.prototype.split을 써서 한번에 한가지 속성만 체크해보자
// function sanitizeATag(aTag){
//     //태그에서 원하는 부분을 뽑아낸다.
//     const parts = aTag.match(/<a\s+(.*?)>(.*?)<\/a>/i);
//     //parts[1]은 여는 <a>태그에 들어있는 속성이다.
//     //parts[2]는 <a> </a> 태그 사이에 있는 텍스트이다.
//     const attributes = parts[1] //위에서 그룹을 2개로 나눴기 때문에 part 0,1로 나눌수 있다.
//     //속성을 분해한다.
//     .split(/\s+/);
//     return '<a ' + attributes
//     //class, id, href 속성만 필요하다.
//     .filter(attr => /^(?:class|id|href)[\s=]/i.test(attr))
//     //(test는 현재 문자열에 해당 패턴이 존재하는지 아닌지 확인후 boolean형으로 리턴한다.)
//     //스페이스 한칸으로 구분해서 합친다.
//     .join(' ')
//     //여는 <a>태그를 완성한다.
//     + '>'
//     //텍스트를 추가한다.
//     + parts[2]
//     //마지막으로 태그를 닫는다.
//     + '</a>';
// }
// //하나의 정규식으로 이걸 풀수는 없다. 
// //여기서는 하나는<a>태그의 각 부분을 찾는데 썼고, 다른 하나는 하나이상의 공백을 찾아
// //문자열을 분리하는데 썼다. 그리고 마지막 하나는 우리가 원하는 속성만 남도록 필터하는데
// //썼다.

// //<a>태그를 찾는 정규식은 아래와 같이 만들 수 있다.
// let ex1 = html.match(/<a.*?>(.*?)<\/a>/ig);
// console.log(ex1);
// // [ '<a class="foo" href="/foo" id="foo">Foo</a>',
// //   '<A href=\'/bar\' Class="bar">Bar</a>',
// //   '<a href="/baz">Baz</a>',
// //   '<a onclick="javascript:alert(\'qux!\')" href="/qux">Qux</a>' ]

// //위의 <a>태그를 찾는 정규식에서 String.prototype.replace에 교체할 매개변수로
// //함수를 넘길 수 있다. 한번 아래의 예를 보자
// let ex2 = html.replace(/<a .*?>(.*?)<\/a>/ig, function(m, g1, offset){
//     console.log(`<a> tag found at ${offset}. contents: ${g1}`);
//     console.log(`m:${m}`);
// });
// console.log(ex2);
// // {/* <a> tag found at 0. contents: Foo
// // m:<a class="foo" href="/foo" id="foo">Foo</a>
// // <a> tag found at 43. contents: Bar
// // m:<A href='/bar' Class="bar">Bar</a>
// // <a> tag found at 78. contents: Baz
// // m:<a href="/baz">Baz</a>
// // <a> tag found at 101. contents: Qux
// // m:<a onclick="javascript:alert('qux!')" href="/qux">Qux</a> */}
// // undefinedundefined
// // undefined
// // undefined

// //String.prototype.replace에 넘기는 함수는 다음 순서대로 매개변수를 받는다.
// //*m : 일치하는 문자열 전체($&와 같다)
// //*g1 : 일치하는 그룹(일치하는 것이 있다면). 일치하는 것이 여럿이라면 매개변수도 여러개를 받는다.
// //      (위에서 정규식으로 일치하는게 4개여서 4개가 검색되었다.)
// //*offset : 원래 문자열에서 일치하는 곳의 오프셋(숫자) 인덱스 위치

// // function replacer(match, p1, p2, p3, offset, string) {
// //     // p1 is nondigits, p2 digits, and p3 non-alphanumerics
// //     return [p1, p2, p3].join(' - ');
// //   }
// // match(위에서 m) : 일치하는 문자열 전체($&와 같다)
// // p1,p2,...(위에서 g1) : 일치하는 그룹(일치하는 것이 있다면). 일치하는 것이 여럿이라면 매개변수도 여러개를 받는다.
// // offset : 원래 문자열에서 일치하는 곳의 오프셋(숫자) 인덱스 위치

// //String.prototype.replace는 함수가 반환하는 값을 써서 원래 문자열을 교체한다.
// //위의 예제는 콘솔에 출력할 뿐 아무것도 반환하지 않기 때문에 undefined가 반환되고,
// //String.prototype.replace는 undefined를 문자열로 바꿔서 사용한다.

// //앞에서 <a>태그를 규격화 하는 함수도 만들었고, HTML 블록에서 <a>태그를 찾는 방법도 
// //알기 때문에 둘을 합쳐보자
// let ex3 = html.replace(/<a .*?<\/a>/ig, function(m){
//     return sanitizeATag(m);
// });
// console.log(ex3);
// // <a class="foo" href="/foo" id="foo">Foo</a>
// // <a href='/bar' Class="bar">Bar</a>
// // <a href="/baz">Baz</a>
// // <a href="/qux">Qux</a>

// //위의 함수는 콜백함수에 매개변수를 넘기는 방식으로 되어있기 때문에
// //바로 넣으면 된다.
// let ex4 = html.replace(/<a .*?<\/a>/ig, sanitizeATag);
// console.log(ex4);
// // <a class="foo" href="/foo" id="foo">Foo</a>
// // <a href='/bar' Class="bar">Bar</a>
// // <a href="/baz">Baz</a>
// // <a href="/qux">Qux</a>

// //위의 방법을 사용할때 큰문자열에서 작은 문자열을 찾고, 찾은 문자열을 가지고
// //어떤 작업을 해야한다면 String.protorype.replace에 콜백함수를 넘길수 있다는 것을
// //기억하자!!



// /////////////////////////
// //위치 지정
// //문자열을 사용하다보면 '~~으로 시작하는 문자열', '__으로 끝나는 문자열'
// //'그 문자열의 처음' 하는 시으로 생각하게 될때가 많다.
// //~~,__를 정규식의 앵커(anchor)라고 부른다.
// //앵커는 2가지 종류가 있다. 
// //^ : 문자열의 맨 처음을 나타낸다.
// //$ : 문자열의 마지막을 나타낸다.
// //** ^는 '^' 가 문자셋([abc]) 패턴의 첫 글자로 쓰인다면, 그 때는 전혀 다른 의미를 가진다. 
// // ([^abc])는 abc를 제외한 나머지를 뜻하는 말이다.
// const input = "It was the best of times, it was the worst of times";
// const beginning = input.match(/^\w+/g);
// console.log(beginning);  //[ 'It' ]
// const end = input.match(/\w+$/g);
// console.log(end);  //[ 'times' ]
// const everything = input.match(/^.*$/g);
// console.log(everything); //[ 'It was the best of times, it was the worst of times' ]
// const nomatch1 = input.match(/^best/ig);
// console.log(nomatch1); //null
// const nomatch2 = input.match(/worsy$/ig);
// console.log(nomatch2); //null

// //앵커는 재밌는 특징이 있다.
// //만약 문자열에 줄바꿈 문자가 들어있다면 각줄의 처음과 끝을 찾을 수 있다.
// // g :	전역 검색
// // i :	대소문자 구분 없는 검색
// // m :	다중행(multi-line) 검색
// // u :	유니코드; 패턴을 유니코드 코드 포인트의 나열로 취급한다.
// // y :	"sticky" 검색을 수행. 문자열의 현재 위치부터 검색을 구행한다.
// const input1 = "One line\nTwo lines\nThree lines\nFour";
// const beginning1 = input1.match(/^\w+/mg);
// console.log(beginning1);  //[ 'One', 'Two', 'Three', 'Four' ]
// const ending1 = input1.match(/\w+$/mg);
// console.log(ending1); //[ 'line', 'lines', 'lines', 'Four' ]



// //////////////////////////////
// //단어 경계 일치
// //단어 경계 메타 문자인 \b \B는 앵커와 마찬가지로 입력을 소비하지 않는다.
// //입력을 소비하지 않는것은 매우 유용하다.
// //\b : 단어 경계에 대응됩니다. 단어 경계는 다른 '단어 문자'가 앞이나 뒤에 
// //     등장하지 않는 위치에 대응된다. 단어의 경계는 대응 결과에 포함되지 않는다는 
// //     사실에 주의하자. 다른 말로는, 단어의 경계에 대응되는 문자열의 길이는 항상 0이다.
// //     (패턴 [\b]와 혼동하지 마세요.)
// //     예제:
// //     /\bm/는 "moon"의 'm'에 대응됩니다;
// //     /oo\b/ 는 "moon"의 'oo' 부분에 대응되지 않는데, 
// //     왜냐하면 'oo'를 뒤따라오는 'n'이 단어 문자이기 때문입니다;
// //     /oon\b/는 "moon"의 'oon'에 대응됩니다. 왜냐하면, 'oon'은 문자열의 끝이라서, 
// //     뒤따라오는 단어 문자가 없기 때문입니다 
// //[\b] : 백스페이스(U+0008)에 대응됩니다. 이와 같이, 백스페이스 문자 리터럴에 대응시키려면, 
// //       대괄호("[]")를 이용해야만 합니다. (\b와 혼동하지 마세요.)
// //\B : 	단어 경계가 아닌 부분에 대응됩니다. 아래와 같은 경우들이 있습니다:
// //      1. 문자열의 첫 번째 문자가 단어 문자가 아닌 경우, 해당 문자의 앞 부분에 대응됩니다.
// //      2. 문자열의 마지막 문자가 단어 문자가 아닌 경우, 해당 문자의 뒷 부분에 대응됩니다.
// //      3. 두 단어 문자의 사이에 대응됩니다.
// //      4. 단어 문자가 아닌 두 문자 사이에 대응됩니다.
// //      5. 빈 문자열에 대응됩니다.
// //      문자열의 시작 부분과 끝 부분은 단어가 아닌 것으로 간주됩니다.
// //      예를 들어, /\B../ 는 "noonday"의 'oo'와 대응되며, /y\B./ 는 "possibly yesterday."의 'ye'와 대응됩니다.
// //      ..은 문자 스펠링 2개를 의미하는 것같다. 그래서 /\B../ 은 그냥 처음과 끝에 문자가 아닌, 중간에 같은 문자가
// //      2개 있음 인정! 된다.
// //      /y\B./는 y뒤에 \B.이 붙었으므로 y가 맨마지막이면 안되고 뒤에. 1개가 붙었으므로 y+1개 가 된다.

// //아래의 예제에서 이메일 주소 -> 하이퍼링크 형태로 바꿔보자
// const inputs = [
//     "john@doe.com",              //이메일 주소만 있다.
//     "john@doe.com is my email",  //이메일 주소로 시작한다.
//     "my email is john@doe.com",  //이메일 주소로 끝난다.
//     "use john@doe.com, my email",//이메일 주소가 중간에 있고 바로뒤에 쉼표가 있다.
//     "my email : john@doe.com"    //이메일 주소 주위에 구두점이 있다.
// ];
// const emailMatcher = 
// /\b[a-z][a-z0-9._-]*@[a-z][a-z0-9._-]+\.[a-z]+(?:\.[a-z]+)?\b/ig;
// //위 정규식 해석
// //\b는 단어로 시작하고 단어 중 알파벳 시작[a-z] 뒤에 추가로 알파벳, 숫자, 붙는거 가능
// //[a-z0-9._-] 뒤에 *가 붙어서  {0,}의 의미로 [a-z] 알파벳으로 시작하는 단어중 뒤에
// // 숫자나 알파벳 어떤게 들어가도 상관없음[a-z0-9._-] 그 뒤 @역시 [a-z][a-z0-9._-]+
// // 알파벳으로 시작하는 단어중 알파벳 숫자중 암거나 1개이상 들어감 (이게 +의 의미)
// // 뒤에꺼가 좀 했깔린다... 
// // \.[a-z]+ 이걸 굳이 왜 쓰는지 이해가 안된다..  .com을 나타내려 하는것 같은데..
// // (?:\.[a-z]+)?\b  이거로도 표현이 가능하다고 생각하기 때문이다..
// // .알파벳1개 이상인 그룹에서 뒤가 단어로 끝나는 단어기 때문에 .com이 걸리기 때문이다.
// let ex1 = inputs.map(s => s.replace(emailMatcher, '<a href="mailto:$&">$&</a>'));
// console.log(ex1);
// // [ '<a href="mailto:john@doe.com">john@doe.com</a>',
// //   '<a href="mailto:john@doe.com">john@doe.com</a> is my email',
// //   'my email is <a href="mailto:john@doe.com">john@doe.com</a>',
// //   'use <a href="mailto:john@doe.com">john@doe.com</a>, my email',
// //   'my email : <a href="mailto:john@doe.com">john@doe.com</a>' ]

// //* \b \B의 단어 경계에 대해 알아보자
// // /\bcount/ 는 count, countdown을 찾지만, 
// //              discount, recount, accountable은 찾지 못한다.
// // /\bcount\B/ 는 countdown은 찾지만 count는 찾지 못한다.
// // /\Bcount\b/ 는 discount, recount 같은 단어만 찾을 수 있고,
// // /\Bcount\B/ 는 accountable 같은 단어만 찾을 수 있다.



// /////////////////////////////
// //룩어헤드
// //룩어헤드 역시 앵커나 단어 경계와 마찬가지로 입력을 소비하지 않는다.
// //하지만 룩어헤드는 하위 표현식도 소비하지 않고 찾을 수 있으므로,
// //앵커와 단어 경계보다 범용적으로 쓸 수 있다.
// //단어 경계에서 '다시 넣는' 방법을 고민할 필요가 없는 특징 역시 룩어헤드에 적용된다.
// //룩어헤드는 문자열이 겹치는(overlapping) 상황에 필요하고, 
// //룩어헤드를 써서 단순화 시킬 수 있는 패턴이 많다.

// //비번가 규칙에 맞는지 검사하는 예제를 보자 비번은 대문자, 소문자, 숫자가 최소한
// //하나씩 포함되어야 하고, 숫자도 아닌 문자는 들어갈 수 없다고 하자.
// function validPassword(p){
//     return /[A-Z]/.test(p) &&    // 대문자가 최소한 하나
//         /[a-z]/.test(p) &&       // 소문자가 최소한 하나
//         /[0-9]/.test(p) &&       // 숫자가 최소한 하나
//         !/[^a-zA-Z0-9]/.test(p); // 영문자와 숫자만 허용
// }

// //위의 정규식을 아래의 방법으로 하나로 묶어보자
// function validPassword(p){
//     return /[A-Z].*[0-9][a-z]/.test(p);
// }
// //위의 정규식은 대문자가 맨 앞에 있어야 하고, 숫자와 소문자로 끝나야 하는 등 
// //우리의 의도와 다른 규칙을 강요하고, 잘못된 문자가 있는지 체크하지도 않는다.
// //심지어 정규식이 진행하면서 문자를 소비한다...

// //룩어헤드는 입력을 소비하지 않는 독립적 정규식이다. 그래서 이럴때 쓰기 좋다.
// //자바스크립트의 룩어헤드는 ?=[subexpression] 형태이다.
// //하위 표현식 뒤에 이어지지 않는 것만 찾는 부정형 룩어헤드는 ?![subexpression] 형태이다.
// //룩어헤드를 사용하여 위의 정규식을 다시 바꿔보자
// function validPassword(p){
//     return /(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?!.*[^a-zA-Z0-9])/.test(p);
// }

// //룩어헤드 관련 예제들 참조
// // http://sweeper.egloos.com/m/3064808



// /////////////////////
// //동적으로 정규식 만들기
// //처음에 RegExp 생성자보다 정규식 리터럴을 쓰는 편이 좋다고 했다. 
// //정규식 리터럴을 쓰면 타이핑하는 수고도 덜 수 있고, 자바스크립트 문자열에서
// //역슬래시를 사용한 이스케이프도 줄어든다.  하지만 RegExp 생성자가 필요할 때도 있다.
// //동적으로 정규식을 만들어야 할 때가 그런 때이다.

// // 예를 들어 사용자 이름의 배열이 있고 문자열에서 그 배열을 사용해 일치하는 사용자 이름을
// // 찾고 싶다고 하자. 정규식 리터럴만 써서는 사용자 이름을 알아낼 방법이 없다.
// const users = ["mary", "nick", "arthur", "sam", "yvette"];
// const text = "User @arthur started the backup and 15:15, " + 
//             "and @nick and @yvette restored it at 18:35.";
// const userRegex = new RegExp(`@(?:${users.join('|')})\\b`,'g');
// console.log(userRegex); // /@(?:mary|nick|arthur|sam|yvette)\b/g
// let ex1 = text.match(userRegex);
// console.log(ex1);  //[ '@arthur', '@nick', '@yvette' ]
// //위의 예제를 정규식 리터럴로 만든다면 /@(?:mary|nick|arthor|sam|yvette)\b/g 일것이다.
// //하지만 여기선 동적으로 정규식을 만들었다.


// //////////////////////
// // https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/%EC%A0%95%EA%B7%9C%EC%8B%9D
// // https://www.w3schools.com/jsref/jsref_obj_regexp.asp
// //위의 주소에서 참조하여 정규식에 대해 공부하자
