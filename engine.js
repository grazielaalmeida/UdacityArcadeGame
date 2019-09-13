var Engine = (function(global) {
// create the canvas element, grab the 2D context for that canvas
// set the canvas elements
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    function main() {
        // Get our time delta information
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        // Call the update/render functions
        update(dt);
        render();

        // Set lastTime variable which is used to determine for the next time this function is called.

        lastTime = now;

        win.requestAnimationFrame(main);
    }

     // Initial setup that should only occur once,

    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    // This function is called by main and it calls all of the functions which may need to update entity's data.
    function update(dt) {
        updateEntities(dt);
        // checkCollisions();
    }

    // This is called by the update function and loops through all of the objects within your allEnemies array
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    function render() {
        var rowImages = [
                'img/water-block.png',
                'img/stone-block.png',
                'img/stone-block.png',
                'img/stone-block.png',
                'img/grass-block.png',
                'img/grass-block.png'
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        // Before drawing, clear existing canvas
        ctx.clearRect(0,0,canvas.width,canvas.height)

        // Loop through the number of rows and columns defined above and  draw the correct image for that part of the grid

        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {

                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }

    function renderEntities() {

        // Loop through all of the objects within the allEnemies array and call the render function defined.
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();
    }

    function reset() {

    }

    Resources.load([
        'img/stone-block.png',
        'img/water-block.png',
        'img/grass-block.png',
        'img/enemy-bug.png',
        'img/char-boy.png'
    ]);
    Resources.onReady(init);

    global.ctx = ctx;
})(this);
