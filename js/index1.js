var canvas;
var ctx;
var xv = 50 ,yv = 50;
var foodX,foodY;
const BODY_SIZE = 20;
const FOOD_SIZE = 10;
var trail = [
             
             { x : xv + BODY_SIZE , y : yv },
             { x : xv + BODY_SIZE* 2   , y : yv },
             { x : xv + BODY_SIZE * 3  , y : yv } ];
var length = 5;

window.onload = () => {
  canvas = document.getElementById("mainGame");
  ctx = canvas.getContext('2d'); 
  ctx.fillStyle = "white";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  // ctx.fillStyle = "black";
  // ctx.font="20px Arial";
  // ctx.fillText("Current Length : " + lengthOfSnake.toString() ,550,30);

  document.addEventListener('keydown',handleKeyDown);
  var framesPerSecond = 100;
  setInterval(mainGame,1000/framesPerSecond);
  //Food
  setInterval(dropFood,25 * framesPerSecond);

};


var mainGame = () => {

 
  ctx.fillStyle = "white";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  
  //ball
  if(!collision()){
    ctx.fillStyle = "orange"
    ctx.beginPath();
    ctx.arc(foodX,foodY,FOOD_SIZE/2,0,Math.PI*2);
    ctx.fill();
  }
  else {    
    length++;
    for(var i = 0; i < 3; i++)
      trail.unshift(trail[0]);

    //displaying it outside the screen until reset.A way of deleting food4
    console.log(length);
    foodX = -100;
    foodY = -100;
    
  }

  checkBoundaries();

  //drawing snake bouderies
  ctx.fillStyle = "#bada55";
  ctx.fillRect(xv,yv,BODY_SIZE - 2 ,BODY_SIZE - 2 );

  //draw an array of rects
  trail.forEach(function(elem,index){
      ctx.fillRect(elem.x  ,elem.y,BODY_SIZE - 2,BODY_SIZE - 2)
  })
  
  
  


}

var collision = () => {
  var bodyBox={
    x : xv - BODY_SIZE/2,
    y : yv - BODY_SIZE/2,
    width : BODY_SIZE,
    height : BODY_SIZE

  }
  var foodBox={
    x : foodX - FOOD_SIZE/2,
    y : foodY - FOOD_SIZE/2,
    width : FOOD_SIZE,
    height : FOOD_SIZE

  }

  return testCollisionRect(bodyBox,foodBox);
 

}

var  testCollisionRect = (rect1,rect2) => {
  return rect1.x <= rect2.x + rect2.width
    && rect2.x <= rect1.x + rect1.width
    && rect1.y <= rect2.y + rect2.height
    && rect2.y <= rect1.y + rect1.height;

 }


var dropFood = () => {
  foodX = Math.floor(Math.random(0,1)*canvas.width);
  foodY = Math.floor(Math.random(0,1)*canvas.height);
}

var checkBoundaries = () => {
  if(xv < 0 ){
      xv = canvas.width - BODY_SIZE
  }
  else if (xv > canvas.width){
    xv = BODY_SIZE
  }
  else if(yv < 0 ){
      yv = canvas.height - BODY_SIZE
  }
  else if (yv > canvas.height){
    yv = BODY_SIZE
  }

}


var handleKeyDown = (evt) => {
    
    switch(evt.key){
      case "ArrowRight":
        trail.pop();
        trail.unshift({x : xv , y : yv });
        console.log(trail);
        xv += BODY_SIZE ; 
        
        break;
      
      case "ArrowLeft":
        trail.unshift({x : xv , y : yv });
        console.log(trail);
        xv -= BODY_SIZE ;
        trail.pop();
        break;
    
      case "ArrowDown":
        trail.pop();
        trail.unshift({x : xv , y : yv });
        console.log(trail);
        yv += BODY_SIZE;
        
        break;
    
      case "ArrowUp":
        trail.unshift({x : xv  , y : yv });
        console.log(trail);
        yv -= BODY_SIZE; 
        trail.pop();
        break;

      
    
    }

}