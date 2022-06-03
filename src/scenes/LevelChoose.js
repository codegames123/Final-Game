class LevelChoose extends Phaser.Scene {
    constructor() {
        super("levelChooseScene");
    }

    create() {
        this.add.text(game.config.width/2 - 180, game.config.height/2 - 260, "Level Select", {fontFamily: 'Segoe Script', fontSize: 60});
        this.selectSound = this.sound.add('selectSound', { loop: false }); // initilizes select sound
        
        const level1 = this.add.text(game.config.width / 2 - 250, game.config.height / 2 - 100, 'LEVEL 1', { fontSize: 30, fontFamily: 'Comic Sans MS', color: 'white' }).setInteractive()
            .on('pointerdown', () => {
                if (level1Completed) { // if level 1 is complete, lets player go to that level
                    this.scene.start('Level1Scene');
                    this.selectSound.play();
                }
                else // else shows incomplete message
                    this.incompleteText = this.add.text(game.config.width / 2 - 240, game.config.height / 2 - 60, 'Incomplete', { fontSize: 20, fontFamily: 'Comic Sans MS', color: 'red' })

            })
            .on('pointerover', () => {
                this.lvl1Image = this.add.image(game.config.width/2,game.config.height/2 + 150, 'level1background').setScale(0.2);
                level1.setStyle({ fill: 'green' });
            })
            .on('pointerout', () => {
                this.lvl1Image.destroy();
                level1.setStyle({ fill: 'white' })
                this.incompleteText.destroy();
            });

        const level2 = this.add.text(game.config.width / 2 + 100, game.config.height / 2 - 100, 'LEVEL 2', { fontSize: 30, fontFamily: 'Comic Sans MS', color: 'white' }).setInteractive()
            .on('pointerdown', () => {
                if (level2Completed) { // if level 2 is complete, lets player go to that level
                    this.selectSound.play();
                    this.scene.start('Level2Scene');
                }
                else
                this.incompleteText = this.add.text(game.config.width / 2 + 100, game.config.height / 2 - 60, 'Incomplete', { fontSize: 20, fontFamily: 'Comic Sans MS', color: 'red' })
            })
            .on('pointerover', () => {
                level2.setStyle({ fill: 'green' });
            })
            .on('pointerout', () => {
                level2.setStyle({ fill: 'white' })
                this.incompleteText.destroy();
            });

        const clickBack = this.add.text(game.config.width / 2 + 300, game.config.height / 2 + 200, 'Back', { fontFamily: 'Comic Sans MS', fontSize: 60, color: 'white' }).setInteractive()
            .on('pointerdown', () => {
                this.selectSound.play();
                this.scene.start('menuScene');
            })
            .on('pointerover', () => {
                clickBack.setStyle({ fill: 'green' });
            })
            .on('pointerout', () => {
                clickBack.setStyle({ fill: 'white' })
            });
    }
}