class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        //loads all sprites and background
        this.load.image('menuBackground', './assets/menu_background.jpg');//temporary menu background (will change later)
        this.load.image('curtains', './assets/curtains.png');//temporary tween
        this.load.image('ground_1x1', './assets/ground_1x1.png'); // temporary
        this.load.image('sprite', './assets/Player_right.png'); // temporary
        this.load.image('enemy', './assets/baby_4.png'); // temporary
        this.load.image('background', './assets/menu_background.jpg'); //temporary
        this.load.image('disk', './assets/disc.png'); //temporary
        this.load.image('enemyShoot', './assets/apple_core_4.png'); //temporary

        //music may take a while to load due to uncompressed wav format
        
        //dialogue music
        this.load.audio('dialogueMusic', './assets/music/Menu_music 1.wav');
        this.load.audio('menuMusic', './assets/music/Menu_music_fixed.wav');

        //level 1 music 
        this.load.audio('lvl1_01', './assets/music/TechnoLVL1_01_fixed.wav');
        this.load.audio('lvl1_02', './assets/music/TechnoLVL1_02_fixed.wav');
        this.load.audio('lvl1_03', './assets/music/TechnoLVL1_03_fixed.wav');
        this.load.audio('lvl1_04', './assets/music/TechnoLVL1_04_fixed.wav');
        this.load.audio('lvl1_05', './assets/music/TechnoLVL1_05_fixed.wav');
        this.load.audio('lvl1_full', './assets/music/TechnoLVL1_full_fixed.wav');


        //prints message indicating player that game is loading
        this.add.text(game.config.width/2 - 40, game.config.height/2, 'Loading...', { fontFamily: 'Segoe Script', fontSize: '25px', color: 'white', align: 'left' });
    }

    create(){
        
        this.scene.start('startScene');

    }

}