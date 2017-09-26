var canvas;
var context;
var trackBody;
var lengthOfSnake;
const BLOCK_SIZE = 20; //Size of each increment of snake part 
var keyLog;
window.onload = () => {
  canvas = document.getElementById("mainGame");
  context = canvas.getContext('2d'); 
  trackBody =  [
                {"x" : canvas.width/2, "y" : canvas.height/2},
                {"x" : canvas.width/2 + 20, "y" : canvas.height/2},
                {"x" : canvas.width/2 + 40, "y" : canvas.height/2},
                {"x" : canvas.width/2 + 60, "y" : canvas.height/2},
                {"x" : canvas.width/2 + 80, "y" : canvas.height/2},
                {"x" : canvas.width/2 + 80, "y" : canvas.height/2-20}
  ];
  lengthOfSnake = 6;
  
  context.fillStyle = "white";
  context.fillRect(0,0,canvas.width,canvas.height);
  context.fillStyle = "black";
  context.font="20px Arial";
  context.fillText("Current Length : " + lengthOfSnake.toString() ,550,30);
  // if i take each block to be 20 x 20 that would give we 40 blocks horizontal and 30 blocks vertically
  context.fillStyle = "green";
  document.onkeydown = function(evt){
    switch(evt.key){
 			case "ArrowRight":
        keyLog = "right";
 				break;
      
      case "ArrowLeft":
        keyLog = "left";
 			  break;
    
 			case "ArrowDown":
 				keyLog = "down";
 				break;
    
 			case "ArrowUp":
 				keyLog = "up";
 				break;
    
 		}

 	}
  
  
  trackBody.forEach((elem)=>{
    plotBody(elem.x,elem.y);
    
  });
};

var framesPerSecond = 100;
setInterval(() =>{moveEverything();drawEverything();},1000/framesPerSecond);
  

var moveEverything = () => {
  if(keyLog == "up"){
    //if currently moving left
    //add element to the top of current index
    var currentlyMoving = currentlyHeading();
    var bodyElemPos = {"x":0,"y":0};
    if(currentlyMoving == "left" || currentlyMoving == "right" || currentlyMoving == "up" ){
      bodyElemPos.x = trackBody[0].x;
      bodyElemPos.y = trackBody[0].y -  BLOCK_SIZE;
      trackBody.unshift(bodyElemPos);
      trackBody.pop();      
    }
    else if(currentlyMoving == "down"){
      trackBody.reverse();     
    }
  }
  
   else if(keyLog == "down"){
    //if currently moving left
    //add element to the top of current index
    var currentlyMoving = currentlyHeading();
    var bodyElemPos = {"x":0,"y":0};
    if(currentlyMoving == "left" || currentlyMoving == "right" || currentlyMoving == "down" ){
      bodyElemPos.x = trackBody[0].x;
      bodyElemPos.y = trackBody[0].y +  BLOCK_SIZE;
      trackBody.unshift(bodyElemPos);
      trackBody.pop();      
    }
    else if(currentlyMoving == "up"){
      trackBody.reverse();     
    }
  }
  
   else if(keyLog == "left"){
    //if currently moving left
    //add element to the top of current index
    var currentlyMoving = currentlyHeading();
    var bodyElemPos = {"x":0,"y":0};
    if(currentlyMoving == "left" || currentlyMoving == "down" || currentlyMoving == "up" ){
      bodyElemPos.x = trackBody[0].x -  BLOCK_SIZE;
      bodyElemPos.y = trackBody[0].y;
      trackBody.unshift(bodyElemPos);
      trackBody.pop();      
    }
    else if(currentlyMoving == "right"){
      trackBody.reverse();     
    }
  }
  
  else if(keyLog == "right"){
    //if currently moving left
    //add element to the top of current index
    var currentlyMoving = currentlyHeading();
    var bodyElemPos = {"x":0,"y":0};
    if(currentlyMoving == "right" || currentlyMoving == "down" || currentlyMoving == "up" ){
      bodyElemPos.x = trackBody[0].x +  BLOCK_SIZE;
      bodyElemPos.y = trackBody[0].y;
      trackBody.unshift(bodyElemPos);
      trackBody.pop();      
    }
    else if(currentlyMoving == "left"){
      trackBody.reverse();     
    }
  }
  
}




var currentlyHeading = () => {
  //Compares first and second element to see where the head of snake is headed
  
  if(trackBody[0].y == trackBody[1].y){
    if(trackBody[0].x < trackBody[1].x ){
      //headed left
      return "left";
      // bodyElemPos.x = trackBody[0].x - BLOCK_SIZE;
      // bodyElemPos.y = trackBody[0].y;
      // trackBody.unshift(bodyElemPos);
      // trackBody.pop();
    }
    else{
      //headed right
      // bodyElemPos.x = trackBody[0].x + BLOCK_SIZE;
      // bodyElemPos.y = trackBody[0].y;
      // trackBody.unshift(bodyElemPos);
      // trackBody.pop();
      return "right";
      
    }
  }
  
  else if(trackBody[0].x == trackBody[1].x){
    if(trackBody[0].y < trackBody[1].y ){
      //headed top
      // bodyElemPos.x = trackBody[0].x 
      // bodyElemPos.y = trackBody[0].y - BLOCK_SIZE;;
      // trackBody.unshift(bodyElemPos);
      // trackBody.pop();
      return "top";
    }
    else{
      //headed bottom
      // bodyElemPos.x = trackBody[0].x 
      // bodyElemPos.y = trackBody[0].y + BLOCK_SIZE;;
      // trackBody.unshift(bodyElemPos);
      // trackBody.pop();
      return "bottom";
    }
  
  }
  
}

var drawEverything = () => {
   trackBody.forEach((elem)=>{
    plotBody(elem.x,elem.y);
  });
}

var plotBody = (posX,posY) => {
   context.fillRect(posX,posY,BLOCK_SIZE,BLOCK_SIZE);
}