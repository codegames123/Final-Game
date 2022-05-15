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
        this.load.image('enemy', './assets/baby_4.png'); // temporary
        this.load.image('background', './assets/menu_background.jpg'); //temporary
        this.load.image('apple', './assets/apple_core_4.png'); //temporary
        this.load.tilemapTiledJSON('map', './assets/collision_test.json'); // temporary 
        this.load.audio('lvl1_01', './assets/music/TechnoLVL1_01.wav');
    }
    create() {
        // resize game 
        //game.scale.resize(800, 600);
        // define some dimensions

        
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;
        const w = this.cameras.main.width;
        const h = this.cameras.main.height;

        let diskStack = [];
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
        this.tweenPlay = true;
        let topText = this.add.text(w/2, h/2-300, "Level 1", {fontfamily: 'papyrus', fontSize: 40}).setOrigin(1, 0);
        let topTextTween = this.tweens.add({
            delay: 375,
            targets: topText,
            y: h-200,
            ease: 'Linear',
            duration: 250,
            repeat: 0,
            yoyo: true,
            hold: 2500,
            paused: true,
            onComplete: function() {
                //this.scene.start('Level1Scene');
                topText.destroy();
                this.tweenPlay= false;
            },
            onCompleteScope: this   // maintain scene context
        });

        topTextTween.play();

        let song_01 = this.sound.add('lvl1_01', {loop:false, volume: 0.4});
        //this.baby = this.add.sprite(260, 70, 'sprite');
        //this.baby = this.physics.add.sprite(80, 300, 'sprite').setScale(0.2).setSize(220, 255).setOffset(25, 50);
        this.player = new Player(this, 80, 300, 'sprite',0, layer);
        //this.player.create();
        this.disk = this.physics.add.sprite(200,300,'apple');
        //this.player = (new Player(this, 80, 300, 'sprite',0));
        //this.physics.add.sprite(80, 300, 'sprite').setScale(0.2).setSize(220, 255).setOffset(25, 50);
        //this.player.setCollideWorldBounds(true);

        //enemy
        this.enemy = new Enemy(this, 300,200,'enemy', 0);
        // this.enemy = this.physics.add.sprite(300, 200, 'enemy').setScale(0.2);
        // this.enemy.setImmovable(true);
        // this.enemy.setCollideWorldBounds(true);
        
        this.numDiskCollected = 0;
        this.maxDisktoCollect = 4;
        
        //this.cameras.main.setBounds(0, 0, game.config.width, game.config.height);
        this.cameras.main.startFollow(this.player.getPlayer());

        this.cursors = this.input.keyboard.createCursorKeys();

        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.tilesCollide = this.physics.add.collider(this.player.getPlayer(), layer);
        this.physics.add.collider(this.disk, layer);
        this.physics.add.collider(this.enemy.getEnemy(), layer);

        this.physics.add.overlap(this.player.getPlayer(), this.disk, () => {
            console.log("collided");
            song_01.play();
            this.disk.destroy();
        });
    }
    update() {
        if(!this.tweenPlay) { // if tween isnt playing
            this.player.update();

            if(this.getDistance(this.player.getPlayer().x,this.player.getPlayer().y, this.enemy.getEnemy().x,this.enemy.getEnemy().y) < 200) {
                this.enemyFollows(this.enemy.getEnemy(), this.player.getPlayer(), 100);
                //console.log('in range');
           }     
        }

        if(this.checkOverlap(this.player.getPlayer(),this.enemy.getEnemy())) // checks if player collided with enemy
            console.log('collided with enemy');

    }

    checkOverlap(object1,object2){
        // let boundA = player.getBounds();
        // let boundB = enemy.getBounds();
        
        // return Phaser.Geom.Intersects.RectangleToRectangle(boundA, boundB);
        return this.physics.overlap(object1, object2);
    }

    enemyFollows (enemy, player, speed) { // enemy follows the player
        this.physics.moveToObject(enemy, player, speed);
    }

    getDistance (x1,y1,x2,y2) { // checks if enemy is in range of player
        return Phaser.Math.Distance.Between(x1,y1,x2,y2);
    }

}