class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        // reset parameters
        this.gameOver = false;

        // fade in from black
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // place bg tile sprite
        this.oceanBg = this.add.tileSprite(0, 0, gameWidth, gameHeight, 'oceanBg').setOrigin(0, 0);

        // create line on right side of screen for particles source
        let line = new Phaser.Geom.Line(gameWidth, 0, gameWidth, gameHeight);

        this.bubbleEmitter = this.add.particles(100, 300, 'bubble', {
            gravityX: -30,
            lifespan: 10000,
            speed: { min: 100, max: 150 },
            alpha: { start: 0.5, end: 0.1 },
            scale: { start: 1, end: 0 },
            emitZone: { type: 'random', source: line, quantity: 15 },
            blendMode: 'ADD',
          });

        // set up player player (physics sprite) and set properties
        this.flippy = new Flippy(this, 64, centerY, 'turtle_idle');
        this.flippy.setSize(80, 50, false); // fix bounding box
        this.flippyHit = false;

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

        let smallTextConfig = {
            fontFamily: 'Impact',
            fontSize: '48px',
            color: '#FFFFFF',
            align: 'right',
            padding: 5,
            fixedWidth: 0
        }
        // Current SCORE
        this.currentScoreUI = this.add.text(gameWidth - textSpacer, textSpacer/2 , currentScore, smallTextConfig).setOrigin(1,0).setDepth(100);

        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    // create new fish and add them to existing fish group
    spawnFish() {
        var spawnY = Phaser.Math.Between(32, gameHeight-32);
        var color = Phaser.Math.Between(0, 3 );
        const fishes = ['grayFish', 'pinkFish', 'blueFish', 'orangeFish'];
        let fish = new Fish(this, gameWidth, spawnY, fishes[color]).setOrigin(0,0);
        // console.log('spawned: ' + fishes[color]);
        this.fishGroup.add(fish);
    }

    update() {
        if (!this.gameOver) {
            // scroll background
            this.oceanBg.tilePositionX += 1;

            // Update score UI
            this.currentScoreUI.text = currentScore;

            
            // Collision check
            if (!this.flippyHit) {
                this.physics.world.collide(this.flippy, this.fishGroup, this.fishCollision, null, this);
                this.flippy.update();
                this.flippy.play('swim', true);
            }

        }

    }

    fishCollision() {
        this.flippyHit = true;
        this.sound.play('impact', { volume: 0.5 });
        this.bubbleEmitter.stop();
        this.endGame = this.time.addEvent({
            delay: 5000,
            callback: this.endGameFunc,
            callbackScope: this
        });
    }

    endGameFunc() {
        this.gameOver = true;
    }
}