class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('menuBackground', './assets/menu_background.jpg');//temporary menu background (will change later)
        this.load.image('curtains', './assets/curtains.png');//temporary tween
    }
    create() {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;
        const w = this.cameras.main.width;
        const h = this.cameras.main.height;

        this.curtains = this.add.sprite(w/2,h/2 -700,'curtains').setScale(1.5);
        let background = this.add.tileSprite(game.config.width / 2, game.config.height / 2, game.config.width + 1500, game.config.height, 'menuBackground');

        //temporary tween testers
        let gfx = this.make.graphics().fillStyle(0x0000ff).fillRect(0, 0, w, h);
        gfx.generateTexture('bluerect', w, h);
        // red rectangle
        gfx = this.make.graphics().fillStyle(0xff0000).fillRect(0, 0, w / 3, h);
        gfx.generateTexture('redrect', w / 3, h);
        // yellow rectangle
        gfx = this.make.graphics().fillStyle(0xffff00).fillRect(0, 0, w, h / 4);
        gfx.generateTexture('yellowrect', w, h / 4);
        // now clean up after ourselves
        gfx.destroy();

        // add graphics textures as images (so we can tween them) temporay for testing
        let blueRect = this.add.image(0, -h, 'bluerect').setOrigin(0);
        let yellowRect = this.add.image(w, h / 4 * 3, 'yellowrect').setOrigin(0);
        let redRect = this.add.image(0 - w / 3, 0, 'redrect').setOrigin(0);


        // temporary tweens and tween names (will change soon)
        const topText = this.add.text(game.config.width / 2 - 600, game.config.height / 2, "Text Here", { fontFamily: 'Segoe Script', fontSize: 40, color: 'black' }).setOrigin(1, 0);
        let middleText = this.add.text(0, h / 4 + 64, 'TEST 1').setOrigin(1, 0);
        let bottomText = this.add.text(w * 2, h - 128, 'SANIC DA SHREKHOG', {
            fontFamily: 'Futura',
            fontSize: '24px',
            color: '#000000'
        }).setOrigin(1, 0);

        let blueTween = this.tweens.add({
            targets: this.curtains,
            y: 270,
            ease: 'Linear',
            duration: 400,
            repeat: 0,
            yoyo: true,
            hold: 1600, // the number of ms to hold the tween before yoyo'ing 🚦🪀
            onYoyo: function () {
                this.scene.launch('Level1Scene');   // launch next scene to run concurrently
                this.scene.moveDown('Level1Scene');
            },
            onYoyoScope: this,  // maintain scene context
            paused: true
        });

        // let yellowTween = this.tweens.add({
        //     delay: 125,
        //     targets: yellowRect,
        //     x: 0,
        //     ease: 'Linear',
        //     duration: 250,
        //     repeat: 0,
        //     yoyo: true,
        //     hold: 1650,
        //     paused: true
        // });
        // let bottomTextTween = this.tweens.add({
        //     delay: 125,
        //     targets: bottomText,
        //     x: w - 32,
        //     ease: 'Linear',
        //     duration: 250,
        //     repeat: 0,
        //     yoyo: true,
        //     hold: 1650,
        //     paused: true
        // });
        // let redTween = this.tweens.add({
        //     delay: 250,
        //     targets: redRect,
        //     x: 0,
        //     ease: 'Linear',
        //     duration: 250,
        //     repeat: 0,
        //     yoyo: true,
        //     hold: 1500,
        //     paused: true
        // });

        let topTextTween = this.tweens.add({
            delay: 305,
            targets: topText,
            x: game.config.width - 370,
            ease: 'Linear',
            duration: 250,
            repeat: 0,
            yoyo: true,
            hold: 1400,
            paused: true,
            onComplete: function () {
                this.scene.stop('menuScene');
            },
            onCompleteScope: this   // maintain scene context
        });
        // let middleTextTween = this.tweens.add({
        //     delay: 375,
        //     targets: middleText,
        //     x: w - 64,
        //     ease: 'Linear',
        //     duration: 250,
        //     repeat: 0,
        //     yoyo: true,
        //     hold: 1650,
        //     paused: true
        // });

        //click how to play to go to how to Tutorial scene
        const howtoPlay = this.add.text(game.config.width / 2 - 120, game.config.height / 2 + 100, 'How To Play', { fontFamily: 'Segoe Script', fontSize: 40, color: 'orange' }).setInteractive()
            .on('pointerdown', () => {
                //selectSound.play();

                this.scene.start('tutorialScene');
            })
            .on('pointerover', () => {
                howtoPlay.setStyle({ fill: 'green' });
            })
            .on('pointerout', () => {
                howtoPlay.setStyle({ fill: 'orange' })
            });

        //click play for level 1 scene
        const clickPlay = this.add.text(game.config.width / 2 - 50, game.config.height / 2, 'Play', { fontFamily: 'Segoe Script', fontSize: 60, color: 'orange' }).setInteractive()
            .on('pointerdown', () => {
                //this.scene.moveDown("menuScene");
                // start all tweens
                background.destroy();
                howtoPlay.destroy();
                clickPlay.destroy();
                blueTween.play();
                // yellowTween.play();
                //bottomTextTween.play();
                //redTween.play();
                topTextTween.play();
                //middleTextTween.play();
            })
            //selectSound.play();
            //this.scene.start('Level1Scene');})
            .on('pointerover', () => {
                clickPlay.setStyle({ fill: 'green' });
            })
            .on('pointerout', () => {
                clickPlay.setStyle({ fill: 'orange' })
            });
    }
    // update(){

    // }
}