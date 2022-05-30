//works but code is weird. will find a way to fix it soon
class Pause extends Phaser.Scene {
    constructor() {
        super('pauseScene');
    }

    create() {
        this.add.text(game.config.width / 2- 120, game.config.height / 2 - 100, 'PAUSED', {fontSize: 70});
        this.add.image(game.config.width/2 - 60, game.config.height/2 + 20, 'playButton').setScale(0.3).setInteractive()
        .on('pointerdown', () => {
            this.scene.resume('Level1Scene');
            this.scene.stop();
            //this.add.text(game.config.width/2, game.config.height/2, 'PAUSED')
            
        });
        this.add.image(game.config.width/2 + 80, game.config.height/2 + 20, 'restartButton').setScale(0.3).setInteractive()
        .on('pointerdown', () => {
            //this.checkMusicPlayer();
            this.scene.start('Level1Scene');
            //this.scene.stop();
            //this.add.text(game.config.width/2, game.config.height/2, 'PAUSED')
            
        });
        this.add.text(game.config.width/2 - 40, game.config.height/2 + 80, 'Menu', {fontSize:40}).setInteractive()
        .on('pointerdown', () => {
            //this.checkMusicPlayer();
            this.scene.start('menuScene');
            this.scene.stop('Level1Scene');
            //this.add.text(game.config.width/2, game.config.height/2, 'PAUSED')
            
        });
    }
  
}

class Pause2 extends Phaser.Scene {
    constructor() {
        super('pauseScene2');

    }
    create() {
        this.add.text(game.config.width / 2- 120, game.config.height / 2 - 100, 'PAUSED', {fontSize: 70});
        this.add.image(game.config.width/2 - 60, game.config.height/2 + 20, 'playButton').setScale(0.3).setInteractive()
        .on('pointerdown', () => {
            this.scene.resume('Level2Scene');
            this.scene.stop();
            //this.add.text(game.config.width/2, game.config.height/2, 'PAUSED')
            
        });
        this.add.image(game.config.width/2 + 80, game.config.height/2 + 20, 'restartButton').setScale(0.3).setInteractive()
        .on('pointerdown', () => {
            //this.checkMusicPlayer();
            this.scene.start('Level2Scene');
            //this.scene.stop();
            //this.add.text(game.config.width/2, game.config.height/2, 'PAUSED')
            
        });
        this.add.text(game.config.width/2 - 40, game.config.height/2 + 80, 'Menu', {fontSize:40}).setInteractive()
        .on('pointerdown', () => {
            //this.checkMusicPlayer();
            this.scene.start('menuScene');
            this.scene.stop('Level2Scene');
            //this.add.text(game.config.width/2, game.config.height/2, 'PAUSED')
            
        });
    }

}
