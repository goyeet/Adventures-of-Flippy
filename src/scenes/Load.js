// Load scene inspired by Paddle Parkour
class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, centerY, gameWidth * value, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        this.load.path = './assets/';
        // load graphics assets
        this.load.image('bubble', 'bubble.png');
        this.load.image('oceanBg', 'OceanBackground.png');
        this.load.image('turtle_idle', 'turtle.png');
        this.load.image('turtle_flap', 'turtle_flap.png');
        this.load.image('grayFish', 'grayFish.png');
        this.load.image('blueFish', 'blueFish.png');
        this.load.image('pinkFish', 'pinkFish.png');
        this.load.image('orangeFish', 'orangeFish.png');
        
        // load audio assets
        // this.load.audio('beats', ['audio/beats.mp3']);
        
    }

    // Local Storage inspired by Paddle Parkour
    create() {
        // check for local storage browser support
        if (window.localStorage) {
            console.log('Local storage supported');
        } else {
            console.log('Local storage not supported');
        }

        // go to Title scene
        this.scene.start('titleScene');
    }
}