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
    }

    create(){
        this.add.text(game.config.width/2, game.config.height/2, 'Loading...', { fontFamily: 'Courier', fontSize: '25px', color: 'white', align: 'left' });
        this.scene.start('menuScene');

    }

}