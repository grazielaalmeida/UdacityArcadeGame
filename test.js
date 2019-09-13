class Enemy {
  constructor(x, y, movement) {
    this.x = x;
    this.y = y;
    this.movement = movement;
    // The image/sprite for enemies
    this.sprite = 'img/enemy-bug.png';
  }

  // Update the enemy's position
  update(dt) {
    this.x += this.movement * dt;

    // Resets position of enemy to move from left to right when player reaches destination
    if (this.x > 500) {
      this.x = -150;
      this.movement = 150 + Math.floor(Math.random() * 500);
    }

    // Check for any collisions between player and enemy
    if (player.x < this.x + 60 &&
      player.x + 37 > this.x &&
      player.y < this.y + 25 &&
      30 + player.y > this.y) {
      player.x = 200;
      player.y = 400;
    }
  };
  // Draw the enemy on the screen
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
}



// Player class requires an update(), render () and handleInput()
class Player {
  constructor(x, y, movement) {
    this.x = x;
    this.y = y;
    this.movement = movement;
    this.sprite = 'img/char-boy.png';
  }
  update() {
    // Stop the player from moving off canvas
    if (this.y > 380) {
      this.y = 380;
    }

    if (this.x > 400) {
      this.x = 400;
    }

    if (this.x < 0) {
      this.x = 0;
    }
  };

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

  // Move around the board using arrow keys
  handleInput(keyPress) {
    switch (keyPress) {
      case 'left':
        this.x -= this.movement + 50;
        break;
      case 'up':
        this.y -= this.movement + 30;
        break;
      case 'right':
        this.x += this.movement + 50;
        break;
      case 'down':
        this.y += this.movement + 30;
        break;
    }
  };
}


// Place all enemy objects in array allEnemies
// Place the player object in variable Player
let allEnemies = [];

let enemyPosition = [50, 135, 220];
let player = new Player(200, 400, 50);
let enemy;

enemyPosition.forEach(function (posY) {
  enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 499));
  allEnemies.push(enemy);
});

// Key presses and sends the keys to your Player.handleInput() method
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
