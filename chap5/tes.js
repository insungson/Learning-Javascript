
function k_combinations(set, k) {
  var i, j, combs, head, tailcombs;
  console.log('/////',set, k);/////////////////////////////////
  if (k > set.length || k <= 0) {
      return [];
  }
  if (k == set.length) {
      return [set];
  }
  if (k == 1) {
      combs = [];
      for (i = 0; i < set.length; i++) {
          combs.push([set[i]]);
      }
      return combs;
  }
  combs = [];
  for (i = 0; i < set.length - k + 1; i++) {
      head = set.slice(i, i+1);
      tailcombs = k_combinations(set.slice(i + 1), k - 1);//[1,2,3].slice(2,0) 은 그냥 빈 배열[]
      console.log('head',head,'tailcombs',tailcombs,'k',k);///////
      for (j = 0; j < tailcombs.length; j++) {
          combs.push(head.concat(tailcombs[j]));
          console.log('combs',combs);////////////////////
      }
  }
  return combs;
}
function combinations(set) {
  var k, i, combs, k_combs;
  combs = [];
  for (k = 1; k <= set.length; k++) {
      k_combs = k_combinations(set, k);
      console.log('k_combs',k_combs);//////////////////////
      for (i = 0; i < k_combs.length; i++) {
          combs.push(k_combs[i]);
      }
  }
  return combs;
}


console.log(combinations([1,2,3]));
//[ [ 1 ], [ 2 ], [ 3 ], [ 1, 2 ], [ 1, 3 ], [ 2, 3 ], [ 1, 2, 3 ] ]



//기본적인 원리는 1,2,3 을 따로 쪼개서 []에 넣고
// ///// [ 1, 2, 3 ] 1
// k_combs [ [ 1 ], [ 2 ], [ 3 ] ]

// ///// [ 1, 2, 3 ] 2
// ///// [ 2, 3 ] 1

//1, 23 이렇게 나눠서 12,13 을 []에 넣고
// head [ 1 ] tailcombs [ [ 2 ], [ 3 ] ] k 2
// combs [ [ 1, 2 ] ]
// combs [ [ 1, 2 ], [ 1, 3 ] ]

// ///// [ 3 ] 1

//2, 3을 나눠서 23을 []에 넣고
// head [ 2 ] tailcombs [ [ 3 ] ] k 2
// combs [ [ 1, 2 ], [ 1, 3 ], [ 2, 3 ] ]


// k_combs [ [ 1, 2 ], [ 1, 3 ], [ 2, 3 ] ]
// ///// [ 1, 2, 3 ] 3

//123을 []에 넣어서 끝낸다
// k_combs [ [ 1, 2, 3 ] ]
// [ [ 1 ], [ 2 ], [ 3 ], [ 1, 2 ], [ 1, 3 ], [ 2, 3 ], [ 1, 2, 3 ] ]