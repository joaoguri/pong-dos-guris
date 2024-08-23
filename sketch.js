let jogador1, jogador2, bola;
let velX, velY;
let pontosJogador1 = 0;
let pontosJogador2 = 0;

function setup() {
  createCanvas(600, 400);
  jogador1 = new Paddle(20, height / 2 - 40);
  jogador2 = new Paddle(width - 40, height / 2 - 40);
  bola = new Ball(width / 2, height / 2);
  velX = random(3, 5);
  velY = random(-5, 5);
}

function draw() {
  background(0);
  
  // Desenha o campo
  stroke(255);
  line(width / 2, 0, width / 2, height);
  
  // Atualiza e desenha os objetos
  jogador1.update();
  jogador2.update();
  bola.update();
  
  // Desenha os objetos
  jogador1.display();
  jogador2.display();
  bola.display();
  
  // Colisões com as paredes
  if (bola.y < 0 || bola.y > height) {
    velY *= -1;
  }
  
  // Colisões com os jogadores
  if (bola.x <= jogador1.x + jogador1.largura && bola.y >= jogador1.y && bola.y <= jogador1.y + jogador1.altura) {
    velX *= -1;
  }
  
  if (bola.x >= jogador2.x - jogador2.largura && bola.y >= jogador2.y && bola.y <= jogador2.y + jogador2.altura) {
    velX *= -1;
  }
  
  // Verifica se a bola saiu pela esquerda
  if (bola.x < 0) {
    pontosJogador2++;
    resetBola();
  }
  
  // Verifica se a bola saiu pela direita
  if (bola.x > width) {
    pontosJogador1++;
    resetBola();
  }
  
  // Exibe os pontos
  fill(255);
  textSize(32);
  text(pontosJogador1, width / 4, 50);
  text(pontosJogador2, 3 * width / 4, 50);
}

function resetBola() {
  bola.x = width / 2;
  bola.y = height / 2;
  velX = random(3, 5);
  velY = random(-5, 5);
}

class Paddle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.largura = 20;
    this.altura = 80;
    this.velocidade = 5;
  }
  
  update() {
    if (keyIsDown(UP_ARROW) && this.y > 0) {
      this.y -= this.velocidade;
    }
    if (keyIsDown(DOWN_ARROW) && this.y < height - this.altura) {
      this.y += this.velocidade;
    }
  }
  
  display() {
    fill(255);
    rect(this.x, this.y, this.largura, this.altura);
  }
}

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.diametro = 20;
  }
  
  update() {
    this.x += velX;
    this.y += velY;
  }
  
  display() {
    fill(255);
    ellipse(this.x, this.y, this.diametro, this.diametro);
  }
}
