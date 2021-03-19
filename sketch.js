//to create variables
var PLAY = 1
var END = 0
var gameState = PLAY
var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

//to load images
function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(400,400);
  
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;

//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.addAnimation("GameOver",endImg)
boy.scale=0.08;
  
boy.setCollider("rectangle",0,0,400,boy.height);
//boy.debug = true
  
//creating new groups
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();
  
}

function draw() {

  background(0);
  
  if(gameState === PLAY) 
    {
      //to move the boy on mouse movement
        boy.x = World.mouseX;
      
      //code to reset the path
      if(path.y > 400 )
      {
      path.y = height/2;
      }
      
      //to destroy the object when they touch the boy
       if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection+50
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection+50
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection+50
    }
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if(swordGroup.isTouching(boy)) 
      {
        gameState = END;
      }
      
  }
    else if(gameState === END) 
    {
       path.velocityY = 0
      boy.changeAnimation("GameOver", endImg)
      boy.scale = 1.01
      boy.x = 200
      boy.y = 200
    }
  

  //to create edges and to collide the boy with the edges
  edges= createEdgeSprites();
  boy.collide(edges);
     
  drawSprites();
  
  //to view the score and increase the score
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);

}

//creating cash objects
function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

//creating diamond objects
function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
  }
}

//creating jewellery objects
function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

//creating sword objects
function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}