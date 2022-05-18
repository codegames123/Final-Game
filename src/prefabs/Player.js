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

    setup(){
        this.player.body.setMaxVelocity(300);
        this.physics.world.setGravityY(1000);
    }

    update() {
        this.player.body.setDamping(true);
        this.player.body.setDrag(0.3); //0-1; smaller = faster deceleration
        //left/right movement
        if (keyA.isDown) {
            this.player.setAccelerationX(-150);
        }else if (keyD.isDown) {
            this.player.setAccelerationX(150);
        }
        else {
            this.player.setAccelerationX(0); //stop accel, initiate drag
        }

        //jump
        if (this.player.body.deltaY() > 0 && this.player.body.onFloor()) {
            if(keyW.isDown || keySPACE.isDown)
                this.player.setAccelerationY(-550);
        }
    }

}