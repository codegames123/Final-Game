class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, layer) {
      super(scene, x, y, texture, frame);
        
        //initilizes player
        this.player = scene.physics.add.sprite(x,y,texture).setScale(0.19).setSize(150, 330).setOffset(50, 5);//setSize(left-/right+,up+/down-)
        console.log("player:" + this.player);
        //scene.sys.displayList.add(this) 
        //scene.sys.updateList.add(this)
        //this.tilesLayer = layer;
        //scene.physics.add.collider(this.player, layer);

        //for use other than the contructor's
        this.xaxis = x;
        this.yaxis = y;
        this.theTexture = texture;
        this.tiles = layer;
        this.theScene = scene;
    }

    getPlayer(){
        return this.player;
    }

    create(){
        this.player.body.setMaxVelocity(200, 5000);
        //this.physics.world.gravity.y = 3000;
        this.player.body.setDamping(true);
    }

    update() {
        
        //left/right movement
        if (keyA.isDown) {
            this.player.setAccelerationX(-250);
            this.player.setFlip(true,false);
        }else if (keyD.isDown) {
            this.player.resetFlip();
            this.player.setAccelerationX(250);
        }
        else {
            this.player.setAccelerationX(0); //stop accel, initiate drag
            this.player.body.setDragX(800); //0-1; smaller = faster deceleration
        }

        //jump
        if (this.player.body.deltaY() > 0 && this.player.body.onFloor()) {
            //reset y velocity if on ground
            this.player.setAccelerationY(0);
            if(keyW.isDown || keySPACE.isDown)
                this.player.setVelocityY(-900); // will adjust according to the level design
                this.player.setAccelerationY(1200);
        }       
    }
}