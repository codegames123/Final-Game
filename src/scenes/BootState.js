class BootState extends Phaser.Scene {
    constructor() {
        super('bootState');
    }
    preload() {
        this.load.image('disk', './assets/disc.png'); //temporary
    }
    create() {
        
        this.scene.start('loadScene');
    }
}