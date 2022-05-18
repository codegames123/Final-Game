//var map;
//var layer;
//var cursors;
//var enemyFire;
var shootTime = 0;
class Level1 extends Phaser.Scene {
    constructor() {
        super("Level1Scene");

    }
    preload() {
        this.load.image('ground_1x1', './assets/ground_1x1.png'); // temporary
        this.load.image('sprite', './assets/Player_right.png'); // temporary
        this.load.image('enemy', './assets/baby_4.png'); // temporary
        this.load.image('background', './assets/menu_background.jpg'); //temporary
        this.load.image('disk', './assets/disc.png'); //temporary
        this.load.image('enemyShoot', './assets/apple_core_4.png'); //temporary
        this.load.tilemapTiledJSON('map', './assets/collision_test.json'); // temporary 
        this.load.audio('lvl1_01', './assets/music/TechnoLVL1_01_fixed.wav');
        this.load.audio('lvl1_02', './assets/music/TechnoLVL1_02_fixed.wav');
        this.load.audio('lvl1_03', './assets/music/TechnoLVL1_03_fixed.wav');
        this.load.audio('lvl1_04', './assets/music/TechnoLVL1_04_fixed.wav');
        this.load.audio('lvl1_05', './assets/music/TechnoLVL1_05_fixed.wav');
        this.load.audio('lvl1_full', './assets/music/TechnoLVL1_full_fixed.wav');
    }
    create() {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;
        const w = this.cameras.main.width;
        const h = this.cameras.main.height;

         this.diskStack = [];//stack array for disks 

        //this.background = this.add.tileSprite(game.config.width/2, game.config.height/2, game.config.width, game.config.height + 321, 'background');

        //temporary tilemap, will change using tilemap editor
        var map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('ground_1x1');
        this.layer = map.createLayer('Tile Layer 1', tileset);

        map.setCollisionBetween(1, 12);
        this.layer.setCollisionByProperty({ collides: true });

        //collision debugger
        const debugGraphics = this.add.graphics().setAlpha(0.45); // collision debugger for tilemap
        this.layer.renderDebug(debugGraphics, {
            tileColor: new Phaser.Display.Color(40, 255, 48, 255), // Color of non-colliding tiles (green)
            collidingTileColor: new Phaser.Display.Color(90), // Color of colliding tiles (the platforms, red)
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
      });

        //sets tween 'Level 1'
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

        topTextTween.play(); //plays tween "Level 1"

        //initilizes songs
        this.song_01 = this.sound.add('lvl1_01', {loop:false}); 
        this.song_01_isCollected = false;
        this.song_02 = this.sound.add('lvl1_02', {loop:false});
        this.song_02_isCollected = false;
        this.song_03 = this.sound.add('lvl1_03', {loop:false});
        this.song_03_isCollected = false;
        this.song_04 = this.sound.add('lvl1_04', {loop:false});
        this.song_04_isCollected = false;
        this.song_05 = this.sound.add('lvl1_05', {loop:false});
        this.song_05_isCollected = false;
        this.song_full = this.sound.add('lvl1_full', {loop:false});
        this.song_full_isCollected = false;
   
        //put in new player (scene,x,y,image, frame, layer)
        this.player = new Player(this,80,300, 'sprite',0, this.layer);

        //puts in enemy (scene,x,y,image,frame)
        this.enemy = new Enemy(this, 600,100,'enemy', 0);

        //enemy shooting system
         this.enemyFire = this.physics.add.group();
         //this.enemyFire = new ProjectilesGroup(this);
         this.enemyFire.createMultiple({
            frameQuantity: 30,
            active: false,
            visible: false,
            key: 'enemyShoot'
        })
        
        this.fireRate = 200;
        this.nextFire = 0;
        
        // this.enemy = this.physics.add.sprite(300, 200, 'enemy').setScale(0.2);
        // this.enemy.setImmovable(true);
        // this.enemy.setCollideWorldBounds(true);
        
        //disk collection numbers
        this.numDiskCollected = 0;
        this.maxDisktoCollect = 5;

        //disks
        this.disk = this.physics.add.sprite(200,300,'disk').setScale(0.03);
        this.disk2 = this.physics.add.sprite(500,200,'disk').setScale(0.03);
        this.disk3 = this.physics.add.sprite(800,350,'disk').setScale(0.03);
        this.disk4 = this.physics.add.sprite(1050,130,'disk').setScale(0.03);
        this.disk5 = this.physics.add.sprite(1250,330,'disk').setScale(0.03);

        //text UI (it is in text for now, will implement a bar later in the future)
        this.progressUI = this.add.text(game.config.width/2 +150, game.config.height/2 - 260, 'Disk Collected ' + this.numDiskCollected, {fontFamily: 'Courier',fontSize: '25px',color: 'red',align: 'left'});
       
        // keeps text on top right when player is moving
        this.progressUI.scrollFactorX = 0; 
        this.progressUI.scrollFactorY = 0;
        
        //camera settings
        this.cameras.main.setBounds(0, 0, 1600, 575);
        this.cameras.main.startFollow(this.player.getPlayer());
        
        
        //controls
        this.cursors = this.input.keyboard.createCursorKeys();
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); 
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M); // for menu

        this.time.addEvent({ // delay for every 0.2 second, player loses a disk if collided with the mute projectile
            delay: 200, callback: () => {
                if (this.checkOverlap(this.player.getPlayer(), this.enemyFire)) {
                    this.checkPlaying();
                    this.enemyFire.setVisible(false);
                    console.log('collided with bullet');
                    this.physics.add.collider(this.disk, this.layer);
                    this.physics.add.collider(this.disk2, this.layer);
                    this.physics.add.collider(this.disk3, this.layer);
                    this.physics.add.collider(this.disk4, this.layer);
                    this.physics.add.collider(this.disk5, this.layer);
                    console.log(this.diskStack);
                    console.log(this.numDiskCollected);
                }

            }, callbackScope: this, loop: true
        });
        this.time.addEvent({ // delay for every 1 second, enemy takes a disk if collided with the player
            delay: 1000, callback: () => {
                if (this.checkOverlap(this.player.getPlayer(), this.enemy.getEnemy())) { // checks if player collided with enemy
                    this.checkPlaying();
                    console.log('collided with enemy');

                    this.physics.add.collider(this.disk, this.layer);
                    this.physics.add.collider(this.disk2, this.layer);
                    this.physics.add.collider(this.disk3, this.layer);
                    this.physics.add.collider(this.disk4, this.layer);
                    this.physics.add.collider(this.disk5, this.layer);
                    console.log(this.diskStack);
                    console.log(this.numDiskCollected);
                }
            }, callbackScope: this, loop: true
        });

        //collisions
        this.tilesCollide = this.physics.add.collider(this.player.getPlayer(), this.layer);
        this.physics.add.collider(this.disk, this.layer);
        this.physics.add.collider(this.disk2, this.layer);
        this.physics.add.collider(this.disk3, this.layer);
        this.physics.add.collider(this.disk4, this.layer);
        this.physics.add.collider(this.disk5, this.layer);
        this.physics.add.collider(this.enemy.getEnemy(), this.layer);
    }
    update() {
        if (!this.tweenPlay) { // if tween isnt playing
            this.player.update(); // allows player movement
            if (this.getDistance(this.player.getPlayer().x, this.player.getPlayer().y, this.enemy.getEnemy().x, this.enemy.getEnemy().y) < 200) { // gets distance of player and enemy
                this.enemyFollows(this.enemy.getEnemy(), this.player.getPlayer(), 100); // if player is in range of enemy, enemy starts following player
                this.enemyShoot();
                //console.log('in range');
            }
        }
        if (this.checkOverlap(this.player.getPlayer(), this.disk)) { // if collided with first song, plays and destroys
            this.diskStack.push(this.song_01); //pushes first song into stack array
            console.log(this.diskStack);
            this.numDiskCollected++;
            console.log(this.numDiskCollected);
            this.song_01.isCollected = true;
            console.log("collided"); //increments collected
            console.log(this.diskStack);
            this.checkMusicPlayer();
            this.song_01.play();
            this.disk.destroy();
        }
        if (this.checkOverlap(this.player.getPlayer(), this.disk2)) { // if collided with second song, plays and destroys
            this.diskStack.push(this.song_02); //pushes second song into stack array
            console.log(this.diskStack);
            this.numDiskCollected++; //increments collected
            console.log(this.numDiskCollected);
            console.log("collided"); 
            console.log(this.diskStack);
            this.checkMusicPlayer()
            this.song_02.play(); 
            this.disk2.destroy();
        }
        if (this.checkOverlap(this.player.getPlayer(), this.disk3)) { // if collided with third song, plays and destroys
            this.diskStack.push(this.song_03); //pushes second song into stack array
            console.log(this.diskStack);
            this.numDiskCollected++; //increments collected
            console.log(this.numDiskCollected);
            console.log("collided"); 
            console.log(this.diskStack);
            this.checkMusicPlayer()
            this.song_03.play(); 
            this.disk3.destroy();
        }
        if (this.checkOverlap(this.player.getPlayer(), this.disk4)) { // if collided with forth song, plays and destroys
            this.diskStack.push(this.song_04); //pushes second song into stack array
            console.log(this.diskStack);
            this.numDiskCollected++; //increments collected
            console.log(this.numDiskCollected);
            console.log("collided"); 
            console.log(this.diskStack);
            this.checkMusicPlayer()
            this.song_04.play(); 
            this.disk4.destroy();
        }
        if (this.checkOverlap(this.player.getPlayer(), this.disk5)) { // if collided with fifth song, plays and destroys
            this.diskStack.push(this.song_05); //pushes second song into stack array
            console.log(this.diskStack);
            this.numDiskCollected++; //increments collected
            console.log(this.numDiskCollected);
            console.log("collided"); 
            console.log(this.diskStack);
            this.checkMusicPlayer()
            this.song_05.play(); 
            this.disk5.destroy();
        }
        
        if (keyM.isDown) { // (temporary) if m is pressed, switches back to menu scene
            this.scene.start('menuScene');
        }

        this.progressUI.text = 'Disk Collected: ' + this.numDiskCollected + ' / ' + this.maxDisktoCollect; //updates numCollected text

    }

    // helper functions
    checkOverlap(object1,object2){ // checks overlaps of two objects
        return this.physics.overlap(object1, object2);
    }

    enemyFollows (enemy, player, speed) { // enemy follows the player
        this.physics.moveToObject(enemy, player, speed);
    }
    enemyShoot() {
        if(this.time.now > shootTime) {
            shootTime = this.time.now + 900;
            this.enemyFires = this.enemyFire.getFirstDead();
            if(this.enemyFires) {
                console.log('fire');
                this.enemyFires.body.reset(this.enemy.getEnemy().x, this.enemy.getEnemy().y);
                this.enemyFires.setVisible(true);
                this.physics.moveToObject(this.enemyFires, this.player.getPlayer(), 400);  
            }
        }
        
    }
    getDistance (x1,y1,x2,y2) { // checks if enemy is in range of player
        return Phaser.Math.Distance.Between(x1,y1,x2,y2);
    }
    checkPlaying() {
        this.songPopped = this.diskStack.pop(); // pops song and sets to this.songPopped
        if (this.songPopped === this.song_01) { // if song popped is first song
            console.log('disk 1 taken from enemy');
            this.song_01.stop();
            this.song_01_isCollected = false;
            this.disk = this.physics.add.sprite(200, 300, 'disk').setScale(0.03);
        }
        if (this.songPopped === this.song_02) {// if song popped is second song
            console.log('disk 2 taken from enemy');
            this.song_02.stop();
            this.song_02_isCollected = false;
            this.disk2 = this.physics.add.sprite(500, 200, 'disk').setScale(0.03);
        }
        if (this.songPopped === this.song_03) {// if song popped is third song
            console.log('disk 3 taken from enemy');
            this.song_03.stop();
            this.song_03_isCollected = false;
            this.disk3 = this.physics.add.sprite(800, 350, 'disk').setScale(0.03);
        }
        if (this.songPopped === this.song_04) {// if song popped is forth song
            console.log('disk 4 taken from enemy');
            this.song_04.stop();
            this.song_04_isCollected = false;
            this.disk4 = this.physics.add.sprite(1050, 130, 'disk').setScale(0.03);
        }
        if (this.songPopped === this.song_05) {// if song popped is fifth song
            console.log('disk 5 taken from enemy');
            this.song_05.stop();
            this.song_05_isCollected = false;
            this.disk5 = this.physics.add.sprite(1250, 330, 'disk').setScale(0.03);
        }
        if(this.numDiskCollected > 0)
            this.numDiskCollected--;

    }
    checkMusicPlayer() { // stops last song if a new disk is picked up
        if(this.song_01.isPlaying) {
            console.log('music 1 is playing');
            this.song_01.stop();
        }
        if(this.song_02.isPlaying) {
            console.log('music 2 is player');
            this.song_02.stop();
        }
        if(this.song_03.isPlaying) {
            console.log('music 3 is player');
            this.song_03.stop();
        }
        if(this.song_04.isPlaying) {
            console.log('music 4 is player');
            this.song_04.stop();
        }
        if(this.song_05.isPlaying) {
            console.log('music 5 is player');
            this.song_05.stop();
        }
    }

}