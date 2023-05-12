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
            this.bgMusic.play();
            bgMusicPlaying = true;
        }

        // add title screen text
        let creditsConfig = {
            fontFamily: 'Impact',
            fontSize: '48px',
            color: '#FFFFFF',
            align: 'center',
            padding: 5,
            fixedWidth: 0
        }

        let smallTextConfig = {
            fontFamily: 'Impact',
            fontSize: '24px',
            color: '#FFFFFF',
            align: 'center',
            padding: 5,
            lineSpacing: 5,
            fixedWidth: 0
        }

        let creditsText = this.add.text(centerX, centerY - textSpacer, 'Credits', creditsConfig).setOrigin(0.5);
        let credits = this.add.text(centerX, centerY + textSpacer, 'Programmer: Gordon Yee\nArtist: Gordon Yee\nDesigner: Gordon Yee\nSFX: https://mixkit.co/\nMusic: Wondrous Waters by Nullhertz', smallTextConfig).setOrigin(0.5);
       
        creditsConfig.fontSize = '36px';
        creditsConfig.backgroundColor = '#041b36';
        this.leftArrowUI = this.add.sprite(textSpacer * 1.5, gameHeight - textSpacer * 2).play('leftArrow').setScale(1.75);
        this.titleText = this.add.text(textSpacer * 1.5, gameHeight - textSpacer, 'Menu', creditsConfig).setOrigin(0.5);

        

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