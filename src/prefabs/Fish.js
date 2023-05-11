class Fish extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.parentScene = scene;
        this.parentScene.add.existing(this);    // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this);
        this.setImmovable();
        this.moveSpeed = game.settings.fishSpeed;
        this.newFish = true;                    // custom property to control fish spawning
        this.incrementScore = true;            // ensure score is updated only once per fish
    }
    
    update() {
        this.x -= this.moveSpeed;

        // add new fish when existing fish hits center X
        if (this.parentScene.flippyHit == false && this.newFish && this.x < centerX) {
            // (recursively) call parent scene method from this context
            this.parentScene.spawnFish();
            this.newFish = false;
        }

        // destroy fish if it reaches the left edge of the screen
        if (this.x < -this.width) {
            // console.log('destroyed');
            this.destroy();
        }

        // Flippy dodges fish successfuly
        if (this.parentScene.flippyHit == false && this.x < this.parentScene.flippy.x && this.incrementScore) {
            currentScore += 1;
            if ((currentScore % 5 == 0) && (game.settings.fishSpeed < game.settings.fishSpeedCap)) {
                game.settings.fishSpeed += 1;
                console.log('Speed Increase');
            }
            // play success sfx
            this.parentScene.sound.play('chime', {volume: 0.4});
            this.incrementScore = false;
        }
    }
}