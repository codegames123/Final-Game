//var map;
//var layer;
//var cursors;
class Level1 extends Phaser.Scene {
    constructor() {
        super("Level1Scene");

    }
    preload() {

        this.load.image('ground_1x1', './assets/ground_1x1.png'); // temporary
        this.load.image('sprite', './assets/baby_4.png'); // temporary
        this.load.image('background', './assets/menu_background.jpg'); //temporary
        this.load.tilemapTiledJSON('map', './assets/collision_test.json'); // temporary 
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

        //this.baby = this.add.sprite(260, 70, 'sprite');
        this.baby = this.physics.add.sprite(80, 300, 'sprite').setScale(0.2).setSize(220, 255).setOffset(25, 50);
        //this.baby.setCollideWorldBounds(true);

        //this.cameras.main.setBounds(0, 0, game.config.width/2, game.config.height/2);
        this.cameras.main.startFollow(this.baby);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.tilesCollide = this.physics.add.collider(this.baby, layer);

    }
    update() {
        
        this.baby.isGrounded = this.baby.body.touching.down;
        if (this.keyA.isDown) {
            this.baby.setVelocityX(-150);
        }
        else if (this.keyD.isDown) {
            this.baby.setVelocityX(150);
        }
        else {
            this.baby.setVelocityX(0);
        }
        if (this.keyW.isDown || this.keySPACE.isDown && this.baby.body.deltaY() > 0 && this.baby.body.onFloor()) {
            this.jumping = true;
            this.maxJumps = 1;
            this.baby.setVelocityY(-150);
            console.log('touching gronnd');
           
        }
    }
}