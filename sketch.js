//Create variables here
var dog, happyDog, foodS, foodStock, dogImg, dogImg1;
var database;
var feedDog, addFood;
var fedTime, lastFed;
var foodObj;
var changingGameState, readingGameState;
var bedroom, garden, washroom;


function preload()
{
    //load images here
    dogImg = loadImage("images/dogImg.png");
    dogImg1 = loadImage("images/dogImg1.png");
    bedroom = loadImage("images/Bed Room.png");
    garden = loadImage("images/Garden.png");
    washroom = loadImage("images/Wash Room.png");
    
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);

  
  var dog = createSprite(250,300,20,20);
  dog.addImage(dogImg);
  dog.scale = 0.2;


  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  textSize(20);

  var food = createSprite(150,300,10,10);

  feed=createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46,139,87);

  drawSprites();
  //add styles here
  fill(252,252,252);
  stroke("black");
  text("Food remaining: "+foodS, 170,200);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!", 130, 10, 300, 20);
  
  food.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed=data.val();
  })
  

  fill(255,255,254);
  textSize(15);
  if(lastfed>=12){
    text("Last Feed : " + lastFed%12 + "PM", 350,30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM", 350, 30);
  }else{
    text("Last Feed : " + lastFed + "AM", 350,30);
  }

  currentTime=hour();
  if(currentTime==(lastFed+1)){
    update("Playing");
    foodObj.garden();
  }else if(currentTime==(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }else if(currentTime>(lastFed+2)&& currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }else{
    update("Hungry");
    foodObj.display();
  }
  
  
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }

  database.ref("/").update({
    Food:x
  })
}


function feedDog(){
  dog.addImage(dogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}

function update(state){
  database.ref('/').update({
    gameState: state
  })
};
