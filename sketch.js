var invisibleGround,monkey
var gameState = "play"
var  obstaclesGroup;
var restart;
var bananasGroup;
var score = 0;
function preload(){
    monkey_running = loadAnimation("1.png","2.png","3.png","4.png","5.png");
    monkey_collided = loadAnimation("3.png")
}

function setup() {
    createCanvas(400,400);

    restart = createSprite(200,220,10,10);
    restart.visible = false
    restart.shapeColor ="red";
    monkey = createSprite(50,350,40,40);
    monkey.addAnimation("runnig",monkey_running);
    monkey.addAnimation("collided",monkey_collided);
    monkey.scale = 0.4;

    //create invisible ground
    invisibleGround = createSprite(200,height-10,400,10);
    invisibleGround.visible = false;

    monkey.setCollider("circle",0,0,50);
    monkey.debug = false;

    obstaclesGroup = createGroup();
    bananasGroup = createGroup();
  
}
function bananaHit(monkey,banana){
    score = score+10;
    monkey.velocityX = 0;
    banana.destroy()
}
function draw() {
    background("lightgreen");
    textSize(20);
    fill("White");
    text(score ,350,100)

    if(gameState == "play"){
        
    if (keyDown("space") && monkey.y>=300){
            monkey.velocityY = -12;
    } 
    spawnBanana();
    monkey.collide(bananasGroup,bananaHit)
    spawnObstactles();
    if (monkey.isTouching(obstaclesGroup)){
        gameState = "end";
    }
   
    }else if (gameState == "end"){
        monkey.changeAnimation("collided",monkey_collided);
        obstaclesGroup.setVelocityXEach(0);
        textSize(20);
        fill("White");
        text("Game Over",150,200);
        restart.visible = true;

        if(mousePressedOver(restart)){
            reset();
        }
    }

    //make monkey jump when space is pressed
    
    //make gravity
    monkey.velocityY = monkey.velocityY + 0.8;

    //make the monkey collide with ground
     monkey.collide(invisibleGround);

   
    //spawnObstactles
     drawSprites();

}
function reset(){
    gameState = "play";
    obstaclesGroup.destroyEach();
    restart.visible = false;
    monkey.changeAnimation("runnig",monkey_running);
}
function spawnBanana(){
    if (frameCount % 60 === 0) {
        var banana = createSprite(399,random(200,300),10,15);
        banana.velocityX = random(-7,-3);
        banana.shapeColor = "yellow";
        bananasGroup.add(banana);
    }
}

function spawnObstactles(){
    if (frameCount % 60 === 0) {
        var obstacle = createSprite(399,height-30,10,40);
        obstacle.velocityX = -6;
        obstaclesGroup.add(obstacle);
    }
}

