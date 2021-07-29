var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()

  ghost = createSprite(400,300)
  ghost.addImage(ghostImg)
  ghost.scale = 0.4
}

function draw() {
  background(0);

  spookySound.loop()

  if (gameState == "play") {
  if (keyDown("left")) {
    ghost.x = ghost.x - 3
  }
  if (keyDown("right")) {
    ghost.x = ghost.x + 3
  }
  if (keyDown("up")) {
    ghost.velocityY = -5
  }

  if (climbersGroup.isTouching(ghost)) {
    ghost.velocityY = 0
  }

  if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
    ghost.destroy()
    gameState = "end"
  }
  
  ghost.velocityY = ghost.velocityY + 0.8
  if(tower.y > 400){
      tower.y = 300
    }

  SpawnDoors()

  drawSprites()
  }
  if (gameState == "end") {
    fill("red")
    textSize(50)
    text("GAME OVER",150,300)
  }
  fill("white")
  text(mouseX + "," + mouseY,mouseX,mouseY)
}

function SpawnDoors() {
  if (frameCount % 240 == 0) {
    door = createSprite(Math.round(random(150,450)),-50)
    door.addImage(doorImg)
    door.velocityY = 1
    door.lifetime = 800
    doorsGroup.add(door)
    ghost.depth = door.depth 
    ghost.depth += 1

    climber = createSprite(Math.round(150,450),10)
    climber.addImage(climberImg)
    climber.velocityY = 1
    climber.x = door.x
    climber.lifetime = 800
    climbersGroup.add(climber)
    ghost.depth = climber.depth 
    ghost.depth += 1

    invisibleBlock = createSprite(climber.x,climber.y + 10,100,10) 
    invisibleBlock.velocityY = 1
    invisibleBlock.visible = false
    invisibleBlock.lifetime = 800
    invisibleBlockGroup.add(invisibleBlock)
  }
}
