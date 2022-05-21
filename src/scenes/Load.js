class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        this.load.image('menuBackground', './assets/menu_background.jpg');//temporary menu background (will change later)
        this.load.image('curtains', './assets/curtains.png');//temporary tween
        this.load.image('ground_1x1', './assets/ground_1x1.png'); // temporary
        this.load.image('sprite', './assets/Player_right.png'); // temporary
        this.load.image('enemy', './assets/baby_4.png'); // temporary
        this.load.image('background', './assets/menu_background.jpg'); //temporary
        this.load.image('disk', './assets/disc.png'); //temporary
        this.load.image('enemyShoot', './assets/apple_core_4.png'); //temporary
        this.load.tilemapTiledJSON('map', './assets/level1tilemap.json'); // temporary 

        //loads level 1 music
        this.load.audio('lvl1_01', './assets/music/TechnoLVL1_01_fixed.wav');
        this.load.audio('lvl1_02', './assets/music/TechnoLVL1_02_fixed.wav');
        this.load.audio('lvl1_03', './assets/music/TechnoLVL1_03_fixed.wav');
        this.load.audio('lvl1_04', './assets/music/TechnoLVL1_04_fixed.wav');
        this.load.audio('lvl1_05', './assets/music/TechnoLVL1_05_fixed.wav');
        this.load.audio('lvl1_full', './assets/music/TechnoLVL1_full_fixed.wav');
    }

    create(){
        this.scene.start('menuScene');
    }

}