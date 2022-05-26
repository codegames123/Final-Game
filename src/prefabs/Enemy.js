class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
        
      // add object to existing scene
        //this.player = scene.add.existing(this)
        
        

        this.enemy = scene.physics.add.sprite(x,y,texture).setScale(0.25);
        //console.log("player:" + this.player);
        //scene.sys.displayList.add(this) 
        //scene.sys.updateList.add(this)
        //this.tilesLayer = layer;
        //scene.physics.add.collider(this.player, layer);
        this.xaxis = x;
        this.yaxis = y;
        this.theTexture = texture;
        this.theScene = scene;
    }

    getEnemy(){
        return this.enemy;
    }

    update() {
        
    }

    


}