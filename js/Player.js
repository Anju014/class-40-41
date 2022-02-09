class Player {

  constructor() {
    this.name = null;
    this.index = null;
    this.positionX = 0
    this.positionY = 0
  }

  //read
  getCount() {
    var playerCountLocation = database.ref("playerCount")
    playerCountLocation.on("value", (data) => {
      playerCount = data.val();
    })
  }

  //write
  updateCount(newValue) {
    database.ref('/').update({
      playerCount: newValue
    })
  }

  //write
  addPlayer() {
    var playerLocation = database.ref("players/player" + this.index);
   
    if (this.index === 1) {
      this.positionX = width / 2 - 100;
    }
    else {
      this.positionX = width / 2 + 100;
    }

    playerLocation.set({
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY
    })
  }

  //read - players information

  static getPlayerInfo(){
    var playerLocation = database.ref("players");
    playerLocation.on("value", (data)=>{
       allPlayers  = data.val();
    })
  }

  //read
  getDistance() {
    var playerLocation = database.ref("players/player" + this.index);
    playerLocation.on("value", (data) => {
      var newData = data.val()
      this.positionX = newData.positionX
      this.positionY = newData.positionY
    })
  }
 
  //write
  updateDistance(){
    var playerLocation = database.ref("players/player" + this.index);
    playerLocation.update({
      positionX : this.positionX,
      positionY :this.positionY
    })
  }

}
