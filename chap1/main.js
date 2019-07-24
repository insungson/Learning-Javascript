$(document).ready(function() {
    'use strict';
    paper.install(window);
    paper.setup(document.getElementById('mainCanvas'));
    //paper.js를 전역 스코프에 설치 

    var c = Shape.Circle(200, 200, 80); 
    c.fillColor = 'black'; 
    var text = new PointText(200, 200); 
    text.justification = 'center'; 
    text.fillColor = 'white'; 
    text.fontSize = 20; 
    text.content = 'hello world';


    // var tool = new Tool();
    // tool.onMouseDown = function(event){
    //     var c = Shape.Circle(event.point.x, event.point.y, 20);
    //     c.fillcolor = 'green';
    // };


    // var c;
    // for(var x=25; x<400; x+=50){
    //     for(var y=25; y<400; y+=50){
    //         c=Shape.Circle(x,y,20); //x,y 좌표에 반지름 20인 원이 그려짐...
    //         c.fillColor='green';
    //     }
    // }


    paper.view.draw();
    console.log('main.js loaded');
   });
   