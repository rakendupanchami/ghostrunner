var tower,towerImg;
var door,doorImg,doorG;
var climber,climberImg,climberG;
var ghost,ghostImg
var invisibleB,invisibleG
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var spooky

function preload(){
   towerImg = loadImage("tower.png");
   doorImg = loadImage("door.png");
   climberImg = loadImage("climber.png");
   ghostImg = loadImage("ghost-standing.png");
   spooky = loadSound("spooky.wav")
}


function setup(){
 createCanvas(600,600);
  
   //to add sound
   //spooky.loop();
  
   //to add sprite
   tower = createSprite(300,300);
   tower.addImage(towerImg);
   tower.velocityY = 1;
  
   ghost = createSprite(300,300,50,30);
   ghost.addImage(ghostImg);
   ghost.scale = 0.3;
  
  //to create group for doors and climbers
  doorG = new Group();
  climberG = new Group();
  invisibleG = new Group();
  
}


function draw(){
  background(0);
  
  if(gameState === PLAY){
   if(tower.y >400){
    tower.y = 300;
  }
  
  //to jump the ghost 
  if(keyDown("space")){
    ghost.velocityY = -1 ; 
  }
  
  //to add gravity to ghost
  ghost.velocityY = ghost.velocityY + 0.4  ;
  
  // to move the ghost left & right
  if(keyDown("left_arrow")){
    ghost.x = ghost.x-3;
  }
  
  if(keyDown("right_arrow")){
    ghost.x = ghost.x+3;
  }
  
  if(climberG.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  
    if(invisibleG.isTouching(ghost)|| ghost.y>600){
      gameState = END;
    }
  spawnDoors();
  drawSprites(); 
  }
  
  if(gameState === END){
    background("black");
    stroke("yellow");
    fill("yellow");
    textSize(50);
    text("GAME OVER!",150,280);
    
  }
  
}

function spawnDoors(){
  if(frameCount % 230===0){
  door = createSprite(100,30);
  door.addImage(doorImg);
    
  climber = createSprite(100,90);
  climber.addImage(climberImg);
    
  invisibleB = createSprite(100,95);
  invisibleB.width = climber.width;
  invisibleB.height = 3;
    
  door.x = Math.round(random(100,500));
  climber.x = door.x;
  invisibleB.x = climber.x;
    
  door.velocityY = 1;
  climber.velocityY = 1;
  invisibleB.velocityY = 1;
    
  door.lifetime = 600;
  climber.lifetime = 600;
  invisibleB.lifetime = 600;
    
  doorG.add(door);  
  climberG.add(climber);
  invisibleG.add(invisibleB);
    
  // to assign the depth of the door
    ghost.depth = door.depth;
    ghost.depth+=1;
}
}

  
  
