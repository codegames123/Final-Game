class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, layer) {
      super(scene, x, y, texture, frame);
        
        //initilizes player
        this.player = scene.physics.add.sprite(x,y,texture).setScale(0.35).setSize(100, 190).setOffset(50, 5);
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

    update() {
        //left/right movement
        if (keyA.isDown) {
            this.player.setVelocityX(-150);
        }else if (keyD.isDown) {
            this.player.setVelocityX(150);
        }else {
            this.player.setVelocityX(0);
        }

        //jump
        if (this.player.body.deltaY() > 0 && this.player.body.onFloor()) {
            if(keyW.isDown || keySPACE.isDown)
                this.player.setVelocityY(-550);
        }
    }

}