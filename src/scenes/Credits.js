class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene');
    }

    create() {
        // fade in from black
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        // place bg tile sprite
        this.oceanBg = this.add.tileSprite(0, 0, gameWidth, gameHeight, 'oceanBg').setOrigin(0, 0);

        // start bg music
        this.bgMusic = this.sound.add('bgMusic', { volume: 0.65, loop: true });
        if (bgMusicPlaying === false) {
            console.log('starting bgmusic from credits');
            this.bgMusic.play();
            bgMusicPlaying = true;
        }

        // add title screen text
        let creditsConfig = {
            fontFamily: 'Impact',
            fontSize: '48px',
            color: '#FFFFFF',
            align: 'right',
            padding: 5,
            fixedWidth: 0
        }
        let creditsText = this.add.text(centerX, centerY - textSpacer, 'Credits', creditsConfig).setOrigin(0.5);
        // let title02 = this.add.text(centerX, centerY - textSpacer, 'Flippy\'s Undersea Adventure', titleConfig).setOrigin(0.5).setTint(0x005000).setBlendMode('SCREEN');
       
        creditsConfig.fontSize = '36px';
        this.leftArrowUI = this.add.sprite(textSpacer * 1.5, gameHeight - textSpacer * 2).play('leftArrow').setScale(1.75);
        this.titleText = this.add.text(textSpacer * 1.5, gameHeight - textSpacer, 'Menu', creditsConfig).setOrigin(0.5);

        let smallTextConfig = {
            fontFamily: 'Impact',
            fontSize: '24px',
            color: '#FFFFFF',
            align: 'right',
            padding: 5,
            fixedWidth: 0
        }

        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    }

    update() {
        this.oceanBg.tilePositionX += 1;
        // check for SPACE bar input
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.play('select', {volume: 0.8});
            this.bgMusic.stop();
            bgMusicPlaying = false;
            this.scene.start('titleScene');    
        }
    }
}