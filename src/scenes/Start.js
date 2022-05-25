class Start extends Phaser.Scene {
    constructor() {
        super("startScene");
    }
    create () {
                 //this.scale.setGameSize(640, 480);
                //attempt 2: 2 strings, an empty and a full. after certain time add letter to empty from full and print
                let txtTime = 60; //set timer duration

                this.dialogueMusic = this.sound.add('dialogueMusic', { loop: false });
                this.dialogueMusic.play();
                //28 chars allowed per line
                let testStr = 'We lived in a world that was full of beautiful sounds. Noisy, tranquil, passionate. A variety like no other.@(...)@But the Muted Ones took it all away.@They weren\'t always called that, nor were they always the enemy.@Centuries ago, they were leaders of the world\'s musical genius. True innovators, they brought joy wherever they went with the sounds they created.@They were loved, respected.@But, of course, eventually war broke out.@Instruments were traded for weapons.@Where they were once called forth for their blissful tunes, they were now pushed to the margins in a pitiful conflict.@Too many died, and those who remained were too broken to try again.@Bitter, a faction formed among them, who rose to power and swore to never play music again.@The world was too cruel, they argued.@There\'s no point going back if it will just be ripped away again.@They embarked on a campaign to eliminate all the music in the world.@They had the technology to make it, and too the technology to destroy it.@Anywhere they saw music playing, they would shoot "muters" to silence the source.@And hence they came to be known as the Muted Ones.@@You aren\'t much different from them.@You exist on the fringes of society, too.@But you remember the power of music.@You\'ve seen it soothe so many in the shadows.@Here you stand today, knowing this, ready to fight.@Take back the music.@Give it to the world.@Set us free from this blaring silence.' //create test string
                console.log(testStr.length);
                let spaceStr = "                                                                                                                                                                                                                                                                                                                                                                                               ";
                /*let testArr = []; //arrays for text and spaces
                let spaceArr = [];
                for(let i = 0; i<testStr.length; i++) { //parse chars to arr
                    testArr.push(testStr.charAt(i));
                }
                for(let i = 0; i<spaceStr.length; i++) {
                    spaceArr.push(spaceStr.charAt(i));
                }*/
                keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F); // for menu
                let linePos = 0; //position on current line
                let newLine = false;
                let text2Print = ''; //text to print
                let leftOffset = 20; //amount current parts of string offset
                let downOffset = 20; //y position of current line
                let repeatTimes = 0; //times repeated
                let spcRptTimes = 0; //above for space
                let textConfig = {
                    fontFamily: 'Courier',
                    fontSize: '24px',
                    backgroundColor: '#000000',
                    color: '#FFFFFF',
                    align: 'center',
                    padding: {
                        top: 5, 
                        bottom: 5
                    }
                }
                let newLineConfig = {
                    fontFamily: 'Courier',
                    fontSize: '24px',
                    backgroundColor: '#000000',
                    color: '#000000',
                    align: 'center',
                    padding: {
                        top: 5, 
                        bottom: 5
                    }
                }
                
                let textBox = this.add.rectangle(0,0,800,600);
                textBox.isStroked = true;
                textBox.strokeColor = '#ffffff';                    
                    let timer = this.time.addEvent({
                        delay: txtTime,                // ms
                        callback: () => {
                            leftOffset+=(20);
                            if(leftOffset > game.config.width-21) { //breaking right bounds
                                if(testStr.charAt(repeatTimes) != ' ')
                                {
                                    leftOffset = 40;
                                }
                                else {
                                    leftOffset = 20;
                                }
                                linePos = 0;
                                downOffset +=40;
                            }
                            //issue: adds the last letter of the word breaking bounds at the very lower right corner down too much.
                           if(leftOffset == game.config.width - 40 && testStr.charAt(repeatTimes) != ' ' && repeatTimes!=testStr.length) {
                                //if at rightmost letter and the word incomplete
                                let rightBTestNum = 0; //numbers to use to make sure words fit\
                                //fix this while: it is making an infinite loop
                                while(testStr.charAt(repeatTimes - rightBTestNum) != ' ') {
                                    rightBTestNum ++;
                                }
                                for(let i = 0; i<rightBTestNum-1; i++) {
                                    //replace problematic letters on current row w spaces
                                    leftOffset-=20;
                                    this.add.text(leftOffset, downOffset, ' ', textConfig);
                                }
                                //go to new row
                                linePos=0;
                                leftOffset = 20;
                                downOffset+=40;
                                if(downOffset > game.config.height-21) { //breaking down bounds
                                    this.cameras.main.setBackgroundColor("#000000");
                                    leftOffset = 20;
                                    downOffset = 20;
                                    linePos=0;
                                }

                                //reprint those letters on the next row and add RBTN to repeattimes
                                for(let i = 0; i<rightBTestNum+1; i++) {
                                    this.add.text(leftOffset, downOffset, testStr.charAt(repeatTimes+rightBTestNum - i), textConfig);
                                }
                                repeatTimes-=rightBTestNum;
                            }
                            if(downOffset > game.config.height-21) { //breaking down bounds
                                this.cameras.main.setBackgroundColor("#000000");
                                //this checks out
                                if(testStr.charAt(repeatTimes) != ' ')
                                {
                                    leftOffset = 40;
                                }
                                else {
                                    leftOffset = 20;
                                }
                                downOffset = 20;
                                linePos=0;
                            }
                            if(repeatTimes == testStr.length+2)
                            {
                                repeatTimes+=rightBTestNum;
                            }
                            //if character is @ then new line
                            if(testStr.charAt(repeatTimes) == '@') {
                                newLine = true;
                            }
                            if(!testStr.charAt(repeatTimes) && spcRptTimes<spaceStr.length && newLine == false) {
                                text2Print = spaceStr.charAt(spcRptTimes);
                                this.add.text(leftOffset,downOffset, text2Print, textConfig);
                                spcRptTimes ++;
                            }
                            else if(testStr.charAt(repeatTimes) && spcRptTimes<spaceStr.length && newLine == false) {
                                text2Print = testStr.charAt(repeatTimes);
                                this.add.text(leftOffset,downOffset, text2Print, textConfig);
                                repeatTimes ++;
                                linePos++;
                            }
                            else if(newLine == true) {
                                for(let i = 0; i<(45-linePos); i++)
                                {
                                    this.add.text(leftOffset, downOffset, ' ', textConfig);
                                    leftOffset+=20;
                                }
                                repeatTimes++;
                                leftOffset = 20;
                                downOffset+=40;
                                newLine = false;
                                linePos=0;
                            }
                            },
                        callbackScope: this,
                        repeat: testStr.length+spaceStr.length+1
                    });
                    //in callback: if downOffset > (amount) then 1. clear screen 2. depend on if ' ', leftoffset = 40 or 20 and downoffset = 20;
                    //timer 2: fill screen with spaces
                    leftOffset = 20;
                    downOffset = 20;

    }
    //next steps: deal with words cutting off at right horizontal bounds
    // maybe if (position is rightmost and current character isnt a space, then reset position to lower left)
    update() {
        if (keyF.isDown) { // (temporary) if m is pressed, switches back to menu scene
            this.scene.start('menuScene');
            this.dialogueMusic.stop();
        }
    }
}

//need:
//to figure out the text locations. Need to finish the above function but first need to make an object with font, size, etc. reference rocket patrol tutorial 