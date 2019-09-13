let gameScore = 0,
	lives = 3,
	livesLeft = document.querySelector('.lives > span'),
	score = document.querySelector('.score > span');

class Enemy {
	constructor(x, y, movement) {

		this.x = x;
		this.y = y;
		this.movement = movement;
		this.sprite = 'img/enemy-bug.png';
	}

// Update the enemy's position
	update(dt) {
// Any movement should be improved by the dt parameter
		this.x += this.movement * dt;
		livesLeft.innerText = lives;
// Restarts enemy's movement when the player reaches the water
		if (this.x > 505) {
			this.x = -150;
// Controls enemy's movement speed
			this.movement = 150 + Math.floor(Math.random() * 800);

		}
// Restarts after checking collisons
		if (player.x < this.x + 60 &&
			player.x + 37 > this.x &&
			player.y < this.y + 25 &&
			30 + player.y > this.y) {
			player.x = 200;
			player.y = 400;
			lives--;
			livesLeft.innerText = lives;
			if (lives === 0) {
				confirm('Game Over!');
				lives = 3;
				gameScore = 0;
				livesLeft.innerText = lives;
				score.innerText = '';
			}
		}
	};
  // Draw the enemy on screen
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
}

class Player {
	constructor(x, y, movement) {
		this.x = x;
		this.y = y;
		this.movement = movement;
		this.sprite = 'img/char-boy.png';
	}
	update() {
		// Stops Player from moving off the sides of canvas
		if (this.y > 380) {
			this.y = 380;
		}
		if (this.x > 400) {
			this.x = 400;
		}
		if (this.x < 0) {
			this.x = 0;
		}
		// 100 points added as the player reaches the water
		if (this.y < 0) {
			this.x = 200;
			this.y = 380;
			gameScore++;
			score.innerText = gameScore * 100;
			if (gameScore === 10 && lives > 0) {
				confirm('Parabéns!');
				lives = 3;
				gameScore = 0;
				livesLeft.innerText = lives;
				score.innerText = '';
			}
		}
	}
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
	// Keyboard arrow keys
	handleInput(arrowKeyPressed) {
		switch (arrowKeyPressed) {
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
	}
}

let allEnemies = [];
let enemyPosition = [50, 135, 220];
let player = new Player(200, 400, 50);

// Creates arrays for enemy objects
enemyPosition.forEach((enemyPositionCoordinate) => {
	let enemy = new Enemy(0, enemyPositionCoordinate, 100 + Math.floor(Math.random() * 500));
	allEnemies.push(enemy);
});

document.addEventListener('keyup', function (e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});
