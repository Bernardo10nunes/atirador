var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie,zombieImg;
var zombieGroup;
var coracao1,coracao1Img,coracao2,coracao2Img,coracao3,coracao3Img;
var bullet,bulletImg,bulletGroup;
var bullets=20;
var pontos=0;
var gameState="play";
var vidas=3;
var municao,municaoImg,municaoGroup;
function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
  zombieImg = loadImage("assets/zombie.png")
  coracao1Img = loadImage("assets/heart_1.png")
  coracao2Img = loadImage("assets/heart_2.png")
  coracao3Img = loadImage("assets/heart_3.png")
  bulletImg = loadImage("assets/bullet.png")
  municaoImg = loadImage("assets/bullets.png")
}

function setup() {
zombieGroup=new Group()
bulletGroup=new Group()
municaoGroup=new Group()

  createCanvas(windowWidth,windowHeight);
 
  //adicionando a imagem de fundo
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1

coracao1 = createSprite(displayWidth-150,50,20,20)
coracao1.addImage(coracao1Img)
coracao1.scale = 0.2
coracao1.visible = false

coracao2 = createSprite(displayWidth-100,50,20,20)
coracao2.addImage(coracao2Img)
coracao2.scale = 0.2
coracao2.visible = false

coracao3 = createSprite(displayWidth-150,50,20,20)
coracao3.addImage(coracao3Img)
coracao3.scale = 0.2
coracao3.visible = true

//criando o sprite do jogador
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = false
   player.setCollider("rectangle",0,0,225,300)


}

function draw() {
  background(0);
  drawSprites(); 

if(gameState==="play"){

gerarBalas()
  //movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usando toques
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//solte balas e mude a imagem do atirador para a posição de tiro quando a tecla de espaço for pressionada
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
 
}

//o jogador volta à imagem original quando pararmos de pressionar a barra de espaço
else if(keyWentUp("space")&& bullets>0){
  player.addImage(shooterImg)
  createBullet()
}
if(zombieGroup.isTouching(player)){
  for(var c=0;c<zombieGroup.length;c++){
    if(zombieGroup[c].isTouching(player)){
      zombieGroup[c].destroy()
      vidas-=1
    }
  }
}

if(zombieGroup.isTouching(bulletGroup)){
  for(var c=0;c<zombieGroup.length;c++){
    if(zombieGroup[c].isTouching(bulletGroup)){
      zombieGroup[c].destroy()
      bulletGroup.destroyEach()
      pontos+=1 
    }
  }
}
if(municaoGroup.isTouching(player)){
  for(var c=0;c<municaoGroup.length;c++){
    if(municaoGroup[c].isTouching(player)){
      municaoGroup[c].destroy()
      bullets=bullets+10
      if(bullets>20){
        bullets=20
      }
    }
  }
}

inimigos()
if(vidas==0){
  gameState="end"
  coracao1.visible = false
  coracao2.visible = false
  coracao3.visible = false
}
if(vidas==2){
  coracao2.visible = true
  coracao1.visible = false
  coracao3.visible = false 
}
if(vidas==1){
  coracao2.visible = false 
  coracao1.visible = true
  coracao3.visible = false
}
}
if(gameState=="end"){
fill("white")
textSize(40)
text("fim de jogo",displayWidth/2-100,displayHeight/2)
zombieGroup.destroyEach()
}

fill("white")
textSize(20)
text("balas: "+bullets,displayWidth-200,100)
text("pontos: "+pontos,displayWidth-200,130)

}
function inimigos(){
  if(frameCount%50==0){
   zombie=createSprite(random(600,1100),random(100,600),10,10);
   zombie.addImage(zombieImg);
   zombie.scale=0.15;
   zombie.velocityX=-4;
   zombie.lifetime=400;
   zombieGroup.add(zombie);
   zombie.debug=false;
   zombie.setCollider("rectangle",0,0,225,500);
  }
}
function createBullet() {
bullet=createSprite(player.x,player.y-25,20,20);
bullet.addImage(bulletImg);
bullet.velocityX=20;
bullet.scale=0.09;
bullet.lifetime=200;
bulletGroup.add(bullet);
bullets=bullets-1;
}
function gerarBalas(){
  if(frameCount%500==0){
   municao=createSprite(displayWidth+100,random(100,600));
   municao.addImage(municaoImg);
   municao.velocityX=-4;
   municao.scale=0.05;
   municaoGroup.add(municao);
   municao.lifetime=600;
  }
}