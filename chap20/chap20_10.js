const fs = require('fs');

fs.readdir(__dirname, function (err,files) {
    if(err) return console.error('Unable to read directory contents');
    console.log(files); //readdir은 배열 형태로 파일들을 가져온다.
    console.log(`Contents of ${__dirname} : `);
    console.log(files.map(f => '\t' + f).join('\n'));
  })

//위의 파일을 실행하면 폴더내의 파일 목록이 나온다.