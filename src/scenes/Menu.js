class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('menuBackground', './assets/menu_background.jpg');//temporary menu background (will change later)
    }
    create(){
        this.add.tileSprite(game.config.width/2, game.config.height/2, game.config.width+ 1500, game.config.height, 'menuBackground');
        const clickPlay = this.add.text(game.config.width / 2 - 50, game.config.height / 2, 'Play', { fontFamily: 'Segoe Script', fontSize: 60, color: 'orange' }).setInteractive()
            .on('pointerdown', () =>  {
                //selectSound.play();
                this.scene.start('Level1Scene');})
            .on('pointerover', () => {
                clickPlay.setStyle({fill: 'green'});
            })
            .on('pointerout', () => {
                clickPlay.setStyle({fill: 'orange'})
            });
    }
    // update(){

    // }
}