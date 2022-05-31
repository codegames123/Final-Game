let cursors;
let currentScene = 0;

//main game object
let config = {
    type: Phaser.AUTO,
    width: 960,//840
    height: 540,//525
    autoCenter: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [BootState,Load, Start, Menu, Tutorial, Level1, Level2, Pause]
};

let game = new Phaser.Game(config);

let keyA, keyS, keyD, keyW, keySPACE, keyF, keyL;