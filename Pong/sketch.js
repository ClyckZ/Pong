//Variaveis Da Bola ( Tamanho )
let xBola = 300;
let yBola = 200;
let diametro = 15;
let raio = diametro / 2;
//Variaveis Da Bola ( Velocidade )
let velocidadeXBola = 6;
let velocidadeYBola = 6;

//Variaveis Da Raquete ( Tamanho )
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;
let raqueteCurvatura = 50;

let colisão = false;

//Variaveis do Oponente ( Raquete )
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//Placar
let meusPontos = 0;
let PontosDoOponente = 0;

//Sons
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  
  background(0);
  
  Sprites();
  
  MovimentoBola();
  
  Colisão();
  
  MovimentoRaquete();
  
  Placar();
  
  bolinhaNaoFicaPresa()
}































function Sprites(){
  circle(xBola, yBola, diametro);
  Raquetes(xRaquete, yRaquete);
  Raquetes(xRaqueteOponente, yRaqueteOponente);
}

function Raquetes(x, y){
  rect(x, y, raqueteComprimento, raqueteAltura, raqueteCurvatura);
}

function MovimentoBola(){
  xBola += velocidadeXBola;
  yBola += velocidadeYBola;  

}

function Colisão(){
  if (xBola + raio > width || xBola - raio < 0){
    velocidadeXBola *= -1;
  }
  
  if (yBola + raio > height || yBola - raio < 0){
    velocidadeYBola *= -1;
  }
  
  colisaoRaqueteBiblioteca(xRaquete, yRaquete);
  colisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
}

function colisaoRaqueteBiblioteca(x, y){
  colisão = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBola, yBola, raio);
  if (colisão){
    velocidadeXBola *= -1 
    raquetada.play();
  }
}

function MovimentoRaquete(){
  //Minha Raquete
  if(keyIsDown(UP_ARROW) && yRaquete > 0){
    yRaquete -= 10;
  }
  
  if(keyIsDown(DOWN_ARROW) && yRaquete + raqueteAltura < 400){
    yRaquete += 10;
  }
  
  //Raquete Do Oponente
  if(keyIsDown(87)){
    yRaqueteOponente -= 10;
  }
  
  if(keyIsDown(83)){
    yRaqueteOponente += 10;

  if(yRaqueteOponente < 0){
      yRaqueteOponente = 0;
    }
  if(yRaqueteOponente + raqueteAltura > 400){
     yRaqueteOponente = 400 - raqueteAltura;
    }
  }
}

function Placar(){
    
  //HUD
  stroke(255)
  textAlign(CENTER)
  textSize(16);
  fill(color(255, 140, 0))
  rect(150, 10, 40, 20, 50);
  fill(255);
  text(meusPontos, 170,26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20, 50);
  fill(255);
  text(PontosDoOponente, 470,26);
  
  //Marcador De Pontos
  if(xBola > 590){
    meusPontos += 1;
    ponto.play();
  }
  if(xBola < 10){
    PontosDoOponente += 1;
    ponto.play();
  }
}

function bolinhaNaoFicaPresa(){
    if (XBolinha - raio < 0){
    XBolinha = 23
    }
}
