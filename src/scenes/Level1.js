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
        this.load.image('background', './assets/menu_background.jpg');
        this.load.tilemapTiledJSON('map', './assets/collision_test.json'); // temporary 
    }
    create() {
        //this.background = this.add.tileSprite(game.config.width/2, game.config.height/2, game.config.width, game.config.height + 321, 'background');
        var map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('ground_1x1');
        const layer = map.createLayer('Tile Layer 1', tileset);
        layer.setCollisionByProperty({ collides: true });

        //this.world.convertTilemapLayer(layer);
        //layer.resizeWorld();

        map.setCollisionBetween(1, 12);

        //this.baby = this.add.sprite(260, 70, 'sprite');
        this.baby = this.physics.add.sprite(80, 300, 'sprite').setScale(0.2).setSize(220, 255).setOffset(25, 50);
        //this.baby.setCollideWorldBounds(true);

        //this.cameras.main.setBounds(0, 0, game.config.width/2, game.config.height/2);
        this.cameras.main.startFollow(this.baby);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.baby, layer);
    }
    update() {
        if (this.cursors.up.isDown) {
            this.baby.body.velocity.y = -150;
        }
        else if (this.cursors.down.isDown) {
            this.baby.body.velocity.y = 150;
        }

        if (this.cursors.left.isDown) {
            this.baby.body.velocity.x = -150;
        }
        else if (this.cursors.right.isDown) {
            this.baby.body.velocity.x = 150;
        }
    }
}