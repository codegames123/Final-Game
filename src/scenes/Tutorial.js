class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene");
    }
    // preload(){

    // }
    create(){
        this.add.text(game.config.width/2 - 230, game.config.height/2 - 260, "HOW TO PLAY", {fontFamily: 'Segoe Script', fontSize: 60})
        const clickNext = this.add.text(game.config.width / 2 + 300, game.config.height / 2 + 200, 'Back', { fontFamily: 'Segoe Script', fontSize: 60, color: 'orange' }).setInteractive()
            .on('pointerdown', () =>  {
                //selectSound.play();
                this.scene.start('menuScene');})
            .on('pointerover', () => {
                clickNext.setStyle({fill: 'green'});
            })
            .on('pointerout', () => {
                clickNext.setStyle({fill: 'orange'})
            });
    }
}