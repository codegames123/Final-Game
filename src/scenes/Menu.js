class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    
    create() {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;
        const w = this.cameras.main.width;
        const h = this.cameras.main.height;

        this.curtains = this.add.sprite(w/2,h/2 -700,'curtains').setScale(1.5);
        let background = this.add.tileSprite(game.config.width / 2, game.config.height / 2, game.config.width, game.config.height, 'menuBackground');
        this.menuSong = this.sound.add('menuMusic', { loop: true });
        this.menuSong.play();
        this.selectSound = this.sound.add('selectSound', { loop: false });
        //this.fadeTriggered= false;
        // let blueTween = this.tweens.add({
        //     targets: this.curtains,
        //     y: 270,
        //     ease: 'Linear',
        //     duration: 200,
        //     repeat: 0,
        //     yoyo: true,
        //     hold: 1700, // the number of ms to hold the tween before yoyo'ing 🚦🪀
        //     onYoyo: function () {
        //         this.scene.launch('Level1Scene');   // launch next scene to run concurrently
        //         this.scene.moveDown('Level1Scene');
        //     },
        //     onYoyoScope: this,  // maintain scene context
        //     paused: true
        // });

        //click how to play to go to how to Tutorial scene
        const howtoPlay = this.add.text(game.config.width / 2 - 370, game.config.height / 2 + 100, 'How To Play', { fontFamily: 'Courier', fontStyle: 'bold', stroke: '#000000', strokeThickness: 6, fontSize: 40, color: 'white', shadow: {offsetY: -4, color: 'black', blur: 4, stroke: true} }).setInteractive()
            .on('pointerdown', () => {
                this.selectSound.play();
                this.scene.start('tutorialScene');
                this.menuSong.stop();
            })
            .on('pointerover', () => {
                howtoPlay.setStyle({ fill: '#C93300FF' });
            })
            .on('pointerout', () => {
                howtoPlay.setStyle({ fill: 'white' })
            });

        const levelChoose = this.add.text(game.config.width / 2 + 150, game.config.height / 2 + 100, 'Level Select', { fontFamily: 'Courier', fontStyle: 'bold', stroke: '#000000', strokeThickness: 6, fontSize: 40, color: 'white', shadow: {offsetY: -4, color: 'black', blur: 4, stroke: true} }).setInteractive()
            .on('pointerdown', () => {
                this.selectSound.play();
                this.scene.start('levelChooseScene');
                this.menuSong.stop();
            })
            .on('pointerover', () => {
                levelChoose.setStyle({ fill: '#C93300FF' });
            })
            .on('pointerout', () => {
                levelChoose.setStyle({ fill: 'white' })
            });

        
        //click play for level 1 scene
        const clickPlay = this.add.text(game.config.width / 2 - 50, game.config.height / 2 - 80, 'Play', { fontFamily: 'Courier', fontStyle: 'bold', stroke: '#000000', strokeThickness: 4, fontSize: 60, color: '#C93300FF', shadow: {offsetY: -4, color: 'black', blur: 4, stroke: true} }).setInteractive()
            .on('pointerdown', () => {
                this.selectSound.play();
                background.destroy();
                howtoPlay.destroy();
                clickPlay.destroy();
                levelChoose.destroy();
                this.menuSong.stop();
                //this.scene.start('Level1Scene');
                this.cameras.main.fadeOut(1000, 255, 255, 255)
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                    this.scene.start('Level1Scene')
                })
            })
            .on('pointerover', () => {
                clickPlay.setStyle({ fill: 'white' });
            })
            .on('pointerout', () => {
                clickPlay.setStyle({ fill: '#C93300FF' })
            });
    }
    // update(){

    // }
}