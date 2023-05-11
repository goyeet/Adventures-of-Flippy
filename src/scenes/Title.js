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
        let title01 = this.add.text(centerX, centerY - textSpacer, 'Flippy\'s Undersea Adventure', titleConfig).setOrigin(0.5);
        let title02 = this.add.text(centerX, centerY - textSpacer, 'Flippy\'s Undersea Adventure', titleConfig).setOrigin(0.5).setTint(0x005000).setBlendMode('SCREEN');
       
        titleConfig.fontSize = '36px';
        this.add.text(centerX, centerY + textSpacer, 'Press [SPACE] to Start', titleConfig).setOrigin(0.5);

        let smallTextConfig = {
            fontFamily: 'Impact',
            fontSize: '24px',
            color: '#FFFFFF',
            align: 'right',
            padding: 5,
            fixedWidth: 0
        }
        this.add.text(centerX, gameHeight - textSpacer, 'Gordon Yee 2023', smallTextConfig).setOrigin(0.5);

        // HI SCORE
        this.add.text(gameWidth - textSpacer, textSpacer/2, 'HI SCORE: ' + highScore, smallTextConfig).setOrigin(1,0);

        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);  
    }

    update() {
        this.oceanBg.tilePositionX += 1;
        // check for SPACE bar input
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.sound.play('select', {volume: 0.8});
            this.bgMusic.stop();
            bgMusicPlaying = false;
            this.scene.start('playScene');    
        }
    }
}