// Name: Gordon Yee
// Title: Adventures of Flippy
// Approximate Time Spent on Project: 25 hrs
// Creative Tilt Justification:
//     I am really proud of my theme! I think the visual style really matches the msuic I chose.
//     I think in terms of cool techniques, I think the way I dynamically change the spawn range 
//     of the enemies to react to the player's Y position is cool. This way, the fish spawn closer
//     to the player based on where the player is. Also, I think I used a clever way of using an array of strings and the random
//     number function called "Between()" in Phaser to pick the color of the fish to spawn.

'use strict';

// define and configure main Phaser game object
let config = {
    parent: 'myGame',
    type: Phaser.AUTO,
    height: 640,
    width: 960,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Load, Title, Play, Credits ],
    fps: { forceSetTimeOut: true, target: 60 } // Necessary to limit fps on devices with a refresh rate > 60Hz
}

// define game
let game = new Phaser.Game(config);
const textSpacer = 64;
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let gameWidth = game.config.width;
let gameHeight = game.config.height;
let currentScore = 0;
let highScore = 0;
let newHighScore = false;
let cursors;
let keySPACE, keyLEFT, keyRIGHT;
let bgMusicPlaying = false;

game.settings = {
    fishSpeedCap: 15, // max speed fish can ramp up to
    fishSpeed: 5,
}