var car;
var silver, gold, bronze,playerCar,bg2, bg,q,w,e,r,t,y;
var moneybank;
var life = 3;
var bronzeGroup,vehicleGroup,silverGroup,goldGroup;

var PLAY=1, END=0;
var gameState = PLAY;




function preload(){
bronze = loadImage("Photos/bronze_coin.PNG");
playerCar = loadImage("Photos/playerCar.jpg");
gold = loadImage("Photos/gold_coin.PNG");
silver = loadImage("Photos/silver_coin.PNG");
bg2 = loadImage("Photos/track 2.png");
q = loadImage("Photos/q.png");
w = loadImage("Photos/w.png");
e = loadImage("Photos/e.png");
r = loadImage("Photos/r.png");
t = loadImage("Photos/t.png");
y = loadImage("Photos/y.png");
}

function setup() {
  createCanvas(displayWidth - 20, displayHeight-30);

  bg=createSprite((displayWidth - 20)/2, (displayHeight-30)/2,displayWidth - 20, displayHeight-30);
bg.addImage(bg2);
//bg.velocityY = 2;
bg.scale=2;
bg.y = bg.height/2;
car=createSprite(300, 750,50,50);
car.addImage(playerCar);
car.scale= 0.2;
car.velocityY= -2
car.debug = true;
moneybank =0;

bronzeGroup = new Group();
vehicleGroup = new Group();
silverGroup = new Group();
goldGroup = new Group();
}

function draw() {
  background(0);
  if(gameState === PLAY){
    if(keyDown(RIGHT_ARROW)){
      car.x = car.x + 2;
    }

    if(keyDown(LEFT_ARROW)){
      car.x = car.x - 2;
        }


        spawnVehicles();
        for(var i =0; i< vehicleGroup.length;i++){
          if(vehicleGroup.isTouching(car)){
           life=life-1;
            
            // change the gamestate
           gameState = END;
            //2 lives left, player goes to original position
            //spawnMoneyand spawnVehicles start again
            //if life = 0, then game over, restart
          }
        }

        spawnMoney10();

        for(var i =0; i< bronzeGroup.length;i++){
          if(bronzeGroup.isTouching(car)){
            moneybank = moneybank+10;
            bronzeGroup.get(i).destroy();
          }
        }
        spawnMoney50();
        for(var i =0; i< silverGroup.length;i++){
          if(silverGroup.isTouching(car)){
            moneybank = moneybank+50;
            sliverGroup.get(i).destroy();
          }
        }
        spawnMoney100();
            for(var i =0; i< goldGroup.length;i++){
        if(goldGroup.isTouching(car)){
          moneybank = moneybank+100;
          goldGroup.get(i).destroy();
        }
      }

  }
  else if (gameState === END){
//stop the vehicles, player, money, vehicles
vehicleGroup.setVelocityYEach(0);
bronzeGroup.setVelocityYEach(0);
silverGroup.setVelocityYEach(0);
goldGroup.setVelocityYEach(0);
car.velocityY=0;
  }
   
  drawSprites();
  textSize(30);
  fill("white");
  text("Lives: " + life, 10,50);
  text("Money Bank: "+ moneybank,10,100);
  
}

function spawnMoney10(){
  if(frameCount % 120 === 0){
    var money = createSprite(300, 0, 30,30);
    money.addImage(bronze);
    money.x = Math.round(random(100, displayWidth-100));
    money.velocityY = 2;
    money.scale = 0.3;
    money.lifetime = 400;
 
    money.debug = false;
    bronzeGroup.add(money);
  }
}

  function spawnMoney50(){
    if(frameCount % 120 === 0){
      var money = createSprite(300, 0, 30,30);
      money.addImage(silver);
      money.x = Math.round(random(100, displayWidth-100));
      money.velocityY = 2;
      money.scale = 0.3;
      money.lifetime = 400;
   
      silverGroup.add(money);
    }
  }
    function spawnMoney100(){
      if(frameCount % 60 === 0){
        var money = createSprite(300, 0, 30,30);
        money.addImage(gold);
        money.x = Math.round(random(100, displayWidth-100));
        money.velocityY = 2;
        money.scale = 0.3;
        money.lifetime = 400;
        money.shapeColor = "green";
        goldGroup.add(money);
      }

}

function spawnVehicles(){
  if(frameCount % 100 === 0){
    var vehicles = createSprite(300, 0, 100,100);

    vehicles.x = Math.round(random(100, displayWidth-100));

    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: vehicles.addImage(q);
              break;
      case 2: vehicles.addImage(e);
              break;
      case 3: vehicles.addImage(r);
              break;
      case 4: vehicles.addImage(t);
              break;
      case 5: vehicles.addImage(y);
              break;
      default: break;
    }
    vehicles.velocityY = 2;
    vehicles.scale = 0.2;
    vehicles.lifetime = 400;
    vehicles.shapeColor = "red";
    vehicleGroup.add(vehicles);
    }
  }                                      