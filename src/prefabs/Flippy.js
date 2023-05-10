class Flippy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene
        scene.physics.add.existing(this);
        this.JUMP_VELOCITY = -300;
        this.setGravityY(1000);
        this.setCollideWorldBounds(true);
        this.setImmovable();
        this.setMaxVelocity(0, 600);
        this.setDragY(100);
        this.setDepth(100);
        this.jumping = false;
    }
    
    update() {
	    if (Phaser.Input.Keyboard.DownDuration(keySPACE, 150)) {
	        this.body.velocity.y = this.JUMP_VELOCITY;
	        this.jumping = true;
	    }

	    if (this.jumping && Phaser.Input.Keyboard.UpDuration(keySPACE)) {
	    	this.jumping = false;
	    }
    }
}