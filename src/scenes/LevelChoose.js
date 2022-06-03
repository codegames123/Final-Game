class LevelChoose extends Phaser.Scene {
    constructor() {
        super("levelChooseScene");
    }

    create() {
        //Top Text
        let topText = this.add.text(game.config.width / 2 - 180, game.config.height / 2 - 260, "Level Select", { fontFamily: 'Segoe Script', fontSize: 60 });
        topText.setShadow(0, 3, '#FF47B6', true, true);
        topText.setStroke('#10F9F9', 2);
        this.add.text(40, game.config.height / 2 - 170, "Select LEVEL # to replay level or Musical Note to replay entire level song", { fontFamily: 'Courier', fontSize: 20 });
        
        //Initilizes songs and SFX
        this.level1Song = this.sound.add('lvl1_full', { loop: false });
        this.level2Song = this.sound.add('lvl2_full', { loop: false });
        this.selectSound = this.sound.add('selectSound', { loop: false }); // initilizes select sound

        //map level images
        this.lvl1Image = this.add.image(game.config.width / 2, game.config.height / 2 + 150, 'level1background').setScale(0.2);
        this.lvl1Image.setVisible(false);
        this.lvl2Image = this.add.image(game.config.width / 2, game.config.height / 2 + 150, 'level2backgroundOrange').setScale(0.2);
        this.lvl2Image.setVisible(false);

        //Incomplete Text
        this.incompleteText1 = this.add.text(game.config.width / 2 - 260, game.config.height / 2 - 60, 'Incomplete', { fontSize: 20, fontFamily: 'Courier', fontStyle: 'bold', stroke: '#ffffff', strokeThickness: 2, color: 'purple', shadow: {offsetY: -4, color: '#ffffff', blur: 4, stroke: true} });
        this.incompleteText1.setVisible(false);
        this.incompleteText2 = this.add.text(game.config.width / 2 + 100, game.config.height / 2 - 60, 'Incomplete', { fontSize: 20, fontFamily: 'Courier', fontStyle: 'bold', stroke: '#ffffff', strokeThickness: 2, color: '#C93300FF', shadow: {offsetY: -4, color: '#ffffff', blur: 4, stroke: true} })
        this.incompleteText2.setVisible(false);

        //Level 1 musical note
        this.lvl1note = this.add.image(game.config.width / 2 - 200, game.config.height / 2 + 20, 'notes').setScale(2).setInteractive()
            .on('pointerdown', () => {
                if (level1Completed) { // if level 1 is complete, lets player go to that level
                    this.noteVfxManager = this.add.particles('notes');
                    this.noteVfxEffect = this.noteVfxManager.createEmitter({
                        follow: this.lvl1note,
                        quantity: 7,
                        scale: { start: 1.5, end: 0.0 },  // start big, end small
                        speed: { min: 50, max: 100 }, // speed up
                        lifespan: 800,   // short lifespan
                        on: false   // do not immediately start, will trigger in collision
                    });
                    this.level2Song.stop();
                    this.level1Song.play()
                    this.noteVfxEffect.explode();
                }
                else // else shows incomplete message
                    this.incompleteText1.setVisible(true);
            })
            .on('pointerover', () => {
                this.lvl1Image.setVisible(true);
                this.lvl1note.setAlpha(0.5);
            })
            .on('pointerout', () => {
                this.lvl1Image.setVisible(false);
                this.lvl1note.setAlpha(1);
            });

        //Level 2 musical note
        this.lvl2note = this.add.image(game.config.width / 2 + 150, game.config.height / 2 + 20, 'notes2').setScale(2).setInteractive()
            .on('pointerdown', () => {
                if (level2Completed) { // if level 1 is complete, lets player go to that level
                    this.notetVfxManager = this.add.particles('notes2');
                    this.notetVfxEffect = this.notetVfxManager.createEmitter({
                        follow: this.lvl2note,
                        quantity: 7,
                        scale: { start: 1.5, end: 0.0 },  // start big, end small
                        speed: { min: 50, max: 100 }, // speed up
                        lifespan: 800,   // short lifespan
                        on: false   // do not immediately start, will trigger in collision
                    });
                    this.level1Song.stop();
                    this.level2Song.play();
                    this.notetVfxEffect.explode();
                }
                else // else shows incomplete message
                    this.incompleteText2.setVisible(true);
            })
            .on('pointerover', () => {
                this.lvl2Image.setVisible(true);
                this.lvl2note.setAlpha(0.5);
            })
            .on('pointerout', () => {
                this.lvl2Image.setVisible(false);
                this.lvl2note.setAlpha(1);
            });

        //Level 1 Text
        const level1 = this.add.text(game.config.width / 2 - 250, game.config.height / 2 - 100, 'LEVEL 1', { fontSize: 30, fontFamily: 'Courier', color: 'white', fontStyle: 'bold'}).setInteractive()
            .on('pointerdown', () => {
                if (level1Completed) { // if level 1 is complete, lets player go to that level
                    this.level1Song.stop();
                    this.level2Song.stop();
                    this.scene.start('Level1Scene');
                    this.selectSound.play();
                }
                else // else shows incomplete message
                    this.incompleteText1.setVisible(true);
            })
            .on('pointerover', () => {
                this.lvl1Image.setVisible(true);
                level1.setStyle({ fill: 'purple' });
            })
            .on('pointerout', () => {
                this.lvl1Image.setVisible(false);
                level1.setStyle({ fill: 'white' })
            });

        //Level 2 musical note
        const level2 = this.add.text(game.config.width / 2 + 100, game.config.height / 2 - 100, 'LEVEL 2', { fontSize: 30, fontFamily: 'Courier', color: 'white', fontStyle: 'bold' }).setInteractive()
            .on('pointerdown', () => {
                if (level2Completed) { // if level 2 is complete, lets player go to that level
                    this.selectSound.play();
                    this.level1Song.stop();
                    this.level2Song.stop();
                    this.scene.start('Level2Scene');
                }
                else
                    this.incompleteText2.setVisible(true);
            })
            .on('pointerover', () => {
                level2.setStyle({ fill: 'brown' });
                this.lvl2Image.setVisible(true);
            })
            .on('pointerout', () => {
                level2.setStyle({ fill: 'white' })
                this.lvl2Image.setVisible(false);
            });

        //Back text
        const clickBack = this.add.text(game.config.width / 2 + 300, game.config.height / 2 + 200, 'Back', { fontFamily: 'Courier', fontSize: 60, color: '#FF47B6' }).setInteractive()
            .on('pointerdown', () => {
                this.selectSound.play();
                this.level1Song.stop();
                this.level2Song.stop();
                this.scene.start('menuScene');
            })
            .on('pointerover', () => {
                clickBack.setStyle({ fill: '#10F9F9' });
                clickBack.setShadow(0, 3, '#FF47B6', true, true);
            })
            .on('pointerout', () => {
                clickBack.setStyle({ fill: '#FF47B6' });
                clickBack.setShadow(0, 3, '#10F9F9', true, true);
            });
    }
}