// Load scene inspired by Paddle Parkour
class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        /* let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, centerY, gameWidth * value, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        }); */

        this.load.path = './assets/';
        // load graphics assets
        this.load.image('bubble', 'bubble.png');
        this.load.image('oceanBg', 'OceanBackground.png');
        // this.load.image('turtle_idle', 'turtle.png');
        this.load.image('grayFish', 'fish/grayFish.png');
        this.load.image('blueFish', 'fish/blueFish.png');
        this.load.image('pinkFish', 'fish/pinkFish.png');
        this.load.image('orangeFish', 'fish/orangeFish.png');

        // load turtle texture atlas
        this.load.atlas('flippy', 'flippy/flippySheet.png', 'flippy/flippySheet.json');

        // load audio assets
        this.load.audio('bgMusic', ['audio/wondrous-waters.mp3']);
        this.load.audio('select', 'audio/sfx/mixkit-page-back-chime-1108.wav');
        this.load.audio('chime', 'audio/sfx/mixkit-happy-bell-alert-601.wav');
        this.load.audio('impact', 'audio/sfx/mixkit-impact-of-a-blow-2150.wav');
    }

    // Local Storage inspired by Paddle Parkour
    create() {
        // check for local storage browser support
        if (window.localStorage) {
            console.log('Local storage supported');
        } else {
            console.log('Local storage not supported');
        }

        // define animations
        this.anims.create({
            key: 'swim',
            frames: this.anims.generateFrameNames('flippy', {
                prefix: 'turtle',
                start: 1,
                end: 6,
                suffix: '.png'
            }),
            frameRate: 15,
            repeat: -1      // loop animation
        });

        // go to Title scene
        this.scene.start('titleScene');
    }
}