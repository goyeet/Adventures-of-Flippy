class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    create() {
        // add title screen text
        let title01 = this.add.text(centerX, centerY, 'Flip\'s Undersea Adventure', 64).setOrigin(0.5).setTint(0xff0000);
        // let title02 = this.add.text(centerX, centerY, 'PADDLE PARKOUR P3', 64).setOrigin(0.5).setTint(0xff00ff).setBlendMode('SCREEN');
       
        // this.add.bitmapText(centerX, centerY + textSpacer, 'gem', 'Use the UP & DOWN ARROWS to dodge color paddles', 24).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer*2, 'Press SPACE to Start', 36).setOrigin(0.5);
        this.add.text(centerX, gameHeight - textSpacer, 'Gordon Yee 2023', 16).setOrigin(0.5);

        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();  
    }

    update() {
        // check for () input
        /* if (Phaser.Input.Keyboard.JustDown(cursors.SPACE)) {
            
            
            // start next scene
            // this.scene.start('playScene');
        } */
    }
}