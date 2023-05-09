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
            gravityX: -20,
            lifespan: 10000,
            speed: { min: 50, max: 100 },
            alpha: { start: 0.5, end: 0.1 },
            scale: { start: 1, end: 0 },
            emitZone: { type: 'random', source: line, quantity: 15 },
            blendMode: 'ADD',
          });

        // this.physics.world.gravity.y = 1000;

        // set up player player (physics sprite) and set properties
        this.player = this.physics.add.sprite(32, centerY, 'turtle_idle').setOrigin(0,0);
        this.player.setCollideWorldBounds(true);
        this.player.setImmovable();
        this.player.setMaxVelocity(0, 600);
        this.player.setDragY(200);
        this.player.setDepth(100);

        // set up difficulty timer (triggers callback every second)
        this.difficultyTimer = this.time.addEvent({
            delay: 1000,
            callback: this.levelBump,
            callbackScope: this,
            loop: true
        });

        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (!this.gameOver) {
            this.oceanBg.tilePositionX += 1;
        }
        

    }
}