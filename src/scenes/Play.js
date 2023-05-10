class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        // reset parameters
        this.gameOver = false;

        // set up audio, play bgm
        /* this.bgm = this.sound.add('bgMusic', { 
            mute: false,
            volume: 1,
            rate: 1,
            loop: true 
        });
        this.bgm.play(); */

        // place bg tile sprite
        this.oceanBg = this.add.tileSprite(0, 0, gameWidth, gameHeight, 'oceanBg').setOrigin(0, 0);

        // create line on right side of screen for particles source
        let line = new Phaser.Geom.Line(gameWidth, 0, gameWidth, gameHeight);

        const emitter = this.add.particles(100, 300, 'bubble', {
            gravityX: -30,
            lifespan: 10000,
            speed: { min: 100, max: 150 },
            alpha: { start: 0.5, end: 0.1 },
            scale: { start: 1, end: 0 },
            emitZone: { type: 'random', source: line, quantity: 15 },
            blendMode: 'ADD',
          });

        // set up player player (physics sprite) and set properties
        this.player = new Flippy(this, 64, centerY, 'turtle_idle');

        // set up barrier group
        this.fishGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });

        // wait a few seconds before spawning fish
        this.time.delayedCall(2000, () => { 
            this.spawnFish(); 
        });
        
        // set up difficulty timer (triggers callback every second)
        /* this.difficultyTimer = this.time.addEvent({
            delay: 1000,
            callback: this.levelBump,
            callbackScope: this,
            loop: true
        }); */

        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    // create new fish and add them to existing fish group
    spawnFish() {
        var spawnY = Phaser.Math.Between(32, gameHeight-32);
        var color = Phaser.Math.Between(0, 4);
        const fishes = ['grayFish', 'pinkFish', 'blueFish', 'orangeFish'];
        let fish = new Fish(this, gameWidth + 32, spawnY, fishes[color]);
        this.fishGroup.add(fish);
    }

    update() {
        if (!this.gameOver) {
            this.oceanBg.tilePositionX += 1;
            this.player.update();
        }

    }
}