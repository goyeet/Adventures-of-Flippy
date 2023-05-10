class Fish extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.parentScene = scene;
        this.parentScene.add.existing(this);    // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this);
        this.setImmovable();
        this.moveSpeed = 5;
        this.newFish = true;                 // custom property to control fish spawning
    }
    
    update() {
        this.x -= this.moveSpeed;

        // add new fish when existing fish hits center X
        if (this.newFish && this.x < centerX) {
            // (recursively) call parent scene method from this context
            this.parentScene.spawnFish();
            this.newFish = false;
        }

        // destroy fish if it reaches the left edge of the screen
        if(this.x < -this.width) {
            this.destroy();
        }
    }
}