// Name: Gordon Yee
// Title: Flip's Undersea Adventure
// Approximate Time Spent on Project: 1 hr
// Creative Tilt Justification:

// Texture Atlas Tutorial
// bit.ly/42gY7CU

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
            //debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Load, Title, /* Play, GameOver */ ]
}

// define game
let game = new Phaser.Game(config);
const textSpacer = 64;
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let gameWidth = game.config.width;
let gameHeight = game.config.height;
let level;
let highScore;
let newHighScore = false;
let cursors;