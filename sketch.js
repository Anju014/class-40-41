var backgroundImage;
var database;

var game, form, player;

var gameState, playerCount;
var car1Image, car2Image;
var car1, car2;
var cars = [];
var allPlayers;
var trackImage;

var fuelGroup, powerCoinGroup;
var powerCoinImage, fuelImage;

function preload() {
  backgroundImage = loadImage("assets/background.png");
  car1Image = loadImage("assets/car1.png");
  car2Image = loadImage("assets/car2.png");
  trackImage = loadImage("assets/track.jpg");

  fuelImage = loadImage("assets/car1.png");
  powerCoinImage = loadImage("assets/car2.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  database = firebase.database();

  game = new Game();
  game.getState();
  game.start();

}

function draw() {
  background(backgroundImage);

  if (playerCount === 2) {
    game.update(1); // start = 0, play = 1, end =2
  }

  if (gameState === 1) {
    game.play();
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
