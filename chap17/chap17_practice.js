// const input = "As I was going to Saint Ives";
// console.log(input.startsWith("going")); //false
// console.log(input.indexOf('was'));//5

// const re1 = /going/;
// const re2 = new RegExp("going");
// console.log(input.match(re1),input.match(re2));
// //[ 'going', index: 9, input: 'As I was going to Saint Ives' ] 
// //[ 'going', index: 9, input: 'As I was going to Saint Ives' ]
// console.log(input.match(/\w{3,}/ig));//[ 'was', 'going', 'Saint', 'Ives' ]
// console.log(input.search(/\w{3,}/ig));//5
// console.log(input.replace(/\w{4,}/ig,'****'));//As I was **** to **** ****


// const beer99 = "99 bottles of beer on the wall " + 
//                 "take 1 down and pass it around -- " +
//                 "98 bottles of beer on the wall.";
// console.log(beer99.match(/[0-9]/ig));//[ '9', '9', '1', '9', '8' ]
// console.log(beer99.match(/[\-0-9a-z.]/ig));
// console.log(beer99.match(/[^\-0-9a-z.]/ig));


// const input = "Address: 333 Main St., Anywhere, NY, 55532.  Phone: 555-555-2525.";
// console.log(input.match(/\d{5}.*/ig));//[ '55532.  Phone: 555-555-2525.' ]
// console.log(input.match(/\d{5}./ig));//[ '55532.' ]


// const input1 = "Regex pros the difference between\n" + 
//                 "<i>greedy</i> and <i>lazy</i> matching.";
// console.log(input1.replace(/<i>(.*)<\/i>/ig, '<strong>$1</strong>'));
// //<strong>greedy</i> and <i>lazy</strong> matching.
// console.log(input1.replace(/<i>(.*?)<\/i>/ig,'<strong>$1</strong>'));
// //<strong>greedy</strong> and <strong>lazy</strong> matching.



// const promo = "Openinf for XAAX is the dynamic GOOG! At the box office now!";
// console.log(promo.match(/([A-Z])([A-Z])\2\1/g));//[ 'XAAX', 'GOOG' ]


// const html = `<a class="foo" href="/foo" id="foo">Foo</a>\n` +
//             `<A href='/bar' Class="bar">Bar</a>\n` +
//             `<a href="/baz">Baz</a>\n` +
//             `<a onclick="javascript:alert('qux!')" href="/qux">Qux</a>`;
// function sanitizeATag(atag){
//     const parts = atag.match(/<a\s+(.*?)>(.*?)<\/a>/i);
//     console.log('parts:',parts);
//     const attribute = parts[1].split(/\s+/);
//     console.log('attribute:',attribute);
//     //[ 'class="foo"', 'href="/foo"', 'id="foo"' ]
//     console.log('filter:',attribute.filter(attr=>/^(?:class|id|href)[\s=]/i.test(attr)));
//     //filter: [ 'class="foo"', 'href="/foo"', 'id="foo"' ]
//     console.log('<a '+attribute.join(' ')+'>'+parts[2]+'</a>');
//     //<a class="foo" href="/foo" id="foo">Foo</a>
//     return '<a '+attribute.filter(attr=>/^(?:class|href|id)[\s=]/i.test(attr))+'>'+parts[2]+'</a>';
//     //<a class="foo",href="/foo",id="foo">Foo</a>
// }
// console.log(sanitizeATag(html));

// // let ex2 = html.replace(/<a .*?>(.*?)<\/a>/ig, function(m, g1, offset){
// //     console.log(`<a> tag found at ${offset}. contents: ${g1}`);
// //     console.log(`m:${m}`);
// // });
// // console.log(ex2);


var array = ['사자', '과자', '과일', '타자', '타일'];
var result = [];
array.forEach(function(example){
    if(example.match(/자$/)){
        result.push(example);
    }
})
console.log(result);
result.splice(0,result.length);
array.forEach(function(ex){
    if(ex.match(/^과/)){
        result.push(ex);
    }
})
console.log(result);