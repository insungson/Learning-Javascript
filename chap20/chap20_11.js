//data 서브디렉토리에 들어있는 .txt 파일을 처리하는 프로그램이 있다고 한다.
const fs = require('fs');

fs.readdir(__dirname, function(err, files){
    if(err){
        console.error("Fetal error : couldn't read data directory.");
        process.exit(1);
    }
    const txtFiles = files.filter(f => /\.txt/i.test(f));
    if(txtFiles.length === 0){
        console.log("No .txt files to process.");
        process.exit(0);
    }
    // .txt 파일 처리.
    console.log(process.argv);
    //터미널에 아래와 같이 입력한다.
    //node chap20_11.js file1.txt file2.txt file3.txt  

    // [ 'C:\\Program Files\\nodejs\\node.exe',
    //   'C:\\Users\\son\\Desktop\\cording\\러닝자바스크립트\\chap3\\chap20_11.js',
    //   'file1.txt',
    //   'file2.txt',
    //   'file3.txt' ]

    //그럼 위와 같은 결과가 나온다.
    //위 배열의 첫번쨰 요소는 인터프리터, 즉 소스파일을 해석한 프로그램이다. (여기선 node가 쓰임)
    //두번째 요소는 실행중인 프로그램의 전체 경로이다.
    //나머지 요소는 프로그램에 전달된 매개변수이다.

    //첫번쨰, 두번째 요소는 필요없으므로 제거해보자
    const filenames = process.argv.slice(2);
    // console.log(filenames); //[ 'file1.txt', 'file2.txt', 'file3.txt' ]
    let counts = filenames.map(f => { //배열로 구성되어 있으므로 키값이 파일이름이다.
        try {
            const data = fs.readFileSync(f, {encoding:'utf8'}); //배열안의 파일이름으로 읽는다.
            return `${f} : ${data.split('\n').length}`;
        }catch(err){
            return `${f} : couldn't read file.`;
        }
    });
    console.log(counts.join('\n'));
    // file1.txt : couldn't read file.
    // file2.txt : couldn't read file.
    // file3.txt : couldn't read file.

    //아래와 같이 실행하면 
    //node chap20_11.js file1.txt file2.txt file3.txt hello.txt

    //아래와 같은 결과가 나온다.
    // file1.txt : couldn't read file.
    // file2.txt : couldn't read file.
    // file3.txt : couldn't read file.
    // hello.txt : 1

    // console.log(process.env); // process.env를 통해 환경변수에 접근할 수 있다. 
    const debug = process.env.DEBUG === "1" ? console.log : function(){};
    //위의 경우 환경 변수의 DEBUG가 1이면 console.log의 별칭이 되고, 아니면 null 함수가 된다.
    debug("Visible only if environment variable DEBUG is set!");
    console.log(debug); //[Function]

    //현재 작업 디렉토리의 기본값은 프로그램을 실행한 디렉토리이다.(프로그램이 존재하는 디렉토리가 아니다.)
    //process.cwd에는 현재 작업 디렉토리가 저장되고, process.chdir은 현재 작업 디렉토리를 바꿀 수 있다.
    console.log(`Current directory : ${process.cwd()}`);
    process.chdir(__dirname);
    console.log(`New current directory: ${process.cwd()}`);
//     Current directory : C:\Users\son\Desktop\cording\러닝자바스크립트\chap3
// New current directory: C:\Users\son\Desktop\cording\러닝자바스크립트\chap3
//위와 같은 결과가 나온다.
});


