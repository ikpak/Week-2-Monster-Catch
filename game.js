/*
  Code modified from:
  http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
  using graphics purchased from vectorstock.com
*/

/* Initialization.
Here, we create and add our "canvas" to the page.
We also load all of our images. 
*/


let canvas;
let ctx;

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 350;
canvas.height = 500;
document.body.appendChild(canvas);

let bgReady, chocoboReady, cloverReady, appleReady;
let bgImage, chocoboImage, cloverImage, appleImage;

// let startTime = Date.now();
// const SECONDS_PER_ROUND = 30;
// let elapsedTime = 0;

let score = 0;

function loadImages() {
  bgImage = new Image();
  bgImage.onload = function () {
    // show the background image
    bgReady = true;
  };
  bgImage.src = "images/bg-new.jpg";
  
  // chocobo image 52px x 103px
  chocoboImage = new Image();
  chocoboImage.onload = function () {
    // show the hero image
    chocoboReady = true;
  };
  chocoboImage.src = "images/front-chocobo-icon.png";

  cloverImage = new Image();
  cloverImage.onload = function () {
    // show the monster image
    cloverReady = true;
  };
  cloverImage.src = "images/clover-icon.png";

  // apple image 30px x 30px
  appleImage = new Image();
  appleImage.onload = function () {
    //show apple image
    appleReady = true;
  }
  appleImage.src = "images/apple-icon.png"

  // clover image 27px x 30px
  cloverImage = new Image();
  cloverImage.onload = function () {
    //show clover image
    cloverReady = true;
  }
  cloverImage.src = "images/clover-icon.png"

  // bomb image 27px x 30px
  bombImage = new Image();
  bombImage.onload = function () {
    //show bomb image
    bombReady = true;
  }
  bombImage.src = "images/bomb-icon.png"
}

/** 
 * Setting up our characters.
 * 
 * Note that heroX represents the X position of our hero.
 * heroY represents the Y position.
 * We'll need these values to know where to "draw" the hero.
 * 
 * The same applies to the monster.
 */

let chocoboX = (canvas.width-52) / 2;
let chocoboY = canvas.height - 115;

let cloverX = Math.floor(Math.random()*(canvas.width-27));
let cloverY = -150;

let appleX = Math.floor(Math.random()*(canvas.width-30));
let appleY = -50;


/** 
 * Keyboard Listeners
 * You can safely ignore this part, for now. 
 * 
 * This is just to let JavaScript know when the user has pressed a key.
*/
let keysDown = {};
function setupKeyboardListeners() {
  // Check for keys pressed where key represents the keycode captured
  // For now, do not worry too much about what's happening here. 
  addEventListener("keydown", function (key) {
    keysDown[key.keyCode] = true;
  }, false);

  addEventListener("keyup", function (key) {
    delete keysDown[key.keyCode];
  }, false);
}


/**
 *  Update game objects - change player position based on key pressed
 *  and check to see if the monster has been caught!
 *  
 *  If you change the value of 5, the player will move at a different rate.
 */
let update = function () {
  // Update the time.
  // elapsedTime = Math.floor((Date.now() - startTime) / 1000);

  // if (38 in keysDown) { // Player is holding up key
  //   chocoboY -= 5;
  // }
  // if (40 in keysDown) { // Player is holding down key
  //   chocoboY += 5;
  // }
  if (37 in keysDown) { // Player is holding left key
    chocoboX -= 5;
  }
  if (39 in keysDown) { // Player is holding right key
    chocoboX += 5;
  }

  cloverY += 2.5;

  appleY += 2.5;

  if(appleY == canvas.height) {
    appleX = Math.floor(Math.random()*(canvas.width-30));
    appleY = -50;
    
  }
  else if(cloverY == canvas.height) {
    cloverX = Math.floor(Math.random()*(canvas.width-38));
    cloverY = -150;
  }

// Make sure the character doesn't go beyond canvas parameters
  if(chocoboX < 0) {
    chocoboX = 0
  } 
  else if(chocoboX > canvas.width-52) {
    chocoboX = canvas.width - 52
  }

  // if(chocoboY < 0) {
  //   chocoboY = 0
  // }
  // else if(chocoboY > canvas.height-32) {
  //   chocoboY = canvas.height - 32
  // }

  // Check if player and monster collided. Our images
  // are about 32 pixels big.
  if (
    chocoboX <= (cloverX + 27)
    && cloverX <= (chocoboX + 52)
    && chocoboY <= (cloverY + 30)
    && cloverY <= (chocoboY + 103)
  ) {
    // Pick a new location for the monster.
    // Note: Change this to place the monster at a new, random location.
    // monsterX = Math.floor(Math.random()*(canvas.width-32));
    // monsterY = Math.floor(Math.random()*(canvas.height-32));
    cloverX = Math.floor(Math.random()*(canvas.width-38));
    cloverY = -150;
    // cloverReady = false;
    score = score + 10
  }
  else if (
    chocoboX <= (appleX + 30)
    && appleX <= (chocoboX + 52)
    && chocoboY <= (appleY + 30)
    && appleY <= (chocoboY + 103)
  ) {
    appleX = Math.floor(Math.random()*(canvas.width-30));
    appleY = -50;
    // appleReady = false;
    score = score + 5
  }
};

/**
 * This function, render, runs as often as possible.
 */
var render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (chocoboReady) {
    ctx.drawImage(chocoboImage, chocoboX, chocoboY);
  }
  if (cloverReady) {
    ctx.drawImage(cloverImage, cloverX, cloverY);
  }
  if (appleReady) {
    ctx.drawImage(appleImage, appleX, appleY)
  }
  // ctx.fillText(`Seconds Remaining: ${SECONDS_PER_ROUND - elapsedTime}`, 20, 100);

  ctx.fillText(`Score: ${score}`, 20, 150);

  ctx.fillText(`Time remaining: ${count}`, 20, 100);
};

/**
 * The main game loop. Most every game will have two distinct parts:
 * update (updates the state of the game, in this case our hero and monster)
 * render (based on the state of our game, draw the right things)
 */

let count = 30
let finished = false;
let counter = function() {
  count--
  if(count <= 0) {
    clearInterval(counter);
    //set game to finished
    finished = true;
    count = 0;
    // hide monster and hero
    cloverReady = false;
    appleReady = false;
    chocoboReady = false
  }
};

setInterval(counter, 1000);

var main = function () {
  update(); 
  render();
  // Request to do this again ASAP. This is a special method
  // for web browsers. 
  requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame.
// Safely ignore this line. It's mostly here for people with old web browsers.
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
loadImages();
setupKeyboardListeners();
main();