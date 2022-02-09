class Game {
  constructor() { }

  //read
  getState() {
    var gameStateLocation = database.ref("gameState")
    gameStateLocation.on("value", (data) => {
      gameState = data.val();
    })
  }

  //write
  update(newValue) {
    database.ref('/').update({
      gameState: newValue
    })
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
  }

  start() {
    form = new Form();
    form.display();

    player = new Player();
    playerCount = player.getCount()


    car1 = createSprite(width / 2 - 100, height - 100);
    car1.addImage(car1Image)
    car1.scale = 0.07

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage(car2Image)
    car2.scale = 0.07

    cars = [car1, car2]
   
    fuelGroup = new Group()
    powerCoinGroup = new Group();

    //fuel sprite
    this.addSprites(fuelGroup, 2, fuelImage, 0.04);
    //power coins
    this.addSprites(powerCoinGroup, 20, powerCoinImage, 0.04);
  }

  addSprites(spriteGroup, numberOfSprites, spriteImage, scale){
    for(var i=0; i<numberOfSprites; i++){

      var x = random(width/2 - 150, width/2 +150)
      var y = random(-height* 4.5, height-400)

      var sprite = createSprite(x,y)
      sprite.addImage(spriteImage)
      sprite.scale = scale
      spriteGroup.add(sprite)
    }
  }

  play() {
    this.handleElements();
    Player.getPlayerInfo();

    if (allPlayers !== undefined) {
      image(trackImage, 0, - height * 5, width, height * 6);


      var index = 0;
      for (var plr in allPlayers) {
        index = index + 1
        var x = allPlayers[plr].positionX
        var y = height - allPlayers[plr].positionY

        cars[index - 1].position.x = x
        cars[index - 1].position.y = y

        //active player
        if (index === player.index) {
          stroke("black")
          fill("purple")
          ellipse(x, y, 60);

          this.handlePowerCoins(index);
          this.handleFuels(index);

          // camera - class 41
          camera.position.x = width/2
          camera.position.y = cars[index - 1].position.y

        }
      }

    }

    if (keyIsDown(UP_ARROW)) {
      player.positionY += 10;
      player.updateDistance()

    }

    drawSprites();
  }

  handlePowerCoins(index){
      cars[index-1].overlap(powerCoinGroup, function(x,y){
          y.remove();
       } )
  }

  handleFuels(index){
    cars[index-1].overlap(fuelGroup, function(x,y){
        y.remove();
     } )
}

}
