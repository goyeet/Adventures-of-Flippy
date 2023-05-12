class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    create() {
        // fade in from black
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // place bg tile sprite
        this.oceanBg = this.add.tileSprite(0, 0, gameWidth, gameHeight, 'oceanBg').setOrigin(0, 0);

        // start bg music
        this.bgMusic = this.sound.add('bgMusic', { volume: 0.65, loop: true });
        if (bgMusicPlaying === false) {
            this.bgMusic.play();
            bgMusicPlaying = true;
        }

        // add title screen text
        let titleConfig = {
            fontFamily: 'Impact',
            fontSize: '48px',
            color: '#FFFFFF',
            align: 'right',
            padding: 5,
            fixedWidth: 0
        }

        let smallTextConfig = {
            fontFamily: 'Impact',
            fontSize: '36px',
            color: '#FFFFFF',
            align: 'right',
            padding: 5,
            backgroundColor:'#041b36',
            fixedWidth: 0
        }

        let title01 = this.add.text(centerX, centerY - textSpacer, 'Adventures of Flippy', titleConfig).setOrigin(0.5);
        let title02 = this.add.text(centerX, centerY - textSpacer, 'Adventures of Flippy', titleConfig).setOrigin(0.5).setTint(0x005000).setBlendMode('SCREEN');

        // Space bar to play
        this.spaceBarUI = this.add.sprite(centerX, centerY).play('space').setScale(1.75);
        this.add.text(centerX, centerY + textSpacer, 'Play', titleConfig).setOrigin(0.5);

        // Right arrow for credits
        this.rightArrowUI = this.add.sprite(gameWidth - textSpacer * 1.5, gameHeight - textSpacer * 2).play('rightArrow').setScale(1.75);
        this.creditsText = this.add.text(gameWidth - textSpacer * 1.5, gameHeight - textSpacer, 'Credits', smallTextConfig).setOrigin(0.5);

        // HI SCORE
        this.add.text(gameWidth - textSpacer, textSpacer/2, 'BEST: ' + highScore, titleConfig).setOrigin(1,0);

        // Instructions
        smallTextConfig.fontSize = '24px';
        this.add.text(centerX, gameHeight - textSpacer, 'Dodge fish and avoid the sea floor!', smallTextConfig).setOrigin(0.5);

        // Flippy
        this.flippy = new Flippy(this, centerX, centerY + textSpacer * 2.5);
        this.flippy.setSize(80, 50, false); // fix bounding box
        this.flippy.setGravityY(0); // Initially set gravity to 0
        this.flippy.play('swim', true);     // play animation

        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        this.oceanBg.tilePositionX += 1;
        // Start game
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.sound.play('select', {volume: 0.8});
            this.bgMusic.stop();
            bgMusicPlaying = false;
            this.scene.start('playScene');    
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