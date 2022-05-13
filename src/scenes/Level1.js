//var map;
//var layer;
//var cursors;
class Level1 extends Phaser.Scene {
    constructor() {
        super("Level1Scene");

    }
    preload() {

        this.load.image('ground_1x1', './assets/ground_1x1.png'); // temporary
        this.load.image('sprite', './assets/player1.png'); // temporary
        this.load.image('background', './assets/menu_background.jpg'); //temporary
        this.load.image('apple', './assets/apple_core_4.png'); //temporary
        this.load.tilemapTiledJSON('map', './assets/collision_test.json'); // temporary 
        this.load.audio('lvl1_01', './assets/TechnoLVL1_01.wav');
    }
    create() {
        //this.background = this.add.tileSprite(game.config.width/2, game.config.height/2, game.config.width, game.config.height + 321, 'background');
        var map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('ground_1x1');
        const layer = map.createLayer('Tile Layer 1', tileset);

        map.setCollisionBetween(1, 12);
        layer.setCollisionByProperty({ collides: true });

        const debugGraphics = this.add.graphics().setAlpha(0.45); // collision debugger for tilemap
        layer.renderDebug(debugGraphics, {
            tileColor: new Phaser.Display.Color(40, 255, 48, 255), // Color of non-colliding tiles (green)
            collidingTileColor: new Phaser.Display.Color(90), // Color of colliding tiles (black)
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
      });
        //this.world.convertTilemapLayer(layer);
        //layer.resizeWorld();

        let song_01 = this.sound.add('lvl1_01', {loop:false, volume: 0.4});
        //this.baby = this.add.sprite(260, 70, 'sprite');
        //this.baby = this.physics.add.sprite(80, 300, 'sprite').setScale(0.2).setSize(220, 255).setOffset(25, 50);
        this.baby = new Player(this, 80, 300, 'sprite',0, layer);
        //this.baby.create();
        this.disk = this.physics.add.sprite(200,300,'apple');
        //this.baby = (new Player(this, 80, 300, 'sprite',0));
        //this.physics.add.sprite(80, 300, 'sprite').setScale(0.2).setSize(220, 255).setOffset(25, 50);
        //this.baby.setCollideWorldBounds(true);
        
        //this.cameras.main.setBounds(0, 0, game.config.width, game.config.height);
        this.cameras.main.startFollow(this.baby.getPlayer());

        this.cursors = this.input.keyboard.createCursorKeys();

        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.tilesCollide = this.physics.add.collider(this.baby.getPlayer(), layer);
        this.physics.add.collider(this.disk, layer);

        this.physics.add.overlap(this.baby.getPlayer(), this.disk, () => {
            console.log("collided");
            song_01.play();
            this.disk.destroy();
        });
    }
    update() {

        this.baby.update();

        // //left/right movement
        // if (this.keyA.isDown) {
        //     this.baby.setVelocityX(-150);
        // }else if (this.keyD.isDown) {
        //     this.baby.setVelocityX(150);
        // }else {
        //     this.baby.setVelocityX(0);
        // }

        // //jump
        // if (this.baby.body.deltaY() > 0 && this.baby.body.onFloor()) {
        //     if(this.keyW.isDown || this.keySPACE.isDown)
        //         this.baby.setVelocityY(-150);
        // }
    }
}