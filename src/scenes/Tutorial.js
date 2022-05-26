class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene");
    }
    create(){
        this.add.text(game.config.width/2 - 230, game.config.height/2 - 260, "HOW TO PLAY", {fontFamily: 'Segoe Script', fontSize: 60})
        this.selectSound = this.sound.add('selectSound', { loop: false });
        //click back to go back to menu
        const clickBack = this.add.text(game.config.width / 2 + 300, game.config.height / 2 + 200, 'Back', { fontFamily: 'Segoe Script', fontSize: 60, color: 'orange' }).setInteractive()
            .on('pointerdown', () =>  {
                this.selectSound.play();
                this.scene.start('menuScene');})
            .on('pointerover', () => {
                clickBack.setStyle({fill: 'green'});
            })
            .on('pointerout', () => {
                clickBack.setStyle({fill: 'orange'})
            });
    }
}