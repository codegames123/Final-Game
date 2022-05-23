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
        this.player.body.setMaxVelocity(350, 1000);
        //this.physics.world.gravity.y = 3000; // i put the physics world gravity in level 1 line 21
        //this.player.body.setDamping(true); // you could turn this back if you feel comfortable using it
    }

    update() {
        //left/right movement
        if (keyA.isDown) {
            this.player.setAccelerationX(-350);
            this.player.setFlip(true,false);
        }else if (keyD.isDown) {
            this.player.resetFlip();
            this.player.setAccelerationX(350);
        }
        else {
            this.player.body.setAccelerationX(0); //stop accel, initiate drag
            this.player.body.setDragX(1000); //0-1; smaller = faster deceleration
        }
        //jump
        //if (this.player.body.deltaY() > 0 && this.player.body.onFloor()) {
        if(this.player.body.blocked.down){
            if(keyW.isDown || keySPACE.isDown)
                this.player.body.setVelocityY(-800); // will adjust according to the level design

        }   
    }

}