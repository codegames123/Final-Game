class Level2 extends Phaser.Scene {
    constructor() {
        super("Level2Scene");

    }
    create() {
        //progress bar
        this.progressText = this.add.text(game.config.width / 2 + 25, game.config.height / 2 - 250, 'Progress ', { fontFamily: 'Courier', fontSize: '25px', color: 'white', align: 'left' });
        this.progressText.setShadow(0, 3, '#3B413C', true, true);
        this.progressText.setStroke('#C7C7A6', 2);
        this.progressText.scrollFactorX = 0;
        this.progressText.scrollFactorY = 0;
        /*this.progressBar = this.makeBar(game.config.width / 2 + 150, game.config.height / 2 - 260, 0x2ecc71); // this.makeBar(x,y,color)
        this.setValue(this.progressBar, 0); // setValue(this, width);
        this.progressBar.scrollFactorX = 0;
        this.progressBar.scrollFactorY = 0;*/



        //progress bar options
        //display appropriate progress sprite with opacity animation and destroy previous
        //sprites on screen to save memory

        if (this.numDiskCollected == 5) {
            this.progSprite1 = this.add.sprite(game.config.width / 2 + 240, 33, 'rockProg_atlas', 'rockProg_0006').setScale(.75, .5);
            this.progSprite1.scrollFactorX = 0;
            this.progSprite1.scrollFactorY = 0;
            this.progSprite1.setAlpha(0.1);
            this.progSprite2.destroy();
            this.diskCompleted.setActive(true);
            this.diskCompleted.setVisible(true);
        } else if (this.numDiskCollected == 4) {
            this.progSprite2 = this.add.sprite(game.config.width / 2 + 240, 33, 'rockProg_atlas', 'rockProg_0005').setScale(.75, .5);
            this.progSprite2.scrollFactorX = 0;
            this.progSprite2.scrollFactorY = 0;
            this.progSprite2.setAlpha(0.1);
            this.progSprite3.destroy();
        } else if (this.numDiskCollected == 3) {
            this.progSprite3 = this.add.sprite(game.config.width / 2 + 240, 33, 'rockProg_atlas', 'rockProg_0004').setScale(.75, .5);
            this.progSprite3.scrollFactorX = 0;
            this.progSprite3.scrollFactorY = 0;
            this.progSprite3.setAlpha(0.1);
            this.progSprite4.destroy();
        } else if (this.numDiskCollected == 2) {
            this.progSprite4 = this.add.sprite(game.config.width / 2 + 240, 33, 'rockProg_atlas', 'rockProg_0003').setScale(.75, .5);
            this.progSprite4.scrollFactorX = 0;
            this.progSprite4.scrollFactorY = 0;
            this.progSprite4.setAlpha(0.1);
            this.progSprite5.destroy();
        } else if (this.numDiskCollected == 1) {
            this.progSprite5 = this.add.sprite(game.config.width / 2 + 240, 33, 'rockProg_atlas', 'rockProg_0002').setScale(.75, .5);
            this.progSprite5.scrollFactorX = 0;
            this.progSprite5.scrollFactorY = 0;
            this.progSprite5.setAlpha(0.1);
            this.progSprite0.destroy();
        } else {
            this.progSprite0 = this.add.sprite(game.config.width / 2 + 240, 33, 'rockProg_atlas', 'rockProg_0001').setScale(.75, .5);
            this.progSprite0.scrollFactorX = 0;
            this.progSprite0.scrollFactorY = 0;
        }
    }

}