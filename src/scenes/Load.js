class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }
    preload() {
        //load atlases
        this.load.atlas('progress_atlas', './assets/progressBar.jpg', './assets/progressBar.json');
        this.load.atlas('rockProg_atlas', './assets/rock_progBar.jpg', './assets/rock_progBar.json');
        this.load.atlas('crosshair', './assets/crosshairSprite.png', './assets/crosshairAnim.json');

        //loads all sprites and background
        this.load.image('menuBackground', './assets/menu_background.jpg');//temporary menu background (will change later)
        this.load.image('curtains', './assets/curtains.png');//temporary tween
        this.load.image('ground_1x1', './assets/ground_1x1.png'); // temporary
        this.load.image('sprite', './assets/Player_right.png'); // temporary
        this.load.image('notes', './assets/noteParticle1.png');
        this.load.image('notes2', './assets/noteParticle2.png');
       // this.load.image('enemy', './assets/baby_4.png'); // temporary
        this.load.atlas('enemyRange', './assets/Enemy Sprites/muteshooter.png', './assets/Enemy Sprites/muteshooter.json');
        this.load.image('enemyMelee', './assets/Enemy Sprites/melee_muteman_2.png'); //temporary
        this.load.image('enemyMelee2', './assets/Enemy Sprites/melee_muteman_right.png'); //temporary
        this.load.image('background', './assets/menu_background.jpg'); //temporary
        this.load.image('disk', './assets/disc.png'); //temporary
        this.load.image('enemyShoot', './assets/apple_core_4.png'); //temporary
        

        //music may take a while to load due to uncompressed wav format
        
        //dialogue music
        this.load.audio('dialogueMusic', './assets/Menu Music/Menu_music 1.wav');
        this.load.audio('menuMusic', './assets/Menu Music/Menu_music_fixed.wav');

        //level 1 music 
        this.load.audio('lvl1_01', './assets/Level1Music/TechnoLVL1_01_fixed.wav');
        this.load.audio('lvl1_02', './assets/Level1Music/TechnoLVL1_02_fixed.wav');
        this.load.audio('lvl1_03', './assets/Level1Music/TechnoLVL1_03_fixed.wav');
        this.load.audio('lvl1_04', './assets/Level1Music/TechnoLVL1_04_fixed.wav');
        this.load.audio('lvl1_05', './assets/Level1Music/TechnoLVL1_05_fixed.wav');
        this.load.audio('lvl1_full', './assets/Level1Music/TechnoLVL1_full_fixed.wav');

        //level 2 music
        this.load.audio('lvl2_01', './assets/Level2Music/RockLVL2_01_fixed.wav');
        this.load.audio('lvl2_02', './assets/Level2Music/RockLVL2_02_fixed.wav');
        this.load.audio('lvl2_03', './assets/Level2Music/RockLVL2_03_fixed.wav');
        this.load.audio('lvl2_04', './assets/Level2Music/RockLVL2_04_fixed.wav');
        this.load.audio('lvl2_05', './assets/Level2Music/RockLVL2_05_fixed.wav');
        this.load.audio('lvl2_full', './assets/Level2Music/RockLVL2_full_fixed.wav');

        //SFX
        this.load.audio('collectSound', './assets/SFX/Collection_sfx.wav');
        this.load.audio('EnemyShootSound', './assets/SFX/Enemy_shoot_sfx.wav');
        this.load.audio('EnemyWalkSound', './assets/SFX/Enemy_walk.wav');
        this.load.audio('stopMusicSound', './assets/SFX/Music_stop_sfx.wav');
        this.load.audio('playerWalkSound', './assets/SFX/Player_walk.wav');
        this.load.audio('selectSound', './assets/SFX/select_sound.wav');


        //prints message indicating player that game is loading
        this.add.text(game.config.width/2 + 310, game.config.height/2 + 230, 'Loading...', { fontFamily: 'Segoe Script', fontSize: '30px', color: 'white', align: 'left' });
    }

    create(){
        
        this.scene.start('startScene');

    }

}