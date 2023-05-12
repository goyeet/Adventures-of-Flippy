class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        // reset parameters
        this.gameOver = false;
        this.gameStarted = false;

        // fade in from black
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // start bg music
        this.bgMusic = this.sound.add('bgMusic', { volume: 0.65, loop: true });
        if (bgMusicPlaying === false) {
            this.bgMusic.play();
            bgMusicPlaying = true;
        }

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

        // space bar hint
        this.spaceBarPrompt = this.add.sprite(textSpacer, centerY + textSpacer).play('space');

        // set up flippy
        this.flippy = new Flippy(this, 64, centerY);
        this.flippy.setSize(80, 50, false); // fix bounding box
        this.flippy.setGravityY(0); // Initially set gravity to 0
        this.flippyHit = false;
        this.flippy.play('swim', true);     // play animation

        // set up fish group
        this.fishGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });

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

        // add title screen text
        let gameOverConfig = {
            fontFamily: 'Impact',
            fontSize: '72px',
            color: '#FFFFFF',
            align: 'center',
            padding: 5,
            fixedWidth: 0
        }

        // Game Over text
        this.gameOverText = this.add.text(centerX, centerY - textSpacer * 1.5, 'Game Over', gameOverConfig).setOrigin(0.5);
        this.gameOverText.visible = false;
        gameOverConfig.fontSize = '32px';

        // Left Arrow for title screen
        this.leftArrowUI = this.add.sprite(centerX - textSpacer * 3, centerY).play('leftArrow').setScale(1.75);
        this.leftArrowUI.visible = false;
        this.titleText = this.add.text(centerX - textSpacer * 3, centerY + textSpacer, 'Menu', gameOverConfig).setOrigin(0.5);
        this.titleText.visible = false;

        // Space Bar to replay
        this.spaceBarUI = this.add.sprite(centerX, centerY).play('space').setScale(1.75);
        this.spaceBarUI.visible = false;
        this.playAgainText = this.add.text(centerX, centerY + textSpacer, 'Play Again', gameOverConfig).setOrigin(0.5);
        this.playAgainText.visible = false;

        // Right arrow for credits
        this.rightArrowUI = this.add.sprite(centerX + textSpacer * 3, centerY).play('rightArrow').setScale(1.75);
        this.rightArrowUI.visible = false;
        this.creditsText = this.add.text(centerX + textSpacer * 3, centerY + textSpacer, 'Credits', gameOverConfig).setOrigin(0.5);
        this.creditsText.visible = false;

        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    // create new fish and add them to existing fish group
    spawnFish() {
        var minY = Phaser.Math.MinSub(this.flippy.y, 126, 0);
        var maxY = Phaser.Math.MaxAdd(this.flippy.y, 126, gameHeight - 21);
        var spawnY = Phaser.Math.Between(minY, maxY);
        var color = Phaser.Math.Between(0, 3);
        const fishes = ['grayFish', 'pinkFish', 'blueFish', 'orangeFish'];
        let fish = new Fish(this, gameWidth, spawnY, fishes[color]);
        this.fishGroup.add(fish);
    }

    update() {
        if (!this.gameStarted && Phaser.Input.Keyboard.JustDown(keySPACE)) {
            // start using gravity on flippy
            this.flippy.setGravityY(1000);
            // remove space bar UI
            this.spaceBarPrompt.visible = false;
            this.spaceBarPrompt.anims.pause();
            // wait a few seconds before spawning fish
            this.time.delayedCall(2000, () => { 
                this.spawnFish();
            });
            this.gameStarted = true;
        }

        if (!this.gameOver) {
            // scroll background
            this.oceanBg.tilePositionX += 1;

            // Update score UI
            this.currentScoreUI.text = currentScore;

            // Collision check
            if (!this.flippyHit) {
                this.physics.world.collide(this.flippy, this.fishGroup, this.collision, null, this);
                if (this.flippy.body.blocked.down === true) {
                    this.collision();
                }
                this.flippy.update();
            }
        }

        if (this.gameOver) {
            // Restart play scene
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                this.sound.play('select', {volume: 0.8});
                bgMusicPlaying = false;
                this.bgMusic.stop();
                this.scene.restart();
            }

            // Go to title scene
            if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
                this.sound.play('select', {volume: 0.8});
                bgMusicPlaying = false;
                this.bgMusic.stop();
                this.scene.start('titleScene');
            }

            // Go to credits scene
            if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
                this.sound.play('select', {volume: 0.8});
                bgMusicPlaying = false;
                this.bgMusic.stop();
                this.scene.start('creditsScene');
            }
        }

    }

    collision() {
        this.flippyHit = true;
        // shake camera on impact
        this.cameras.main.shake(40);
        // play impact sfx
        this.sound.play('impact', { volume: 0.5 });
        // Stop spawning bubbles
        this.bubbleEmitter.stop();
        // Stop Flippy animations
        this.flippy.anims.pause();
        this.flippy.setGravityY(500);
        // Show game over UI in 2.5 seconds
        this.endGame = this.time.addEvent({
            delay: 2500,
            callback: this.endGameFunc,
            callbackScope: this
        });
    }

    endGameFunc() {
        this.gameOver = true;

        // show game over prompt
        this.gameOverText.visible = true;
        this.leftArrowUI.visible = true;
        this.titleText.visible = true;
        this.spaceBarUI.visible = true;
        this.playAgainText.visible = true;
        this.rightArrowUI.visible = true;
        this.creditsText.visible = true;

        // check for new high score
        if (currentScore > highScore) {
            highScore = currentScore;
        }

        // reset score for next round
        currentScore = 0;
    }
}