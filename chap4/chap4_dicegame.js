//크라운앤 앵거 게임 알고리즘 코딩

//m이상 n이하의 무작위 정수를 반환한다.
function rand(m,n){
    return m + Math.floor((n-m+1)*Math.random());
}

//크라운 앤 앵거 게임의 여섯 그림 중 하나에 해당하는 문자열을 무작위로 반환한다.
function randFace(){
    return ["crown","anchor","heart","spade","club","diamond"][rand(0,5)]; 
    //배열을 연속으로["1","2"][1] 하면 그 2가 나온다. 배열자리수를 부르면 그게 나옴..
}

let funds = 50; // 자본금 50으로 시작
let round = 0;

while(funds>1 && funds<100){
    round++;
    console.log(`round ${round}:`);
    console.log(`\tstarting funds: ${funds}pence`); //라운드가 진행됨에 따라남은 자본금
    //이제 돈을 건다
    let bets = {crown:0, anchor:0, heart:0, spade:0, club:0, diamond:0}; //각 라운드에 돈을 건다.
    let totalBet = rand(1, funds);  //각 라운드에 거는 총 돈의 금액
    if(totalBet === 7){ //그냥 막꺼낸 돈이 7이면... 하트에 몰빵한다..ㅋㅋ
        totalBet = funds;
        bets.heart = totalBet;
    }else{
        //판돈을 나눈다. bets 항목에서 어디에 얼마나 걸지 여기서 결정
        let remaining = totalBet;
        do{
            let bet = rand(1, remaining);
            let face = randFace();
            bets[face] = bets[face] + bet;
            remaining = remaining - bet;
        }while(remaining>0)
    }
    funds = funds - totalBet;
    console.log(`\tbets:` + Object.keys(bets).map(face => `${face}: ${bets[face]} pence`).join(', ') + `(total: ${totalBet} pence)`);

    //주사위를 굴린다.
    const hand = [];
    for(let roll=0; roll<3; roll++){    //주사위를 3번던지므로 이렇게 제한한다.
        hand.push(randFace());
    }
    console.log(`\thand: ${hand.join(', ')}`);

    //딴 돈을 가져온다.
    let winnings = 0;
    for(let die=0; die<hand.length; die++){
        let face = hand[die];
        if(bets[face]>0){
            winnings = winnings + bets[face];   //동전 갯수만큼 걸기 때문에 
        }
    }
    funds = funds + winnings;
    console.log(`\twinnings: ${winnings}`);
}
console.log('///////////////////////////');
console.log(`\tending funds: ${funds}`);