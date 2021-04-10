var balloon,balloonAnimation;
var Background,backgroundImage;
var database;

function preload() {
balloonAnimation=loadAnimation("Hot Air Ballon-01.png","Hot Air Ballon-02.png","Hot Air Ballon-03.png")
backgroundImage=loadImage("Background.png")
}

function setup() {
createCanvas(1200,800);
database=firebase.database()
position=database.ref('Balloon/position')
position.on("value",readPosition)

Background=createSprite(width/2,height/2,width,height)
Background.addImage(backgroundImage)
Background.scale=0.5

balloon=createSprite(250,650,50,50);
balloon.addAnimation("animation",balloonAnimation)
balloon.scale=0.5
}

function draw() {
background("red"); 

if(keyDown(LEFT_ARROW)){
writePosition(-10,0)
balloon.x=balloon.x-10
}
else if(keyDown(RIGHT_ARROW)){
writePosition(+10,0)
balloon.x=balloon.x+10
}
else if(keyDown(UP_ARROW)){
writePosition(0,-10)
balloon.y=balloon.y-10
balloon.scale=balloon.scale+0.005;
}
else if(keyDown(DOWN_ARROW)){
writePosition(0,+10)
balloon.y=balloon.y+10
balloon.scale=balloon.scale-0.005;
}

drawSprites();
fill("black") 
textSize(30)
text("Use arrows to move the air balloon.",width-1190,height-770)
}

function writePosition(x,y) {
database.ref('Balloon/position').set({
'x':balloon.x+x,
'y':balloon.y+y
})
}

function readPosition(data) {
Balloon=data.val()
Balloon.x=position.x
Balloon.y=position.y
}